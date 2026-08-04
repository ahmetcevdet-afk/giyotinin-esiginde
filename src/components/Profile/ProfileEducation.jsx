import {
    GraduationCap,
    School,
    BookOpen,
} from "lucide-react";

import "./ProfileEducation.css";

function ProfileEducation({ profile }) {

    const educationItems = [

        {
            icon: GraduationCap,
            title: "Eğitim Durumu",
            value: profile?.education_level,
        },

        {
            icon: BookOpen,
            title: "Alan",
            value: profile?.field,
        },

        {
            icon: School,
            title: "Kurum",
            value: profile?.institution,
        },

    ].filter((item) =>

        item.value &&
        String(item.value).trim() !== ""

    );

    return (

        <section className="profile-education">

            <div className="profile-card">

                <h2>

                    Eğitim

                </h2>

                {educationItems.length > 0 ? (

                    <div className="education-list">

                        {educationItems.map((item) => {

                            const Icon = item.icon;

                            return (

                                <div
                                    key={item.title}
                                    className="education-item"
                                >

                                    <Icon size={20} />

                                    <div>

                                        <strong>

                                            {item.title}

                                        </strong>

                                        <span>

                                            {item.value}

                                        </span>

                                    </div>

                                </div>

                            );

                        })}

                    </div>

                ) : (

                    <p className="empty-text">

                        Henüz eğitim bilgisi eklenmemiş.

                    </p>

                )}

            </div>

        </section>

    );

}

export default ProfileEducation;