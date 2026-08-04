import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Moon, Sun } from "lucide-react";

import { useAuth } from "../../contexts/AuthContext";

import DesktopNav from "./DesktopNav";
import MobileDrawer from "./MobileDrawer";
import UserMenu from "./UserMenu";

import Button from "../Button/Button";

import logoLight from "../../assets/images/logo-light.png";
import logoDark from "../../assets/images/logo-dark.png";

import "./Navbar.css";

function Navbar({ theme, setTheme }) {

    const [menuOpen, setMenuOpen] = useState(false);

    const {

        user,

        profile,

        logout,

    } = useAuth();

    const currentLogo =

        theme === "dark"

            ? logoDark

            : logoLight;

    useEffect(() => {

        document.body.style.overflow =

            menuOpen

                ? "hidden"

                : "auto";

        return () => {

            document.body.style.overflow = "auto";

        };

    }, [menuOpen]);

    function closeMenu() {

        setMenuOpen(false);

    }

    function toggleMenu() {

        setMenuOpen((prev) => !prev);

    }

    function toggleTheme() {

        setTheme((prev) =>

            prev === "light"

                ? "dark"

                : "light"

        );

    }

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

                    <DesktopNav />

                    <div className="nav-actions">

                        <button
                            className="theme-toggle"
                            onClick={toggleTheme}
                            aria-label="Tema Değiştir"
                        >

                            {

                                theme === "light"

                                    ? <Moon size={18} />

                                    : <Sun size={18} />

                            }

                        </button>

                        {

                            user ? (

                                <UserMenu

                                    user={user}

                                    profile={profile}

                                    logout={logout}

                                />

                            ) : (

                                <>

                                    <Link to="/login">

                                        <Button
                                            variant="secondary"
                                            size="sm"
                                        >

                                            Giriş Yap

                                        </Button>

                                    </Link>

                                    <Link to="/register">

                                        <Button
                                            size="sm"
                                        >

                                            Kayıt Ol

                                        </Button>

                                    </Link>

                                </>

                            )

                        }

                    </div>

                    <button
                        className="hamburger"
                        onClick={toggleMenu}
                        aria-label="Mobil Menü"
                    >

                        {

                            menuOpen

                                ? <X size={28} />

                                : <Menu size={28} />

                        }

                    </button>

                </div>

            </header>

            <div
                className={`overlay ${menuOpen ? "show" : ""}`}
                onClick={closeMenu}
            />

            <MobileDrawer

                menuOpen={menuOpen}

                closeMenu={closeMenu}

                theme={theme}

                toggleTheme={toggleTheme}

                user={user}

                profile={profile}

                logout={logout}

            />

        </>

    );

}

export default Navbar;