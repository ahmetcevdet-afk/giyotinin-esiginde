import { useEffect, useRef, useState } from "react";
import { ChevronDown, LayoutDashboard, User, FileText, Bookmark, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

import "./UserMenu.css";

function UserMenu({ user, logout }) {

    const [open, setOpen] = useState(false);

    const menuRef = useRef(null);

    const username = user.email.split("@")[0];

const initials = username
    .split(/[._-]/)
    .map(word => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

    useEffect(() => {

        function handleClick(e) {

            if (
                menuRef.current &&
                !menuRef.current.contains(e.target)
            ) {
                setOpen(false);
            }

        }

        document.addEventListener("mousedown", handleClick);

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClick
            );

    }, []);

    return (

        <div
            className="user-menu"
            ref={menuRef}
        >

            <button
                className="user-trigger"
                onClick={() => setOpen(!open)}
                aria-label="Kullanıcı Menüsü"
            >

                <div className="user-avatar">

                    {initials}

                </div>

                <ChevronDown
                  size={18}
                   className={`user-arrow ${open ? "open" : ""}`}
                      />

            </button>

            {open && (

                <div className="user-dropdown">

                    <div className="user-info">

                        <div className="user-avatar large">

                            {initials}

                        </div>

                        <div>

                            <strong>
                                {user.email.split("@")[0]}
                            </strong>

                            <span>{user.email}</span>

                        </div>

                    </div>

                    <Link 
                    to="/dashboard"
                    onClick={() => setOpen(false)}>
                        <LayoutDashboard size={18}/>
                        Dashboard
                    </Link>

                    <Link to="/profile"
                    onClick={() => setOpen(false)}>
                        <User size={18}/>
                        Profil
                    </Link>

                    <Link to="/my-pages"
                    onClick={() => setOpen(false)}>
                        <FileText size={18}/>
                        Yazılarım
                    </Link>

                    <Link to="/saved"
                    onClick={() => setOpen(false)}>
                        <Bookmark size={18}/>
                        Kaydedilenler
                    </Link>

                    <button
                        className="logout-btn"
                        onClick={async () => {
                            setOpen(false)
                            await logout();
                        }}
                    >

                        <LogOut size={18}/>

                        Çıkış Yap

                    </button>

                </div>

            )}

        </div>

    );

}

export default UserMenu;