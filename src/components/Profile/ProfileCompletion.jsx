import { Link } from "react-router-dom";
import {
    CheckCircle2,
    Circle,
} from "lucide-react";

import { calculateProfileCompletion } from "../../utils/profileCompletion";

import Button from "../Button/Button";

import "./ProfileCompletion.css";

function ProfileCompletion({

    profile,

}) {

    const completion =

        calculateProfileCompletion(profile);

    const steps = [

        {

            label: "Ad Soyad",

            completed: !!profile?.full_name,

        },

        {

            label: "Kullanıcı Adı",

            completed: !!profile?.username,

        },

        {

            label: "Biyografi",

            completed: !!profile?.bio,

        },

        {

            label: "Ülke",

            completed: !!profile?.country,

        },

        {

            label: "Eğitim Bilgileri",

            completed:

                !!profile?.education_level &&

                !!profile?.field,

        },

    ];

    return (

        <section className="profile-completion">

            <div className="profile-card">

                <div className="completion-header">

                    <div>

                        <h2>

                            Profil Tamamlanma

                        </h2>

                        <p>

                            Profilini tamamlayarak
                            platformun tüm temel
                            özelliklerinden
                            yararlanabilirsin.

                        </p>

                    </div>

                    <strong>

                        %{completion}

                    </strong>

                </div>

                <div className="completion-bar">

                    <div

                        className="completion-fill"

                        style={{

                            width: `${completion}%`,

                        }}

                    />

                </div>

                <div className="completion-list">

                    {steps.map((step) => (

                        <div

                            key={step.label}

                            className="completion-item"

                        >

                            {

                                step.completed

                                    ? (

                                        <CheckCircle2

                                            size={18}

                                        />

                                    )

                                    : (

                                        <Circle

                                            size={18}

                                        />

                                    )

                            }

                            <span>

                                {step.label}

                            </span>

                        </div>

                    ))}

                </div>

                {

                    completion < 100 && (

                        <Link

                            to="/profile/edit"

                        >

                            <Button>

                                Profili Düzenle

                            </Button>

                        </Link>

                    )

                }

            </div>

        </section>

    );

}

export default ProfileCompletion;