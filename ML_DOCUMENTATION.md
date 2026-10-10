# PhishGuard AI — Machine Learning & NLP Documentation
**Mathematical Foundations, Model Training, and Evaluation Metrics**

---

## 1. Dataset Overview

### Dataset Name
**UCI SMS Spam Collection Dataset** (Almeida et al.)

### Nature of the Dataset
The dataset is a public, benchmark corpus of SMS messages labeled as **`ham` (legitimate)** or **`spam` (unsolicited, commercial, or malicious)**. 

> [!IMPORTANT]
> **Academic Honesty Statement on Dataset Domain:**  
> The UCI SMS Spam Collection serves as an **SMS spam/legitimate baseline dataset**. While it contains numerous instances of fraudulent SMS, lottery scams, and financial lures (smishing), it is primarily a spam classification corpus. The **97.58% accuracy** achieved by the model represents its performance on this benchmark SMS baseline, **not** a specialized phishing-only accuracy. To address modern smishing tactics, PhishGuard AI layers defensive URL heuristics and social engineering rule engines on top of this statistical baseline.

### Dataset Composition
- **Total Messages:** 5,572
- **Class Distribution:**
  - `ham` (Legitimate messages): **4,825** messages (**86.60%**)
  - `spam` (Spam / Deceptive / Smishing): **747** messages (**13.40%**)
- **Data Imbalance Ratio:** Approximately 6.46:1 legitimate to spam.

---

## 2. Text Preprocessing Pipeline

To eliminate noise while preserving linguistic signal, raw SMS messages undergo standardized preprocessing prior to vectorization:

1. **Type Normalization:** Ensures all inputs are explicitly cast to string representations.
2. **Case Folding:** Converts all text to lowercase (`text.lower()`) to treat `"URGENT"`, `"Urgent"`, and `"urgent"` identically.
3. **Whitespace Normalization:** Uses regular expression substitution (`re.sub(r"\s+", " ", text)`) to compress consecutive spaces, tabs, and newlines into a single ASCII space.
4. **Trimming:** Strips leading and trailing whitespace (`text.strip()`).

---

## 3. TF-IDF Feature Extraction

### Mathematical Formulation
Term Frequency-Inverse Document Frequency (TF-IDF) quantifies the importance of a term $t$ within a document $d$ relative to the entire corpus $D$:

$$\text{TF}(t, d) = \frac{f_{t, d}}{\sum_{t' \in d} f_{t', d}}$$

$$\text{IDF}(t, D) = \log\left(\frac{1 + |D|}{1 + |\{d \in D : t \in d\}|}\right) + 1$$

$$\text{TF-IDF}(t, d, D) = \text{TF}(t, d) \times \text{IDF}(t, D)$$

The resulting vectors are $L_2$-normalized:

$$\mathbf{v}_{\text{norm}} = \frac{\mathbf{v}}{\|\mathbf{v}\|_2}$$

### Hyperparameters Configured in PhishGuard AI
- **`ngram_range=(1, 2)`:** Extracts both individual words (unigrams) and adjacent two-word sequences (bigrams). This enables the model to capture critical phrases such as `"verify account"`, `"click here"`, and `"free prize"`.
- **`stop_words="english"`:** Filters out uninformative grammatical stop words (`"the"`, `"and"`, `"is"`, `"to"`).
- **`max_features=5000`:** Restricts vocabulary to the top 5,000 most informative features by term frequency across the corpus, preventing overfitting and ensuring low-latency inference (<10ms).
- **`lowercase=False`:** Lowercasing is handled explicitly in the upstream preprocessing function.

---

## 4. Logistic Regression Classifier

### Model Architecture
Logistic Regression is a linear classification model that estimates the posterior probability of a binary outcome using the logistic (sigmoid) function:

$$P(y = 1 \mid \mathbf{x}) = \sigma(\mathbf{w}^T \mathbf{x} + b) = \frac{1}{1 + e^{-(\mathbf{w}^T \mathbf{x} + b)}}$$

Where:
- $\mathbf{x} \in \mathbb{R}^{5000}$ is the TF-IDF feature vector.
- $\mathbf{w} \in \mathbb{R}^{5000}$ is the learned weight vector.
- $b \in \mathbb{R}$ is the bias/intercept term.
- $y = 1$ denotes `spam` (suspicious/malicious); $y = 0$ denotes `ham` (legitimate).

### Loss Function & Regularization
The model minimizes the binary cross-entropy loss with $L_2$ (Ridge) regularization:

$$J(\mathbf{w}, b) = -\frac{1}{N} \sum_{i=1}^N \left[ y_i \log(\hat{y}_i) + (1 - y_i) \log(1 - \hat{y}_i) \right] + \frac{1}{2C} \|\mathbf{w}\|_2^2$$

### Handling Class Imbalance
Because legitimate messages outnumber spam by 6.46:1, standard training would bias predictions toward the majority class. PhishGuard AI configures:
- **`class_weight='balanced'`:** Automatically adjusts weights inversely proportional to class frequencies:
  $$w_j = \frac{N}{2 \times N_j}$$
  This heavily penalizes false negatives (missing a malicious message), ensuring high recall on smishing threats.
- **`max_iter=1000`:** Ensures convergence of the L-BFGS optimization algorithm.
- **`random_state=42`:** Guarantees deterministic, reproducible model training.

---

## 5. Training Process & Train/Test Split

- **Split Ratio:** 80% Training / 20% Testing.
- **Stratification:** Stratified by class label (`stratify=y`) to ensure identical class proportions in both subsets.
- **Random Seed:** `random_state=42`.
- **Training Subset:** **4,457** messages (3,859 ham, 598 spam).
- **Testing Subset:** **1,115** messages (966 ham, 149 spam).

---

## 6. Evaluation Metrics & Verified Results

The model was evaluated on the unseen 1,115-sample test set. The verified results are documented below:

### Overall Accuracy
$$\text{Accuracy} = \frac{\text{TP} + \text{TN}}{\text{TP} + \text{TN} + \text{FP} + \text{FN}} = \frac{137 + 951}{1115} = \mathbf{97.58\%}$$

### Confusion Matrix
| | Predicted Ham (0) | Predicted Spam (1) | Total Actual |
| :--- | :---: | :---: | :---: |
| **Actual Ham (0)** | **951** (True Negative) | **15** (False Positive) | 966 |
| **Actual Spam (1)** | **12** (False Negative) | **137** (True Positive) | 149 |
| **Total Predicted** | 963 | 152 | 1,115 |

### Detailed Classification Report
| Class | Precision | Recall | F1-Score | Support |
| :--- | :---: | :---: | :---: | :---: |
| **`ham` (Legitimate)** | **98.75%** (0.9875) | **98.45%** (0.9845) | **98.60%** (0.9860) | 966 |
| **`spam` (Suspicious/Phishing)** | **90.13%** (0.9013) | **91.95%** (0.9195) | **91.03%** (0.9103) | 149 |
| **Macro Average** | **94.44%** (0.9444) | **95.20%** (0.9520) | **94.82%** (0.9482) | 1,115 |
| **Weighted Average** | **97.60%** (0.9760) | **97.58%** (0.9758) | **97.59%** (0.9759) | 1,115 |

### Metric Explanations
- **Precision (Spam = 90.13%):** When the model flags a message as spam, it is correct 90.13% of the time (15 false alarms out of 152 predictions).
- **Recall (Spam = 91.95%):** Out of 149 actual malicious/spam messages, the model successfully detects 137 of them (missing only 12).
- **F1-Score (Spam = 91.03%):** The harmonic mean of precision and recall, demonstrating strong performance despite severe class imbalance.

---

## 7. Limitations of the Current Machine Learning Model

1. **Domain Mismatch (Spam vs. Modern Smishing):**  
   The UCI SMS Spam Collection dates back to 2012 and contains traditional telemarketing spam (e.g., ringtone offers, claims of prizes). Modern smishing attacks frequently impersonate multi-factor authentication (MFA) prompts, package delivery notices (FedEx, UPS), or tax authorities (IRS) using professional, understated language that differs linguistically from traditional spam.

2. **Absence of Contextual Embeddings:**  
   TF-IDF treats words as bags of n-grams and cannot capture deep semantic context, negations, or syntactic nuances that modern transformer architectures (e.g., BERT, RoBERTa) can discern.

3. **Evasion via Text Obfuscation:**  
   Advanced attackers use zero-width spaces, character substitutions (homoglyphs such as Cyrillic `'а'` for Latin `'a'`), or intentional typos that can circumvent vocabulary matching unless specialized character-level tokenization is applied.

4. **Justification for the Hybrid Architecture:**  
   Because the ML model alone cannot be 100% reliable against sophisticated attacks, PhishGuard AI does **not** rely solely on machine learning. The **URL Heuristic Engine** and **Social Engineering Analysis Engine** provide independent, deterministic validation layers that catch malicious links and manipulation tactics even if the statistical ML classifier expresses low confidence.
