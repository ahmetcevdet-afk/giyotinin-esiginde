import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

import { accountLinks } from "./navbarData";

import "./UserMenu.css";

function UserMenu({ user, logout }) {

    const [open, setOpen] = useState(false);

    const menuRef = useRef(null);

    const username =
        user?.user_metadata?.username ||
        user?.email?.split("@")[0] ||
        "";

    const fullName =
        user?.user_metadata?.full_name ||
        username;

    const initials = fullName
        .split(" ")
        .map((word) => word[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

    const completion = 40;

    useEffect(() => {

        function handleClick(event) {

            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
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
                type="button"
                className="user-trigger"
                aria-label="Kullanıcı Menüsü"
                aria-expanded={open}
                onClick={() => setOpen((prev) => !prev)}
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

                    <div className="user-profile">

                        <div className="user-avatar large">

                            {initials}

                        </div>

                        <strong>

                            {fullName}

                        </strong>

                        <span>

                            @{username}

                        </span>

                        {/* İleride kullanırız */}
                        {/* <div className="user-badge">
                            Araştırmacı
                        </div> */}

                    </div>

                    <div className="user-progress">

                        <div className="user-progress-top">

                            <span>

                                Profil Tamamlanma

                            </span>

                            <strong>

                                %{completion}

                            </strong>

                        </div>

                        <div className="user-progress-bar">

                            <div
                                className="user-progress-fill"
                                style={{
                                    width: `${completion}%`,
                                }}
                            />

                        </div>

                        <Link
                            to="/complete-profile"
                            className="complete-profile-link"
                            onClick={() => setOpen(false)}
                        >

                            Profili Tamamla →

                        </Link>

                    </div>

                    <div className="user-divider" />

                    {accountLinks.map((item) => {

                        const Icon = item.icon;

                        return (

                            <Link
                                key={item.to}
                                to={item.to}
                                className="user-link"
                                onClick={() => setOpen(false)}
                            >

                                <Icon size={18} />

                                <span>

                                    {item.title}

                                </span>

                            </Link>

                        );

                    })}

                    <div className="user-divider" />

                    <button
                        type="button"
                        className="logout-btn"
                        onClick={async () => {

                            setOpen(false);

                            await logout();

                        }}
                    >

                        <LogOut size={18} />

                        <span>

                            Çıkış Yap

                        </span>

                    </button>

                </div>

            )}

        </div>

    );

}

export default UserMenu;