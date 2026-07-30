import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

import "./Navbar.css";
import Button from "../Button/Button";
import logoImage from "../../assets/images/logo.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="navbar">
        <div className="container navbar-container">
          {/* Logo */}

          <a
            href="/"
            className="brand"
            aria-label="Giyotinin Eşiğinde Ana Sayfa"
            onClick={closeMenu}
          >
            <img
              src={logoImage}
              alt="Giyotinin Eşiğinde"
              className="brand-logo"
            />

            <span className="logo">
              Giyotinin Eşiğinde
            </span>
          </a>

          {/* Desktop Menü */}

          <nav className="nav-links">
            <a href="/">Ana Sayfa</a>
            <a href="/articles">Araştırmalar</a>
            <a href="/categories">Kategoriler</a>
            <a href="/authors">Yazarlar</a>
            <a href="/about">Hakkımızda</a>
          </nav>

          {/* Desktop Butonlar */}

          <div className="nav-actions">
            <Button variant="secondary" size="sm">
              Giriş Yap
            </Button>

            <Button size="sm">
              Kayıt Ol
            </Button>
          </div>

          {/* Hamburger */}

          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menüyü Aç"
          >
            {menuOpen ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}
          </button>
        </div>
      </header>

      {/* Overlay */}

      <div
        className={`overlay ${menuOpen ? "show" : ""}`}
        onClick={closeMenu}
      />

      {/* Mobil Menü */}

      <aside className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <a href="/" onClick={closeMenu}>
          Ana Sayfa
        </a>

        <a href="/articles" onClick={closeMenu}>
          Araştırmalar
        </a>

        <a href="/categories" onClick={closeMenu}>
          Kategoriler
        </a>

        <a href="/authors" onClick={closeMenu}>
          Yazarlar
        </a>

        <a href="/about" onClick={closeMenu}>
          Hakkımızda
        </a>

        <div className="mobile-buttons">
          <Button variant="secondary">
            Giriş Yap
          </Button>

          <Button>
            Kayıt Ol
          </Button>
        </div>
      </aside>
    </>
  );
}

export default Navbar;