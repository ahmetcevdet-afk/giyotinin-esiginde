import {
    UserRound,
    MapPin,
    UserPen,
} from "lucide-react";

import { Link } from "react-router-dom";

import Button from "../Button/Button";

import "./ProfileHeader.css";

function ProfileHeader({ profile }) {

    const fullName =
        profile?.full_name ||
        "İsimsiz Kullanıcı";

    const username =
        profile?.username ||
        "username";

    const initials = fullName
        .split(" ")
        .map((word) => word[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

    return (

        <header className="profile-header">

            <div className="profile-card">

                <div className="profile-avatar">

                    {profile?.avatar_url ? (

                        <img
                            src={profile.avatar_url}
                            alt={fullName}
                        />

                    ) : (

                        <UserRound size={42}/>

                    )}

                </div>

                <h1>

                    {fullName}

                </h1>

                <p className="profile-username">

                    @{username}

                </p>

                {profile?.country && (

                    <div className="profile-location">

                        <MapPin size={16}/>

                        <span>

                            {profile.country}

                        </span>

                    </div>

                )}

                <Link to="/profile/edit">

                    <Button>

                        <UserPen size={18}/>

                        Profili Düzenle

                    </Button>

                </Link>

            </div>

        </header>

    );

}

export default ProfileHeader;