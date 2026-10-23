import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function About() {
  const pipelineSteps = [
    {
      num: "01",
      title: "Message Ingestion",
      tech: "Raw Input",
      desc: "Accepts incoming SMS or messaging text via REST API or user interface for defensive static analysis.",
    },
    {
      num: "02",
      title: "Text Preprocessing",
      tech: "Normalization",
      desc: "Normalizes whitespace, converts text to lowercase, and strips extraneous artifacts to match the model training state.",
    },
    {
      num: "03",
      title: "NLP Processing",
      tech: "Tokenization",
      desc: "Structures linguistic patterns, extracts n-grams, and prepares tokenized representations for statistical analysis.",
    },
    {
      num: "04",
      title: "TF-IDF Vectorization",
      tech: "Feature Extraction",
      desc: "Converts text into numerical feature vectors weighting rare informative words higher than common stopwords.",
    },
    {
      num: "05",
      title: "Logistic Regression",
      tech: "ML Classifier",
      desc: "Supervised model trained on the authentic SMS Spam Collection dataset outputs class probabilities for spam vs. ham.",
    },
    {
      num: "06",
      title: "URL Analysis",
      tech: "Defensive Heuristics",
      desc: "Passively inspects URLs without resolving them, checking for shorteners, raw IP addresses, excessive subdomains, and suspicious TLDs.",
    },
    {
      num: "07",
      title: "Social Engineering",
      tech: "Behavioral Regex",
      desc: "Detects psychological manipulation patterns: artificial urgency, fear/threats, credential harvesting, authority impersonation, and reward bait.",
    },
    {
      num: "08",
      title: "Risk Score Engine",
      tech: "Composite Algorithm",
      desc: "Combines ML confidence, URL risk weights, and social engineering synergy bonuses into a transparent 0–100 risk score.",
    },
    {
      num: "09",
      title: "Alert & Guidance",
      tech: "Classification & Advice",
      desc: "Classifies message as Legitimate, Suspicious, or Phishing, issuing actionable recommendations to protect the user.",
    },
  ];

  return (
    <div className="page">
      <Navbar />

      <main className="about-page">
        {/* Hero Section */}
        <div className="about-hero">
          <span className="section-heading-small">ARCHITECTURE & METHODOLOGY</span>
          <h1>
            How <span>PhishGuard AI</span> Works
          </h1>
          <p>
            PhishGuard AI is an intelligent, multi-layered cyber defense system built to detect SMS phishing
            (smishing) and social engineering threats. It combines statistical machine learning with deterministic
            defensive heuristics and behavioral NLP patterns.
          </p>
        </div>

        {/* The 9-Stage Detection Pipeline */}
        <div className="pipeline-section">
          <div className="section-heading">
            <span className="section-heading-small">DETECTION PIPELINE</span>
            <h2>Multi-Layer Detection Flow</h2>
            <p>
              Incoming messages undergo nine sequential analytical phases before delivering an explainable verdict.
            </p>
          </div>

          <div className="pipeline-flow-diagram">
            <div className="flow-badge">Message</div>
            <span className="flow-arrow">→</span>
            <div className="flow-badge">Preprocessing</div>
            <span className="flow-arrow">→</span>
            <div className="flow-badge">NLP</div>
            <span className="flow-arrow">→</span>
            <div className="flow-badge">TF-IDF</div>
            <span className="flow-arrow">→</span>
            <div className="flow-badge">Logistic Regression</div>
            <span className="flow-arrow">→</span>
            <div className="flow-badge">URL Analysis</div>
            <span className="flow-arrow">→</span>
            <div className="flow-badge">Social Engineering</div>
            <span className="flow-arrow">→</span>
            <div className="flow-badge highlight-flow">Risk Score</div>
            <span className="flow-arrow">→</span>
            <div className="flow-badge alert-flow">Alert</div>
          </div>

          <div className="pipeline-grid">
            {pipelineSteps.map((step, idx) => (
              <div className="pipeline-card" key={idx}>
                <div className="pipeline-card-top">
                  <span className="step-num">{step.num}</span>
                  <span className="step-tech">{step.tech}</span>
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dataset & ML Prototype Info */}
        <div className="dataset-section">
          <div className="dataset-card">
            <div className="dataset-badge">DATASET & MODEL TRAINING</div>
            <h2>Authentic UCI SMS Spam Collection Dataset</h2>
            <p>
              The baseline machine learning model is trained on the benchmark <strong>UCI SMS Spam Collection dataset</strong>,
              consisting of 5,572 authentic SMS messages tagged as legitimate (ham) or spam. This dataset serves as the project's baseline text classifier.
            </p>

            <div className="dataset-stats-row">
              <div className="ds-stat">
                <strong>5,572</strong>
                <span>Total Messages</span>
              </div>
              <div className="ds-stat">
                <strong>4,825</strong>
                <span>Legitimate (Ham)</span>
              </div>
              <div className="ds-stat">
                <strong>747</strong>
                <span>Spam Messages</span>
              </div>
              <div className="ds-stat">
                <strong>80% / 20%</strong>
                <span>Stratified Split</span>
              </div>
              <div className="ds-stat">
                <strong>4,457</strong>
                <span>Training Set</span>
              </div>
              <div className="ds-stat">
                <strong>1,115</strong>
                <span>Testing Set</span>
              </div>
              <div className="ds-stat">
                <strong>TF-IDF</strong>
                <span>Feature Extractor</span>
              </div>
              <div className="ds-stat">
                <strong>97.58%</strong>
                <span>Baseline Test Accuracy</span>
              </div>
            </div>

            <p className="dataset-note">
              <strong>Evaluation Distinction:</strong> The baseline model achieves <em>97.58% test accuracy on the UCI SMS Spam Collection baseline</em> using Logistic Regression and TF-IDF feature extraction. Because the training corpus is an SMS spam/ham dataset, PhishGuard AI supplements it with specialized URL heuristics and social engineering behavioral analysis to provide full-spectrum phishing protection.
            </p>
          </div>
        </div>

        {/* Dual Defense Layer Breakdown */}
        <div className="defense-layers-grid">
          <div className="layer-card">
            <div className="layer-icon">🔗</div>
            <h3>Defensive URL Heuristics</h3>
            <p>
              To protect user safety, PhishGuard never visits, pings, or resolves target URLs. Instead, it inspects links passively for:
            </p>
            <ul className="layer-list">
              <li>Known URL shortening services (bit.ly, tinyurl, t.co, etc.)</li>
              <li>Raw numeric IP-address hosts (e.g., http://192.168.1.1)</li>
              <li>Excessive subdomains obscuring actual domains</li>
              <li>Suspicious high-risk TLDs (.xyz, .top, .work, .buzz, etc.)</li>
              <li>Embedded "@" credentials for host spoofing</li>
            </ul>
          </div>

          <div className="layer-card">
            <div className="layer-icon">🧠</div>
            <h3>Social Engineering Detection</h3>
            <p>
              Phishing attacks heavily exploit cognitive biases and emotions. PhishGuard's behavioral NLP module flags key tactics:
            </p>
            <ul className="layer-list">
              <li><strong>Urgency:</strong> "Immediately", "act now", "within 24 hours"</li>
              <li><strong>Fear & Threats:</strong> "Account suspended", "legal action", "unauthorized"</li>
              <li><strong>Credential Harvesting:</strong> "Verify account", "confirm password", "login"</li>
              <li><strong>Authority Impersonation:</strong> Banks (HDFC, SBI), government, tech brands</li>
              <li><strong>Reward & Lottery Bait:</strong> "Won prize", "claim gift", "free reward"</li>
            </ul>
          </div>
        </div>

        {/* Action CTA */}
        <div className="about-cta">
          <h2>Ready to test PhishGuard AI?</h2>
          <p>
            Run an analysis on any message or try one of our curated sample attacks in the interactive scanner.
          </p>
          <div className="cta-actions">
            <Link to="/scan" className="primary-btn">
              ⚡ Open Message Scanner →
            </Link>
            <Link to="/dashboard" className="secondary-btn">
              View Dashboard
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default About;