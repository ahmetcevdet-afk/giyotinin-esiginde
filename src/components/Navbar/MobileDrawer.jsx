import { Link } from "react-router-dom";
import { Moon, Sun, LogOut } from "lucide-react";

import Button from "../Button/Button";

import MobileUserCard from "./MobileUserCard";
import {
    platformLinks,
    accountLinks,
} from "./navbarData";

import "./MobileDrawer.css";

function MobileDrawer({

    menuOpen,
    closeMenu,

    theme,
    toggleTheme,

    user,
    logout,

}) {

    return (

        <aside
            className={`mobile-menu ${menuOpen ? "open" : ""}`}
        >

            {user && (

                <>

                    <MobileUserCard

                        user={user}

                        closeMenu={closeMenu}

                    />

                    <div className="mobile-section-title">

                        Hesabım

                    </div>

                    {accountLinks.map((item) => {

                        const Icon = item.icon;

                        return (

                            <Link
                                key={item.to}
                                to={item.to}
                                onClick={closeMenu}
                                className="mobile-user-link"
                            >

                                <Icon size={18} />

                                <span>

                                    {item.title}

                                </span>

                            </Link>

                        );

                    })}

                </>

            )}

            <div className="mobile-section-title">

                Platform

            </div>

            {platformLinks.map((item) => {

                const Icon = item.icon;

                return (

                    <Link
                        key={item.to}
                        to={item.to}
                        onClick={closeMenu}
                        className="mobile-user-link"
                    >

                        <Icon size={18} />

                        <span>

                            {item.title}

                        </span>

                    </Link>

                );

            })}

            <div className="mobile-section-title">

                Görünüm

            </div>

            <button
                className="theme-toggle mobile-theme"
                onClick={toggleTheme}
            >

                {theme === "light"

                    ? <>

                        <Moon size={18} />

                        <span>

                            Koyu Tema

                        </span>

                    </>

                    : <>

                        <Sun size={18} />

                        <span>

                            Açık Tema

                        </span>

                    </>

                }

            </button>

            <div className="mobile-buttons">

                {user ? (

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

                ) : (

                    <>

                        <Link
                            to="/login"
                            onClick={closeMenu}
                        >

                            <Button
                                variant="secondary"
                            >

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

    );

}

export default MobileDrawer;