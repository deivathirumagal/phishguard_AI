import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="page">
      <Navbar />

      <section className="hero">
        <div className="hero-content">
          <div className="badge">🛡️ AI-POWERED SECURITY</div>

          <h1>
            Detect Phishing
            <br />
            <span>Before It's Too Late.</span>
          </h1>

          <p>
            PhishGuard AI analyzes messages using Natural Language
            Processing and Machine Learning to identify phishing,
            suspicious content, and legitimate messages.
          </p>

          <div className="hero-buttons">
            <Link to="/scan" className="primary-btn">
              Scan a Message →
            </Link>

            <Link to="/about" className="secondary-btn">
              Learn More
            </Link>
          </div>

          <div className="hero-stats">
            <div>
              <strong>AI</strong>
              <span>Powered Detection</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Protection</span>
            </div>

            <div>
              <strong>3</strong>
              <span>Risk Levels</span>
            </div>
          </div>
        </div>

        <div className="analysis-card">
          <div className="card-header">
            <span>Message Analysis</span>
            <span className="live">● LIVE</span>
          </div>

          <div className="message-preview">
            <span className="message-label">Incoming message</span>

            <p>
              Your bank account has been suspended.
              Verify your account immediately by
              clicking the link below.
            </p>

            <span className="fake-url">
              suspicious-link.example
            </span>
          </div>

          <div className="analysis-result">
            <div>
              <span>Detection</span>
              <strong className="danger-text">PHISHING</strong>
            </div>

            <div>
              <span>Risk Score</span>
              <strong>92/100</strong>
            </div>
          </div>

          <div className="risk-bar">
            <div></div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-heading">
          <span>FEATURES</span>
          <h2>Security powered by AI</h2>
          <p>
            Multiple layers of analysis help identify suspicious
            messages before they become a threat.
          </p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI Detection</h3>
            <p>
              Machine learning analyzes message patterns and
              classifies potential phishing attempts.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔗</div>
            <h3>URL Analysis</h3>
            <p>
              Detect suspicious URLs, shortened links and
              potentially dangerous domains.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🧠</div>
            <h3>Social Engineering</h3>
            <p>
              Identify urgency, fear, rewards, authority and
              account verification techniques.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Risk Score</h3>
            <p>
              Get an easy-to-understand risk score from 0 to
              100 with detailed explanations.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Real-Time Alerts</h3>
            <p>
              Receive immediate warnings when suspicious
              messages are detected.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💡</div>
            <h3>Security Advice</h3>
            <p>
              Receive recommended actions such as avoiding
              suspicious links and attachments.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;