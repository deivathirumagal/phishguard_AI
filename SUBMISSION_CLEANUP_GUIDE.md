# Final Submission Cleanup & Archival Guide – PhishGuard AI

**Project Root:** `C:\Users\hp\OneDrive\Desktop\project\phish guard`  
**Purpose:** Instructions for creating a clean, professional ZIP archive for college/evaluator submission without submitting gigabytes of redundant generated dependencies, while preserving local functionality.

---

## 1. Golden Rules for Final Submission

1. **NEVER DELETE LOCAL FILES BEFORE BACKUP**: Do not delete `node_modules` or `venv` directly in your working workspace until you have created your submission copy.
2. **NEVER EXCLUDE THE MODEL OR DATASET**: The trained model artifacts (`phishing_model.pkl`, `tfidf_vectorizer.pkl`) and dataset (`SMSSpamCollection`) **MUST ALWAYS BE INCLUDED**. Without them, the project cannot run without manual retraining.
3. **DO NOT SUBMIT TRANSIENT ARTIFACTS**: Large precompiled binaries, virtual environments, node package caches, and build outputs should be excluded from final submission ZIPs.

---

## 2. What to EXCLUDE from the College Submission Archive

When creating your submission ZIP file or committing to a college Git repository, **EXCLUDE** the following folders and files:

| Folder / File Path | Why It Must Be Excluded | Size Impact |
| :--- | :--- | :--- |
| `node_modules/` | Generated JavaScript dependencies; easily restored with `npm install` | ~150 – 300 MB |
| `backend/venv/` | Machine-specific Python virtual environment (contains hardcoded OS paths) | ~200 – 500 MB |
| `dist/` | Vite build output; easily regenerated with `npm run build` | ~1 MB |
| `.vite/` | Vite cache directory | ~5 MB |
| `__pycache__/` | Python bytecode caches (`.pyc` files) | ~1 MB |
| `android/.gradle/` | Gradle build daemon caches and logs | ~50 – 200 MB |
| `android/app/build/` | Compiled Android APKs and intermediate object files | ~50 – 100 MB |
| `android/.idea/` | Android Studio IDE configuration files | ~1 MB |
| `*.log` | Debug logs generated during local testing | Minimal |

---

## 3. What MUST ALWAYS BE INCLUDED

Ensure the submission archive includes every file below:

| Directory / File | Essential Purpose |
| :--- | :--- |
| `src/` | Entire React 19 source code (components, pages, services, utils, css) |
| `index.html` | Application HTML entry point |
| `vite.config.js` | Vite bundler configuration |
| `package.json` & `package-lock.json` | Exact Node.js dependencies and build scripts |
| `backend/app.py` | Flask API application and hybrid risk engine |
| `backend/train_model.py` | Standalone ML training script |
| `backend/requirements.txt` | Python dependencies required to run the backend |
| `backend/model/` | **CRITICAL:** `phishing_model.pkl` and `tfidf_vectorizer.pkl` |
| `backend/dataset/` | **CRITICAL:** `SMSSpamCollection` benchmark dataset |
| `android/` | Android companion source code (`src/main/java/`, `res/`, `AndroidManifest.xml`, `build.gradle`) |
| All `.md` Documentation | `README.md`, reports, guides, presentation decks, and viva questions |

---

## 4. Step-by-Step Procedure to Create the Final Submission ZIP

### Option A: Using PowerShell (Recommended)

Run this PowerShell snippet from outside the project directory to create a clean ZIP excluding build artifacts:

```powershell
# Navigate to parent folder
cd "C:\Users\hp\OneDrive\Desktop\project"

# Create a clean temporary staging directory
$stagingDir = "C:\Users\hp\OneDrive\Desktop\project\PhishGuard_Submission"
if (Test-Path $stagingDir) { Remove-Item -Recurse -Force $stagingDir }
New-Item -ItemType Directory -Path $stagingDir

# Copy project files excluding transient folders
robocopy "phish guard" "$stagingDir\phish guard" /E /XD node_modules venv .gradle build dist .vite __pycache__ .idea /XF *.log

# Create ZIP archive
Compress-Archive -Path "$stagingDir\phish guard" -DestinationPath "C:\Users\hp\OneDrive\Desktop\project\PhishGuard_AI_Final_Submission.zip" -Force

# Clean up staging directory
Remove-Item -Recurse -Force $stagingDir

Write-Host "Clean submission ZIP created at: C:\Users\hp\OneDrive\Desktop\project\PhishGuard_AI_Final_Submission.zip"
```

---

## 5. Recipient Restoration Instructions

Include these simple commands in your submission `README.md` so that the examining panel can instantly restore and run the application:

### Step 1: Restore Python Backend
```powershell
cd "backend"
python -m venv venv
& "venv\Scripts\Activate.ps1"
pip install -r requirements.txt
python app.py
```

### Step 2: Restore React Frontend
```powershell
# From project root
npm install
npm run dev
```
