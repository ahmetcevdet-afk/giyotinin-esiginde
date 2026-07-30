import "./Navbar.css";
import Button from "../Button/Button";

function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-container">
        <a href="/" className="brand" aria-label="Giyotinin Eşiğinde ana sayfa">
          <img
            className="brand-logo"
            src="/assets/images/logo.png"
            alt=""
          />
          <span className="logo">Giyotinin Eşiğinde</span>
        </a>

        <nav className="nav-links" aria-label="Ana menü">
          <a href="/">Ana Sayfa</a>
          <a href="/articles">Araştırmalar</a>
          <a href="/categories">Kategoriler</a>
          <a href="/authors">Yazarlar</a>
          <a href="/about">Hakkımızda</a>
        </nav>

        <div className="nav-actions">
          <Button variant="secondary" size="sm">
            Giriş Yap
          </Button>

          <Button size="sm">Kayıt Ol</Button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;