import {
    Globe,
    BadgeCheck,
    ExternalLink,
} from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";

import "./ProfileLinks.css";

function ProfileLinks({ profile }) {

    function normalizeUrl(type, value) {

        if (!value) return "";

        const trimmed = value.trim();

        switch (type) {

            case "website":

                return /^https?:\/\//i.test(trimmed)

                    ? trimmed

                    : `https://${trimmed}`;

            case "linkedin":

                return /^https?:\/\//i.test(trimmed)

                    ? trimmed

                    : `https://${trimmed}`;

            case "orcid": {

                const orcid = trimmed
                    .replace(/^https?:\/\/orcid\.org\//i, "");

                return `https://orcid.org/${orcid}`;

            }

            default:

                return trimmed;

        }

    }

    const links = [

        {
            type: "website",
            icon: Globe,
            title: "Kişisel Web Sitesi",
            value: profile?.website,
            display: profile?.website,
        },

        {
            type: "linkedin",
            icon: FaLinkedin,
            title: "LinkedIn",
            value: profile?.linkedin,
            display: profile?.linkedin,
        },

        {
            type: "orcid",
            icon: BadgeCheck,
            title: "ORCID",
            value: profile?.orcid,
            display: profile?.orcid,
        },

    ].filter((link) => link.value);

    return (

        <section className="profile-links">

            <div className="profile-card">

                <h2>

                    Bağlantılar

                </h2>

                {

                    links.length > 0 ? (

                        <div className="links-list">

                            {

                                links.map((link) => {

                                    const Icon = link.icon;

                                    return (

                                        <a
                                            key={link.title}
                                            href={normalizeUrl(
                                                link.type,
                                                link.value
                                            )}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="profile-link-item"
                                        >

                                            <Icon size={20} />

                                            <div>

                                                <strong>

                                                    {link.title}

                                                </strong>

                                                <span>

                                                    {link.display}

                                                </span>

                                            </div>

                                            <ExternalLink size={16} />

                                        </a>

                                    );

                                })

                            }

                        </div>

                    ) : (

                        <p className="empty-text">

                            Henüz bağlantı eklenmemiş.

                        </p>

                    )

                }

            </div>

        </section>

    );

}

export default ProfileLinks;