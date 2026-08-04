import {
    Globe,
    BadgeCheck,
    ExternalLink,
} from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";

import "./ProfileLinks.css";

function ProfileLinks({ profile }) {

    const links = [

        {
            icon: Globe,
            title: "Kişisel Web Sitesi",
            value: profile?.website,
        },

        {
            icon: FaLinkedin,
            title: "LinkedIn",
            value: profile?.linkedin,
        },

        {
            icon: BadgeCheck,
            title: "ORCID",
            value: profile?.orcid,
        },

    ].filter(link => link.value);

    return (

        <section className="profile-links">

            <div className="profile-card">

                <h2>

                    Bağlantılar

                </h2>

                {links.length > 0 ? (

                    <div className="links-list">

                        {links.map((link) => {

                            const Icon = link.icon;

                            return (

                                <a
                                    key={link.title}
                                    href={link.value}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="profile-link-item"
                                >

                                    <Icon size={20}/>

                                    <div>

                                        <strong>

                                            {link.title}

                                        </strong>

                                        <span>

                                            {link.value}

                                        </span>

                                    </div>

                                    <ExternalLink size={16}/>

                                </a>

                            );

                        })}

                    </div>

                ) : (

                    <p className="empty-text">

                        Henüz bağlantı eklenmemiş.

                    </p>

                )}

            </div>

        </section>

    );

}

export default ProfileLinks;