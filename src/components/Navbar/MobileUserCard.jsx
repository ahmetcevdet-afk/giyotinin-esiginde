import { Link } from "react-router-dom";

import "./MobileUserCard.css";

function MobileUserCard({

    user,
    closeMenu,

}) {

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

    // Sonra profiles tablosundan gelecek.
    const completion = 40;

    return (

        <>

            <div className="mobile-user-card">

                <div className="mobile-user-avatar">

                    {initials}

                </div>

                <div className="mobile-user-details">

                    <strong>

                        {fullName}

                    </strong>

                    <span>

                        @{username}

                    </span>

                    <small>

                        Araştırmacı

                    </small>

                </div>

            </div>

            <div className="mobile-progress">

                <div className="mobile-progress-header">

                    <span>

                        Profil Tamamlanma

                    </span>

                    <strong>

                        %{completion}

                    </strong>

                </div>

                <div className="mobile-progress-bar">

                    <div
                        className="mobile-progress-fill"
                        style={{
                            width: `${completion}%`,
                        }}
                    />

                </div>

                <p className="mobile-progress-text">

                    Profilinizi tamamlayarak
                    makale yayımlamaya başlayabilirsiniz.

                </p>

                <Link
                    to="/complete-profile"
                    onClick={closeMenu}
                    className="complete-profile-btn"
                >

                    Profili Tamamla →

                </Link>

            </div>

        </>

    );

}

export default MobileUserCard;