import {
    FileText,
    Eye,
    Bookmark,
    Users,
} from "lucide-react";

import "./ProfileStats.css";

function ProfileStats({

    stats = {

        articles: 0,
        views: 0,
        saves: 0,
        followers: 0,

    },

}) {

    const items = [

        {
            icon: FileText,
            label: "Yayın",
            value: stats.articles,
        },

        {
            icon: Eye,
            label: "Okunma",
            value: stats.views,
        },

        {
            icon: Bookmark,
            label: "Kaydedilme",
            value: stats.saves,
        },

        {
            icon: Users,
            label: "Takipçi",
            value: stats.followers,
        },

    ];

    return (

        <section className="profile-stats">

            {items.map((item) => {

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

                            {item.value}

                        </h3>

                        <span>

                            {item.label}

                        </span>

                    </div>

                );

            })}

        </section>

    );

}

export default ProfileStats;