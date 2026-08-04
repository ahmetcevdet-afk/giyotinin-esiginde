import { Link } from "react-router-dom";
import { Check } from "lucide-react";

import Button from "../Button/Button";

import "./GuestCTA.css";

function GuestCTA() {

    return (

        <section className="guest-cta">

            <div className="container">

                <div className="guest-cta-content">

                    <span className="guest-cta-badge">

                        Açık Erişim • Akademik • Ücretsiz

                    </span>

                    <h2>

                        Akademik yolculuğunu bugün başlat.

                    </h2>

                    <p>

                        Araştırmalarını yayımla, fikirlerini paylaş,
                        diğer araştırmacılarla bağlantı kur ve
                        açık erişimli bilgiye katkıda bulun.

                    </p>

                    <div className="guest-cta-actions">

                        <Link to="/register">

                            <Button>

                                Ücretsiz Hesap Oluştur

                            </Button>

                        </Link>

                        <Link
                            to="/articles"
                            className="guest-secondary"
                        >

                            Araştırmaları Keşfet →

                        </Link>

                    </div>

                    <div className="guest-cta-features">

                        <div className="guest-feature">

                            <Check size={18} />

                            <span>

                                Açık Erişim

                            </span>

                        </div>

                        <div className="guest-feature">

                            <Check size={18} />

                            <span>

                                ORCID Desteği

                                <small>

                                    (Yakında)

                                </small>

                            </span>

                        </div>

                        <div className="guest-feature">

                            <Check size={18} />

                            <span>

                                Ücretsiz Yayın

                            </span>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default GuestCTA;