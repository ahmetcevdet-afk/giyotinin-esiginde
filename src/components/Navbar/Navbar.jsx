import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";

import "./Navbar.css";
import Button from "../Button/Button";

import logoLight from "../../assets/images/logo-light.png";
import logoDark from "../../assets/images/logo-dark.png";

function Navbar({ theme, setTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const currentLogo = theme === "dark" ? logoDark : logoLight;

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <header className="navbar">
        <div className="container navbar-container">

          <a
            href="/"
            className="brand"
            aria-label="Giyotinin Eşiğinde Ana Sayfa"
            onClick={closeMenu}
          >
            <img
  src={currentLogo}
  alt="Giyotinin Eşiğinde"
  className="brand-logo"
/>

            <span className="logo">
              Giyotinin Eşiğinde
            </span>
          </a>

          <nav className="nav-links">
            <a href="/">Ana Sayfa</a>
            <a href="/articles">Araştırmalar</a>
            <a href="/categories">Kategoriler</a>
            <a href="/authors">Yazarlar</a>
            <a href="/about">Hakkımızda</a>
          </nav>

          <div className="nav-actions">

            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Tema Değiştir"
            >
              {theme === "light"
                ? <Moon size={18}/>
                : <Sun size={18}/>
              }
            </button>

            <Button variant="secondary" size="sm">
              Giriş Yap
            </Button>

            <Button size="sm">
              Kayıt Ol
            </Button>

          </div>

          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menüyü Aç"
          >
            {menuOpen
              ? <X size={28}/>
              : <Menu size={28}/>
            }
          </button>

        </div>
      </header>

      <div
        className={`overlay ${menuOpen ? "show" : ""}`}
        onClick={closeMenu}
      />

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

        <button
          className="theme-toggle mobile-theme"
          onClick={toggleTheme}
        >
          {theme === "light"
            ? (
              <>
                <Moon size={18}/>
                Koyu Tema
              </>
            )
            : (
              <>
                <Sun size={18}/>
                Açık Tema
              </>
            )
          }
        </button>

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