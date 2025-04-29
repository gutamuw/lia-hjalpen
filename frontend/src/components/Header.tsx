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
              <a href="/homepage">Hem</a>
            </li>
            <li>
              <a href="/about">Om oss</a>
            </li>
            <li>
              <a href="/contact">Kontakt</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
