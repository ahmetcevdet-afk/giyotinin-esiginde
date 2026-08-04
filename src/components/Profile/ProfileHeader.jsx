import {
    UserRound,
    MapPin,
    UserPen,
    GraduationCap,
} from "lucide-react";

import { Link } from "react-router-dom";

import Button from "../Button/Button";

import "./ProfileHeader.css";

function ProfileHeader({

    profile,

    isOwner = true,

}) {

    const fullName =
        profile?.full_name ||
        "İsimsiz Kullanıcı";

    const username =
        profile?.username ||
        "username";

    return (

        <header className="profile-header">

            <div className="profile-card">

                {/* ==========================================
                    AVATAR
                ========================================== */}

                <div className="profile-avatar">

                    {

                        profile?.avatar_url ? (

                            <img
                                src={profile.avatar_url}
                                alt={fullName}
                            />

                        ) : (

                            <UserRound size={46} />

                        )

                    }

                </div>

                {/* ==========================================
                    BİLGİLER
                ========================================== */}

                <div className="profile-info">

                    <div className="profile-main">

                        <h1>

                            {fullName}

                        </h1>

                        <p className="profile-username">

                            @{username}

                        </p>

                        {

                            profile?.country && (

                                <div className="profile-location">

                                    <MapPin size={16} />

                                    <span>

                                        {profile.country}

                                    </span>

                                </div>

                            )

                        }

                        {

                            (

                                profile?.education_level ||

                                profile?.field

                            ) && (

                                <div className="profile-role">

                                    <GraduationCap size={15} />

                                    <span>

                                        {profile.education_level}

                                        {

                                            profile?.field &&

                                            ` • ${profile.field}`

                                        }

                                    </span>

                                </div>

                            )

                        }

                    </div>

                    {/* ==========================================
                        AKSİYONLAR
                    ========================================== */}

                    <div className="profile-actions">

                        {

                            isOwner ? (

                                <Link to="/profile/edit">

                                    <Button>

                                        <UserPen size={18} />

                                        Profili Düzenle

                                    </Button>

                                </Link>

                            ) : (

                                <>
                                    {/* Yakında:
                                        <Button>Takip Et</Button>
                                        <Button variant="secondary">
                                            Mesaj Gönder
                                        </Button>
                                    */}
                                </>

                            )

                        }

                    </div>

                </div>

            </div>

        </header>

    );

}

export default ProfileHeader;