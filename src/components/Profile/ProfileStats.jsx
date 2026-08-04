import {
    FileText,
    Eye,
    Bookmark,
    Users,
} from "lucide-react";

import "./ProfileStats.css";

function ProfileStats({

    profile,

}) {

    const stats = [

        {
            icon: FileText,
            label: "Yayın",
            value: profile?.articles_count ?? 0,
        },

        {
            icon: Eye,
            label: "Okunma",
            value: profile?.views_count ?? 0,
        },

        {
            icon: Bookmark,
            label: "Kaydedilme",
            value: profile?.saves_count ?? 0,
        },

        {
            icon: Users,
            label: "Takipçi",
            value: profile?.followers_count ?? 0,
        },

    ];

    return (

        <section className="profile-stats">

            {

                stats.map((item) => {

                    const Icon = item.icon;

                    return (

                        <div
                            key={item.label}
                            className="stat-card"
                        >

                            <Icon
                                size={22}
                            />

                            <h3>

                                {Number(item.value).toLocaleString("tr-TR")}

                            </h3>

                            <span>

                                {item.label}

                            </span>

                        </div>

                    );

                })

            }

        </section>

    );

}

export default ProfileStats;