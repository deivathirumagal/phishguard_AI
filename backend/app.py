"""
PhishGuard AI - Milestone 4: Multi-Layer Phishing Detection API

This module implements a comprehensive REST API for PhishGuard AI, combining:
1. Machine Learning Baseline (TF-IDF + Logistic Regression trained on SMS Spam dataset)
2. URL Extraction & Defensive Heuristics (Shorteners, IP hosts, excessive subdomains, etc.)
3. Rule-Based Social Engineering Detection (Urgency, Threat/Fear, Reward, Verification, Authority)
4. Transparent Composite Risk Scoring (0–100 bounded score mapped to Risk Levels)
5. Multi-Evidence Final Classification (Legitimate, Suspicious, Phishing)
6. Natural Language Explanations & Actionable User Recommendations

Endpoints:
- GET  /         : Health check endpoint confirming API status.
- POST /predict   : Accepts a text message, performs multi-layered analysis, and
                   returns prediction, risk score, extracted URLs, social engineering
                   indicators, explanation, and recommendation.

NOTE: This system performs passive, defensive analysis only. It never visits,
fetches, or executes any URLs, and never collects personal data.
"""

import os
import re
import sys
from urllib.parse import urlparse
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

# =====================================================================
# 1. PATH CONFIGURATION & ARTIFACT LOADING
# =====================================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "model")
MODEL_PATH = os.path.join(MODEL_DIR, "phishing_model.pkl")
VECTORIZER_PATH = os.path.join(MODEL_DIR, "tfidf_vectorizer.pkl")

# Load trained model artifacts with error handling
try:
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(f"Model artifact not found: {MODEL_PATH}")
    if not os.path.exists(VECTORIZER_PATH):
        raise FileNotFoundError(f"Vectorizer artifact not found: {VECTORIZER_PATH}")

    model = joblib.load(MODEL_PATH)
    vectorizer = joblib.load(VECTORIZER_PATH)
    print("=" * 60)
    print("PhishGuard AI - Model and Vectorizer loaded successfully.")
    print(f"Loaded model:      {MODEL_PATH}")
    print(f"Loaded vectorizer: {VECTORIZER_PATH}")
    print("=" * 60)
except Exception as e:
    print("=" * 60, file=sys.stderr)
    print(f"CRITICAL ERROR: Failed to load machine learning artifacts: {e}", file=sys.stderr)
    print("Please verify that Milestone 2 model training completed successfully.", file=sys.stderr)
    print("=" * 60, file=sys.stderr)
    sys.exit(1)


# =====================================================================
# 2. FLASK APPLICATION SETUP
# =====================================================================

app = Flask(__name__)

# Enable Cross-Origin Resource Sharing (CORS) for frontend integration
# Allows specific frontend origin in production (e.g., Vercel) while maintaining local dev access
frontend_origin = os.environ.get("FRONTEND_ORIGIN")
if frontend_origin:
    allowed_origins = [origin.strip() for origin in frontend_origin.split(",") if origin.strip()]
    CORS(app, origins=allowed_origins)
else:
    # Allow all origins if FRONTEND_ORIGIN is not specified (e.g., development or open API)
    CORS(app)


# =====================================================================
# 3. STATIC CONFIGURATION FOR DETECTION HEURISTICS
# =====================================================================

# Common URL shortening domains often leveraged in SMS phishing to hide targets
KNOWN_SHORTENERS = {
    "bit.ly", "tinyurl.com", "t.co", "goo.gl", "ow.ly", "is.gd",
    "buff.ly", "adf.ly", "bitly.com", "cutt.ly", "rb.gy", "shorturl.at"
}

# Top-Level Domains (TLDs) frequently abused in bulk spam / phishing campaigns
SUSPICIOUS_TLDS = {
    "xyz", "top", "work", "click", "buzz", "tk", "ml", "ga", "cf", "gq", "loan", "fit", "surf"
}

# Regex pattern matching http://, https://, and www. URLs
URL_PATTERN = re.compile(
    r'(?:https?://|www\.)[^\s<>"\']+',
    re.IGNORECASE
)

# Social engineering keyword and phrase patterns by category
SOCIAL_ENGINEERING_RULES = {
    "urgency": [
        r'\burgent(?:ly)?\b',
        r'\bimmediately\b',
        r'\bact\s+now\b',
        r'\bwithin\s+24\s+hours\b',
        r'\blimited\s+time\b',
        r'\bhurry\b',
        r'\bexpires?\s+(?:soon|today)\b'
    ],
    "fear_threat": [
        r'\baccount\s+(?:has\s+been\s+|is\s+)?suspended\b',
        r'\baccount\s+(?:has\s+been\s+|is\s+)?blocked\b',
        r'\blegal\s+action\b',
        r'\bunauthorized\b',
        r'\bsecurity\s+alert\b',
        r'\bwarning\b',
        r'\bterminated?\b',
        r'\bcompromised\b'
    ],
    "reward": [
        r'\bcongratulations?\b',
        r'\bwon\b',
        r'\bwinner\b',
        r'\bprize\b',
        r'\bfree\b',
        r'\breward\b',
        r'\bgift\b',
        r'\bclaim\s+your\b'
    ],
    "account_verification": [
        r'\bverify\s+(?:your\s+|the\s+)?account\b',
        r'\bverify\s+(?:your\s+|the\s+)?identity\b',
        r'\bconfirm\s+(?:your\s+|the\s+)?account\b',
        r'\blogin\b',
        r'\bpassword\b',
        r'\bbank\s+account\b',
        r'\bpasscode\b',
        r'\bcredential[s]?\b'
    ],
    "authority_impersonation": [
        r'\bbank\b',
        r'\bpolice\b',
        r'\bgovernment\b',
        r'\bpaypal\b',
        r'\bmicrosoft\b',
        r'\bamazon\b',
        r'\badministrator\b',
        r'\bsecurity\s+team\b',
        r'\bhdfc\b',
        r'\bsbi\b',
        r'\bicici\b',
        r'\bapple\b'
    ]
}


# =====================================================================
# 4. HELPER FUNCTIONS
# =====================================================================

def preprocess_text(text: str) -> str:
    """
    Applies the text preprocessing pipeline matching the model training phase:
    - Casts input to string
    - Converts to lowercase
    - Normalizes multi-character whitespace to single spaces
    - Strips leading and trailing whitespace
    """
    if not isinstance(text, str):
        text = str(text) if text is not None else ""

    text = text.lower()
    text = re.sub(r"\s+", " ", text)
    text = text.strip()
    return text


def extract_urls(text: str) -> list:
    """
    Extracts URLs from message text using regex.
    Detects http://, https://, and www. URLs.
    Strips trailing sentence punctuation (. , ; : ! ? ) ]).
    Returns unique URLs while preserving discovery order.
    """
    if not text or not isinstance(text, str):
        return []

    raw_matches = URL_PATTERN.findall(text)
    cleaned_urls = []
    for match in raw_matches:
        # Strip trailing punctuation marks that often get attached at end of sentence
        clean = re.sub(r'[\.,;:!?\)\]\'\"]+$', '', match)
        if clean and clean not in cleaned_urls:
            cleaned_urls.append(clean)

    return cleaned_urls


def analyze_urls(urls: list) -> dict:
    """
    Defensive URL heuristic analysis.
    NOTE: Never visits, fetches, or executes URLs.
    Evaluates:
    - URL shorteners (bit.ly, tinyurl.com, etc.)
    - IP-address-based hosts
    - Excessive subdomains
    - Suspicious structures (@ symbol, high-risk TLDs, multiple hyphens)
    Does NOT flag URLs solely for using HTTPS.
    """
    if not urls:
        return {
            "has_url": False,
            "suspicious_url": False,
            "reasons": []
        }

    reasons = []
    suspicious = False

    for url in urls:
        # Prepend scheme for urlparse if starting with www.
        target = url if re.match(r'^https?://', url, re.IGNORECASE) else f"http://{url}"
        try:
            parsed = urlparse(target)
            host = (parsed.hostname or "").lower()

            # 1. URL Shorteners
            if any(host == s or host.endswith("." + s) for s in KNOWN_SHORTENERS):
                suspicious = True
                reasons.append(f"Uses a known URL shortening service ({host}) which hides the real destination")

            # 2. IP-address-based hosts
            if re.match(r'^(?:\d{1,3}\.){3}\d{1,3}$', host):
                suspicious = True
                reasons.append(f"Uses a raw IP address ({host}) instead of a verified domain name")

            # 3. Excessive subdomains (>= 3 dots in host)
            if host.count(".") >= 3:
                suspicious = True
                reasons.append(f"Contains excessive subdomains ({host.count('.')}) which may obscure destination")

            # 4. Unusual characters (@ symbol in authority for spoofing)
            if "@" in parsed.netloc:
                suspicious = True
                reasons.append("Contains an '@' symbol, often used for host spoofing")

            # 5. Suspicious high-risk TLDs
            for tld in SUSPICIOUS_TLDS:
                if host.endswith("." + tld):
                    suspicious = True
                    reasons.append(f"Uses a high-risk top-level domain (.{tld}) commonly abused by spammers")
                    break

            # 6. Multiple hyphens in host
            if host.count("-") >= 2:
                suspicious = True
                reasons.append(f"Contains multiple hyphens in hostname ({host}), common in typosquatting")

        except Exception:
            suspicious = True
            reasons.append(f"Contains a malformed or unparseable URL structure: {url}")

    return {
        "has_url": True,
        "suspicious_url": suspicious,
        "reasons": reasons
    }


def detect_social_engineering(text: str) -> tuple:
    """
    Rule-based detection for 5 common social engineering categories:
    - urgency
    - fear_threat
    - reward
    - account_verification
    - authority_impersonation

    Returns:
    - category_flags: dict with boolean for each category
    - indicators: list of human-readable category labels triggered
    """
    text_lower = text.lower() if isinstance(text, str) else ""

    category_flags = {
        "urgency": False,
        "fear_threat": False,
        "reward": False,
        "account_verification": False,
        "authority_impersonation": False
    }

    display_names = {
        "urgency": "Urgency",
        "fear_threat": "Fear/Threat",
        "reward": "Reward",
        "account_verification": "Account Verification",
        "authority_impersonation": "Authority/Impersonation"
    }

    indicators = []

    for category, patterns in SOCIAL_ENGINEERING_RULES.items():
        for pattern in patterns:
            if re.search(pattern, text_lower, re.IGNORECASE):
                category_flags[category] = True
                indicators.append(display_names[category])
                break

    return category_flags, indicators


def calculate_risk_score(
    ml_prediction: str,
    confidence: float,
    url_analysis: dict,
    social_engineering: dict
) -> tuple:
    """
    Calculates a transparent, bounded rule-based risk score (0–100).
    Combines:
    - Base score from ML prediction and confidence
    - URL heuristics (suspicious shortener/IP/etc.)
    - Social engineering indicators (urgency, threats, rewards, verification, authority)

    Maps to risk level:
    - 0–29  : Low Risk
    - 30–59 : Medium Risk
    - 60–79 : High Risk
    - 80–100: Critical Risk
    """
    # 1. Base score derived from ML classification
    if ml_prediction == "spam":
        # Base between 30 and 40 depending on model confidence
        base_score = 30 + int((confidence if confidence is not None else 0.8) * 10)
    else:
        # Legitimate messages start low
        base_score = 5

    score = base_score

    # 2. Points for URL features
    if url_analysis.get("suspicious_url"):
        score += 25
    elif url_analysis.get("has_url"):
        score += 5  # Unchecked URL presence in SMS adds minor caution

    # 3. Points for Social Engineering indicators
    if social_engineering.get("fear_threat"):
        score += 15
    if social_engineering.get("account_verification"):
        score += 15
    if social_engineering.get("urgency"):
        score += 10
    if social_engineering.get("reward"):
        score += 15
    if social_engineering.get("authority_impersonation"):
        score += 10

    # 4. Synergy bonus: Suspicious link + sensitive verification or threat
    if url_analysis.get("suspicious_url") and (
        social_engineering.get("account_verification")
        or social_engineering.get("fear_threat")
        or social_engineering.get("urgency")
    ):
        score += 10

    # Ensure score remains strictly within 0–100 bounds
    risk_score = max(0, min(100, score))

    # Map score to risk level
    if risk_score >= 80:
        risk_level = "Critical Risk"
    elif risk_score >= 60:
        risk_level = "High Risk"
    elif risk_score >= 30:
        risk_level = "Medium Risk"
    else:
        risk_level = "Low Risk"

    return risk_score, risk_level


def determine_final_label(
    ml_prediction: str,
    risk_score: int,
    url_analysis: dict,
    social_engineering: dict,
    indicators: list
) -> str:
    """
    Determines final classification: 'Legitimate', 'Suspicious', or 'Phishing'.
    Uses combined evidence rather than triggering on any single isolated keyword.
    """
    # Phishing: Critical risk OR suspicious link accompanied by credential/threat cues
    if risk_score >= 80 or (
        url_analysis.get("suspicious_url") and (
            social_engineering.get("account_verification")
            or social_engineering.get("fear_threat")
            or social_engineering.get("urgency")
        )
    ):
        return "Phishing"

    # Suspicious: Medium/High risk, ML flagged spam, suspicious link, or social engineering indicators
    if (
        risk_score >= 30
        or ml_prediction == "spam"
        or url_analysis.get("suspicious_url")
        or len(indicators) > 0
    ):
        return "Suspicious"

    # Legitimate: Low risk, ML classified as ham, no suspicious cues
    return "Legitimate"


def generate_explanation(
    ml_prediction: str,
    url_analysis: dict,
    social_engineering: dict
) -> str:
    """
    Generates a natural, human-readable explanation of why a message was flagged.
    If clean: 'No major phishing indicators were detected.'
    """
    reasons = []

    if social_engineering.get("urgency"):
        reasons.append("contains urgent language")

    if social_engineering.get("fear_threat"):
        reasons.append("uses fear or threats regarding account status")

    if social_engineering.get("account_verification"):
        reasons.append("requests account verification or sensitive credentials")

    if social_engineering.get("authority_impersonation"):
        reasons.append("impersonates a trusted entity or authority")

    if social_engineering.get("reward"):
        reasons.append("offers unsolicited prizes or rewards")

    if url_analysis.get("suspicious_url"):
        reasons.append("includes a suspicious shortened or unverified URL")
    elif url_analysis.get("has_url"):
        reasons.append("contains an external link")

    if ml_prediction == "spam" and not reasons:
        reasons.append("matches typical unsolicited spam patterns")

    if not reasons:
        return "No major phishing indicators were detected."

    if len(reasons) == 1:
        return f"The message was flagged because it {reasons[0]}."
    elif len(reasons) == 2:
        return f"The message was flagged because it {reasons[0]} and {reasons[1]}."
    else:
        joined = ", ".join(reasons[:-1])
        return f"The message was flagged because it {joined}, and {reasons[-1]}."


def generate_recommendation(final_label: str, risk_level: str) -> str:
    """
    Generates actionable user recommendations based on final label and risk level.
    """
    if final_label == "Phishing" or risk_level in ["High Risk", "Critical Risk"]:
        return "Do not click links, provide passwords, or share personal information."
    elif final_label == "Suspicious" or risk_level == "Medium Risk":
        return "Verify the sender independently before taking action."
    else:
        return "No immediate phishing indicators detected, but remain cautious."


# =====================================================================
# 5. API ROUTES
# =====================================================================

@app.route("/", methods=["GET"])
def health_check():
    """
    Health check endpoint returning API operational status.
    """
    return jsonify({
        "status": "online",
        "service": "PhishGuard AI API"
    }), 200


@app.route("/predict", methods=["POST"])
def predict():
    """
    Comprehensive prediction endpoint combining ML, URL heuristics, and Social Engineering rules.
    Expected JSON payload:
    {
        "message": "Text of the message to analyze"
    }
    """
    # 1. Parse JSON body
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"error": "Message is required"}), 400

    # 2. Validate 'message' field
    raw_message = data.get("message")
    if raw_message is None or not isinstance(raw_message, str) or not raw_message.strip():
        return jsonify({"error": "Message is required"}), 400

    # 3. ML Model Inference
    cleaned_message = preprocess_text(raw_message)
    transformed = vectorizer.transform([cleaned_message])
    ml_prediction = model.predict(transformed)[0]

    confidence = None
    if hasattr(model, "predict_proba"):
        probabilities = model.predict_proba(transformed)[0]
        class_index = list(model.classes_).index(ml_prediction)
        confidence = round(float(probabilities[class_index]), 4)

    # 4. Feature 1 & 2: URL Extraction and Defensive Analysis
    detected_urls = extract_urls(raw_message)
    url_analysis = analyze_urls(detected_urls)

    # 5. Feature 3: Social Engineering Detection
    social_engineering, indicators = detect_social_engineering(raw_message)

    # 6. Feature 4: Risk Scoring (0–100) & Risk Level
    risk_score, risk_level = calculate_risk_score(
        ml_prediction,
        confidence,
        url_analysis,
        social_engineering
    )

    # 7. Feature 5: Combined Evidence Final Label (Legitimate, Suspicious, Phishing)
    final_label = determine_final_label(
        ml_prediction,
        risk_score,
        url_analysis,
        social_engineering,
        indicators
    )

    # 8. Feature 6 & 7: Explanation and Recommendation
    explanation = generate_explanation(ml_prediction, url_analysis, social_engineering)
    recommendation = generate_recommendation(final_label, risk_level)

    # 9. Format response payload matching specifications
    response = {
        "message": raw_message,
        "prediction": ml_prediction,
        "label": final_label,
        "confidence": confidence,
        "risk_score": risk_score,
        "risk_level": risk_level,
        "detected_urls": detected_urls,
        "url_analysis": url_analysis,
        "social_engineering": social_engineering,
        "indicators": indicators,
        "explanation": explanation,
        "recommendation": recommendation
    }

    return jsonify(response), 200


# =====================================================================
# 6. APPLICATION ENTRY POINT
# =====================================================================

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)

