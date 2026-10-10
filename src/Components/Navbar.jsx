import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <nav className="navbar" id="main-navbar">
      <Link to="/dashboard" className="logo" title="PhishGuard AI Home">
        <span className="logo-shield">🛡️</span>
        <span>PhishGuard</span>
        <small>AI</small>
      </Link>

      <div className="nav-links">
        <Link to="/" className={isActive("/")}>
          Home
        </Link>

        <Link to="/dashboard" className={isActive("/dashboard")}>
          Dashboard
        </Link>

        <Link to="/scan" className={isActive("/scan")}>
          Scan Message
        </Link>

        <Link to="/history" className={isActive("/history")}>
          Scan History
        </Link>

        <Link to="/about" className={isActive("/about")}>
          How It Works
        </Link>

        <Link to="/scan" className="nav-button" id="nav-quick-scan-btn">
          ⚡ Quick Scan
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;