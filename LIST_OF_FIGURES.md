# PhishGuard AI — List of Figures

The following list provides the recommended figures and visual diagrams for the final project report, based strictly on the implemented system components and architecture:

| Figure Number | Title | Description / Source Component |
|:---:|:---|:---|
| **Figure 1** | Overall System Architecture | Block diagram showing Client (Web/Android), Flask REST API, ML Classifier, Heuristic Analyzers, Risk Engine, and Audit Storage. |
| **Figure 2** | Machine Learning Processing Pipeline | Sequential diagram illustrating Raw Message $\rightarrow$ Text Normalization $\rightarrow$ TF-IDF Vectorization $\rightarrow$ Logistic Regression $\rightarrow$ Class Probabilities. |
| **Figure 3** | Composite Risk Assessment Flow | Decision and weighting flowchart showing how ML base score, URL penalties, social engineering flags, and synergy bonuses combine into a 0–100 score. |
| **Figure 4** | Frontend Scan Interface | Overview of `ScanMessage.jsx` showing the Manual Scan tab, faculty demo presets, and Detection Workflow Pipeline banner. |
| **Figure 5** | Phishing Detection Result | Evaluation report view showing an urgent banking smishing attack classified as `Phishing` with `Critical Risk` (100/100). |
| **Figure 6** | Legitimate Message Result | Evaluation report view showing a personal SMS classified as `Legitimate` with `Low Risk` (5/100) and suppressed alerts. |
| **Figure 7** | URL Analysis Result | Detailed breakdown of Card 5 displaying detected URL, suspicious shortener flag (`bit.ly`), and structural analysis rationale. |
| **Figure 8** | Social Engineering Indicators | Detailed checklist of Card 6 showing active detections across Urgency, Fear/Threat, Account Verification, and Authority Impersonation. |
| **Figure 9** | Security Alert System | High-visibility pulsing red alert banner (`RealTimeAlert.jsx`) rendering critical safety directives for high-risk threats. |
| **Figure 10** | Security Dashboard | Overview of `Dashboard.jsx` displaying live metric cards, threat distribution segmented progress bar, and recent activity feed. |
| **Figure 11** | Scan History Audit Trail | Overview of `History.jsx` showing the local storage audit log, search input filtering by keyword, category filter tabs, and reload action. |
| **Figure 12** | Android Companion Architecture | Architecture diagram of the Android module showing `SmsReceiver`, `android.provider.Telephony.SMS_RECEIVED`, `DetectionService`, and system notifications. |

*Note on Screenshots:* In the compiled report document, Figures 4 through 11 correspond to the actual user interface rendered by the React web application running on `http://localhost:5173/`, while Figures 1, 2, 3, and 12 are architectural flowcharts.
