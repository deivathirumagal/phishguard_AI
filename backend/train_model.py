"""
PhishGuard AI - Model Training Pipeline
Milestone 2: Spam & Phishing Baseline Text Classification Model

Pipeline:
Raw SMS
  ↓
Basic text preprocessing (cleaning, lowercasing, whitespace normalization)
  ↓
Train/test split (stratified 80/20)
  ↓
TF-IDF vectorization (unigrams + bigrams)
  ↓
Logistic Regression (class_weight='balanced')
  ↓
Evaluation (Accuracy, Precision, Recall, F1-Score)
  ↓
Save trained model artifacts (phishing_model.pkl, tfidf_vectorizer.pkl)
"""

import os
import re
import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report


# =====================================================================
# 1. PATH CONFIGURATION
# =====================================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATASET_DIR = os.path.join(BASE_DIR, "dataset")
MODEL_DIR = os.path.join(BASE_DIR, "model")

# Supported filenames for the UCI SMS Spam Collection dataset
PRIMARY_DATASET_PATH = os.path.join(DATASET_DIR, "SMSSpamCollection")
ALT_DATASET_PATH = os.path.join(DATASET_DIR, "SMSSpamCollection.txt")

MODEL_PATH = os.path.join(MODEL_DIR, "phishing_model.pkl")
VECTORIZER_PATH = os.path.join(MODEL_DIR, "tfidf_vectorizer.pkl")

# Ensure the output model directory exists
os.makedirs(MODEL_DIR, exist_ok=True)


# =====================================================================
# 2. TEXT PREPROCESSING FUNCTION
# =====================================================================

def preprocess_text(text: str) -> str:
    """
    Performs basic, reproducible text preprocessing:
    - Casts to string
    - Converts to lowercase
    - Normalizes multiple spaces and tabs to a single space
    - Strips leading/trailing whitespace
    """
    if not isinstance(text, str):
        text = str(text) if text is not None else ""
    
    # Convert to lowercase
    text = text.lower()
    
    # Normalize multiple whitespace characters
    text = re.sub(r"\s+", " ", text)
    
    # Strip leading and trailing whitespace
    text = text.strip()
    
    return text


# =====================================================================
# 3. VERIFY DATASET EXISTENCE
# =====================================================================

def resolve_dataset_path() -> str:
    """Checks for the presence of the dataset file."""
    if os.path.exists(PRIMARY_DATASET_PATH):
        return PRIMARY_DATASET_PATH
    if os.path.exists(ALT_DATASET_PATH):
        return ALT_DATASET_PATH
    return ""


dataset_path = resolve_dataset_path()

if not dataset_path:
    print("=" * 60)
    print("ERROR: SMS Spam Collection Dataset Not Found!")
    print("=" * 60)
    print("Expected location:")
    print(f"  -> {PRIMARY_DATASET_PATH}")
    print()
    print("Please place the authentic 'SMSSpamCollection' file into:")
    print(f"  -> {DATASET_DIR}")
    print("=" * 60)
    exit(1)


# =====================================================================
# 4. LOAD AND VALIDATE DATASET
# =====================================================================

print("=" * 60)
print("PHISHGUARD AI - MODEL TRAINING PIPELINE")
print("=" * 60)
print(f"Loading dataset from: {dataset_path}")

data = pd.read_csv(
    dataset_path,
    sep="\t",
    header=None,
    names=["label", "message"],
    encoding="latin-1"
)

# Retain only required columns and drop null entries
data = data[["label", "message"]].dropna()

# Print total number of messages
total_messages = len(data)
print(f"Total number of messages: {total_messages}")

# Print class distribution
print("\nClass distribution:")
class_counts = data["label"].value_counts()
for label, count in class_counts.items():
    percentage = (count / total_messages) * 100
    print(f"  - {label} ({'Legitimate' if label == 'ham' else 'Suspicious/Spam'}): {count} ({percentage:.2f}%)")


# =====================================================================
# 5. BASIC TEXT PREPROCESSING
# =====================================================================

print("\nApplying basic text preprocessing...")
data["cleaned_message"] = data["message"].apply(preprocess_text)
print("Text preprocessing completed.")


# =====================================================================
# 6. TRAIN / TEST SPLIT
# =====================================================================

X = data["cleaned_message"]
y = data["label"]

# Stratified 80/20 train/test split to maintain class ratio
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

print(f"Training samples: {len(X_train)}")
print(f"Testing samples:  {len(X_test)}")


# =====================================================================
# 7. TF-IDF FEATURE EXTRACTION
# =====================================================================

print("\nExtracting TF-IDF features (unigrams & bigrams, max_features=5000)...")

vectorizer = TfidfVectorizer(
    lowercase=False,  # Already lowercased in preprocessing step
    stop_words="english",
    max_features=5000,
    ngram_range=(1, 2)
)

X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf = vectorizer.transform(X_test)

print(f"Vocabulary size: {X_train_tfidf.shape[1]} features")


# =====================================================================
# 8. TRAIN LOGISTIC REGRESSION MODEL
# =====================================================================

print("\nTraining Logistic Regression classifier (balanced class weights)...")

model = LogisticRegression(
    max_iter=1000,
    class_weight="balanced",
    random_state=42
)

model.fit(X_train_tfidf, y_train)
print("Model training completed successfully.")


# =====================================================================
# 9. EVALUATION
# =====================================================================

print("\nEvaluating model on unseen test data...")
predictions = model.predict(X_test_tfidf)
accuracy = accuracy_score(y_test, predictions)

print("=" * 60)
print("MODEL EVALUATION RESULTS")
print("=" * 60)
print(f"Accuracy: {accuracy * 100:.2f}%\n")
print("Classification Report:")
print(classification_report(y_test, predictions, target_names=["ham (Legitimate)", "spam (Suspicious/Phishing)"]))


# =====================================================================
# 10. SAVE TRAINED ARTIFACTS
# =====================================================================

print("Saving model artifacts...")
joblib.dump(model, MODEL_PATH)
joblib.dump(vectorizer, VECTORIZER_PATH)

print("=" * 60)
print("ARTIFACTS SAVED SUCCESSFULLY")
print("=" * 60)
print(f"Model saved to:      {MODEL_PATH}")
print(f"Vectorizer saved to: {VECTORIZER_PATH}")
print("=" * 60)