# PhishGuard AI – Submission Notes & Environment Restoration

## 1. Intentionally Excluded Development Files

To keep the project submission clean, lightweight, and free of platform-specific machine binaries, the following directories and transient files have been **intentionally excluded** from the final submission package:

| Excluded Item | Justification |
| :--- | :--- |
| `node_modules/` | Standard Node.js package directory (~250 MB). Contains platform-specific precompiled binaries and thousands of transient files. Excluded in accordance with standard software distribution practices. Recreated via `npm install`. |
| `backend/venv/` | Python virtual environment (~300 MB). Virtual environments contain hardcoded absolute filesystem paths specific to the developer's local machine and should never be ported across machines. Recreated via `python -m venv venv`. |
| `dist/` & `.vite/` | Vite build output and cache directories. Rebuilt on demand using `npm run build`. |
| `__pycache__/` & `*.pyc` | Python bytecode caches. Automatically recompiled by the Python interpreter during execution. |
| `android/.gradle/` & `android/app/build/` | Gradle build daemons, caches, and intermediate compiler artifacts. Automatically downloaded and compiled by Android Studio during project sync. |
| `.idea/` & `.vscode/` | Local IDE user preferences and workspace metadata. |
| `*.log` | Local execution log files. |

---

## 2. Included Critical Artifacts

The following critical non-source artifacts are **strictly included** in the submission package:
- **`dataset/SMSSpamCollection`**: The complete benchmark dataset (5,572 labeled messages).
- **`model/phishing_model.pkl`**: The serialized pre-trained Logistic Regression classifier.
- **`model/tfidf_vectorizer.pkl`**: The serialized fitted TF-IDF vectorizer.

---

## 3. How the Evaluator Recreates the Working Environment

Follow these steps to restore dependencies and launch the system:

### Step 1: Recreate Python Virtual Environment (Backend)
Open a terminal in the `backend/` directory:
```powershell
cd backend
python -m venv venv
& "venv\Scripts\Activate.ps1"
pip install -r requirements.txt
python app.py
```
*(The backend server will start on `http://127.0.0.1:5000`)*.

### Step 2: Recreate Node.js Dependencies (Frontend)
Open a second terminal in the `frontend/` directory:
```powershell
cd frontend
npm install
npm run dev
```
*(The frontend development server will launch on `http://localhost:5173/`)*.

### Step 3: Access Application
Open any web browser and navigate to:
```text
http://localhost:5173/
```
Both the frontend and backend are now fully synchronized and operational.
