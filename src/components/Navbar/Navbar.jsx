  import { useState, useEffect } from "react";
  import {
  Menu,
  X,
  Moon,
  Sun,
  LayoutDashboard,
  User,
  FileText,
  Bookmark,
  LogOut,
} from "lucide-react";
  import { Link } from "react-router-dom";
  import { useAuth } from "../../contexts/AuthContext";
  import UserMenu from "./UserMenu";

  import "./Navbar.css";
  import Button from "../Button/Button";

  import logoLight from "../../assets/images/logo-light.png";
  import logoDark from "../../assets/images/logo-dark.png";

  function Navbar({ theme, setTheme }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const currentLogo = theme === "dark" ? logoDark : logoLight;
    const { user, logout } = useAuth();
    const username =
  user?.user_metadata?.username ||
  user?.email?.split("@")[0] ||
  "";

const fullName =
  user?.user_metadata?.full_name ||
  username;

const initials = fullName
  .split(" ")
  .map(word => word[0])
  .join("")
  .substring(0, 2)
  .toUpperCase();
    

console.log("Navbar user:", user);

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

            <Link
              to="/"
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
            </Link>

            <nav className="nav-links">
              <Link to="/">Ana Sayfa</Link>
              <Link to="/articles">Araştırmalar</Link>
              <Link to="/categories">Kategoriler</Link>
              <Link to="/authors">Yazarlar</Link>
              <Link to="/about">Hakkımızda</Link>
            </nav>

            <div className="nav-actions">

  <button
    className="theme-toggle"
    onClick={toggleTheme}
    aria-label="Tema Değiştir"
  >
    {theme === "light"
      ? <Moon size={18} />
      : <Sun size={18} />
    }
  </button>

  {user ? (

    <UserMenu
      user={user}
      logout={logout}
    />

  ) : (

    <>
      <Link to="/login">
        <Button variant="secondary" size="sm">
          Giriş Yap
        </Button>
      </Link>

      <Link to="/register">
        <Button size="sm">
          Kayıt Ol
        </Button>
      </Link>
    </>

  )}

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

          <Link to="/" onClick={closeMenu}>
            Ana Sayfa
          </Link>

          <Link to="/articles" onClick={closeMenu}>
            Araştırmalar
          </Link>

          <Link to="/categories" onClick={closeMenu}>
            Kategoriler
          </Link>

          <Link to="/authors" onClick={closeMenu}>
            Yazarlar
          </Link>

          <Link to="/about" onClick={closeMenu}>
            Hakkımızda
          </Link>

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

  {user ? (

    <>

      <div className="mobile-user-card">

        <div className="mobile-user-avatar">

          {initials}

        </div>

        <div>

          <strong>

            {fullName}

          </strong>

          <span>

            @{username}

          </span>

        </div>

      </div>

      <Link
        to="/dashboard"
        onClick={closeMenu}
        className="mobile-user-link"
      >
        <LayoutDashboard size={18} />
        Dashboard
      </Link>

      <Link
        to="/profile"
        onClick={closeMenu}
        className="mobile-user-link"
      >
        <User size={18} />
        Profil
      </Link>

      <Link
        to="/my-pages"
        onClick={closeMenu}
        className="mobile-user-link"
      >
        <FileText size={18} />
        Yazılarım
      </Link>

      <Link
        to="/saved"
        onClick={closeMenu}
        className="mobile-user-link"
      >
        <Bookmark size={18} />
        Kaydedilenler
      </Link>

      <Button
       className="logout-btn-mobile"
        onClick={async () => {
          await logout();
          closeMenu();
        }}
      >
        <LogOut size={18} />

        Çıkış Yap
      </Button>

    </>

  ) : (

    <>

      <Link
        to="/login"
        onClick={closeMenu}
      >
        <Button variant="secondary">
          Giriş Yap
        </Button>
      </Link>

      <Link
        to="/register"
        onClick={closeMenu}
      >
        <Button>
          Kayıt Ol
        </Button>
      </Link>

    </>

  )}

</div>

        </aside>

      </>
    );
  }

  export default Navbar;