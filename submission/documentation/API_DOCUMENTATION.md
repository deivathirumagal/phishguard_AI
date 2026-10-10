# PhishGuard AI – REST API Documentation

**Base URL:** `http://127.0.0.1:5000`  
**Protocol:** HTTP/1.1  
**Content-Type:** `application/json`  
**Backend Framework:** Flask (Python)  

---

## 1. Health Check Endpoint

### `GET /`

#### Purpose
Verifies that the PhishGuard AI Flask backend server is running and reachable.

#### Request
- **Method:** `GET`
- **Path:** `/`
- **Headers:** None required
- **Body:** None

#### Response
- **Status Code:** `200 OK`
- **Content-Type:** `application/json`
- **Example Response Body:**
  ```json
  {
    "service": "PhishGuard AI API",
    "status": "online"
  }
  ```

---

## 2. Threat Analysis Endpoint

### `POST /predict`

#### Purpose
Analyzes an incoming SMS or messaging payload for phishing indicators, URL obfuscation, and cognitive social engineering tactics. Computes a bounded 0–100 risk score and returns actionable guidance.

#### Request
- **Method:** `POST`
- **Path:** `/predict`
- **Headers:**
  - `Content-Type: application/json`
- **Request Body Schema:**
  | Field | Type | Required | Description |
  | :--- | :--- | :--- | :--- |
  | `message` | string | **Yes** | The raw text of the SMS/message to be analyzed. |

- **Example Request Body:**
  ```json
  {
    "message": "URGENT! Your bank account has been suspended. Verify your account immediately by clicking http://bit.ly/example"
  }
  ```

#### Response Structure & Field Specifications
The following fields are consistently returned for valid requests:

| Field | Type | Description |
| :--- | :--- | :--- |
| `message` | string | Echo of the input message that was analyzed. |
| `prediction` | string | Raw classification from the Logistic Regression model: `"ham"` or `"spam"`. |
| `label` | string | User-facing threat classification label: `"Legitimate"`, `"Suspicious"`, or `"Phishing"`. |
| `confidence` | number | Confidence probability (between `0.0` and `1.0`) for the predicted class. |
| `risk_score` | integer | Composite threat score bounded between `0` and `100`. |
| `risk_level` | string | Categorical risk tier: `"Low Risk"`, `"Medium Risk"`, `"High Risk"`, or `"Critical Risk"`. |
| `detected_urls` | array[string] | List of all URL links and domains extracted from the message. |
| `url_analysis` | object | URL inspection details: |
| `url_analysis.has_url` | boolean | `true` if at least one URL is detected. |
| `url_analysis.suspicious_url` | boolean | `true` if any URL uses shortening services, IP addresses, or suspicious TLDs. |
| `url_analysis.reasons` | array[string] | Human-readable reasons why the URL was flagged. |
| `social_engineering` | object | Flags for 5 psychological manipulation tactics: |
| `social_engineering.urgency` | boolean | `true` if artificial time pressure is detected. |
| `social_engineering.fear_threat` | boolean | `true` if intimidation or account suspension threats are detected. |
| `social_engineering.account_verification` | boolean | `true` if credential harvesting / account verification lures are detected. |
| `social_engineering.authority_impersonation` | boolean | `true` if impersonation of banks, couriers, or officials is detected. |
| `social_engineering.reward` | boolean | `true` if unsolicited prizes, gifts, or lotteries are detected. |
| `indicators` | array[string] | List of human-readable tags representing detected threats (e.g. `["Urgency", "Fear/Threat"]`). |
| `explanation` | string | Natural language summary explaining why the message was flagged. |
| `recommendation` | string | Actionable safety advice for the recipient. |

#### Example 1: Critical-Risk Smishing Attack (Actual Tested Result)
- **Status Code:** `200 OK`
- **Response Body:**
  ```json
  {
    "confidence": 0.6864,
    "detected_urls": [
      "http://bit.ly/example"
    ],
    "explanation": "The message was flagged because it contains urgent language, uses fear or threats regarding account status, requests account verification or sensitive credentials, impersonates a trusted entity or authority, and includes a suspicious shortened or unverified URL.",
    "indicators": [
      "Urgency",
      "Fear/Threat",
      "Account Verification",
      "Authority/Impersonation"
    ],
    "label": "Phishing",
    "message": "URGENT! Your bank account has been suspended. Verify your account immediately by clicking http://bit.ly/example",
    "prediction": "spam",
    "recommendation": "Do not click links, provide passwords, or share personal information.",
    "risk_level": "Critical Risk",
    "risk_score": 100,
    "social_engineering": {
      "account_verification": true,
      "authority_impersonation": true,
      "fear_threat": true,
      "reward": false,
      "urgency": true
    },
    "url_analysis": {
      "has_url": true,
      "reasons": [
        "Uses a known URL shortening service (bit.ly) which hides the real destination"
      ],
      "suspicious_url": true
    }
  }
  ```

#### Example 2: Benign Message (Actual Tested Result)
- **Status Code:** `200 OK`
- **Response Body:**
  ```json
  {
    "confidence": 0.9335,
    "detected_urls": [],
    "explanation": "No major phishing indicators were detected.",
    "indicators": [],
    "label": "Legitimate",
    "message": "Hey, are we still meeting for lunch today?",
    "prediction": "ham",
    "recommendation": "No immediate phishing indicators detected, but remain cautious.",
    "risk_level": "Low Risk",
    "risk_score": 5,
    "social_engineering": {
      "account_verification": false,
      "authority_impersonation": false,
      "fear_threat": false,
      "reward": false,
      "urgency": false
    },
    "url_analysis": {
      "has_url": false,
      "reasons": [],
      "suspicious_url": false
    }
  }
  ```

---

## 3. Error Handling

### Empty Message Validation
When a request has an empty or missing `message` field:
- **Status Code:** `400 Bad Request`
- **Response Body:**
  ```json
  {
    "error": "Message is required"
  }
  ```

### Non-JSON Payload
When a request lacks the `application/json` header or contains malformed JSON:
- **Status Code:** `400 Bad Request`
- **Response Body:**
  ```json
  {
    "error": "Request must be JSON"
  }
  ```
