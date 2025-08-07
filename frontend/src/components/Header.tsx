import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  return (
    <header className="">
      <div className="header-container">
        <div className="logo-container">
          <h2>LIA Hjälpen</h2>
        </div>
        <nav className="navbar">
          <ul className="navbar-links">
            <li>
              <Link to="/homepage">Hem</Link>
            </li>
            <li>
              <Link to="/about">Om oss</Link>
            </li>
            <li>
              <Link to="/contact">Kontakt</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
