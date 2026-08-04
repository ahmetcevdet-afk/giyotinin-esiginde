import { Link } from "react-router-dom";
import { UserRound } from "lucide-react";

import Button from "../Button/Button";

import "./CompleteProfileCTA.css";

function CompleteProfileCTA() {

    return (

        <section className="complete-profile-cta">

            <div className="container">

                <div className="complete-profile-card">

                    <UserRound
                        size={48}
                        className="complete-profile-icon"
                    />

                    <span className="complete-profile-badge">

                        Profil Tamamlanmadı

                    </span>

                    <h2>

                        Profilini tamamlayarak
                        ilk araştırmanı yayımla.

                    </h2>

                    <p>

                        Profil bilgilerini doldurarak
                        diğer araştırmacıların seni tanımasını
                        sağlayabilir ve platformun tüm
                        özelliklerini kullanabilirsin.

                    </p>

                    <Link to="/profile">

                        <Button>

                            Profili Tamamla

                        </Button>

                    </Link>

                </div>

            </div>

        </section>

    );

}

export default CompleteProfileCTA;