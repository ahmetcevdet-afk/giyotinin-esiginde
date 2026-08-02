import { Link } from "react-router-dom";
import { BookOpen, PenSquare, ShieldCheck } from "lucide-react";

import "./CTA.css";

function CTA() {
    return (
        <section className="cta">

            <div className="container cta-container">

                <div className="cta-content">

                    <span className="cta-badge">
                        Akademik Yayın Platformu
                    </span>

                    <h2>
                        Bilgi paylaşıldıkça büyür.
                    </h2>

                    <p>
                        Yalnızca içerik yayımlamak için değil; düşünmek, tartışmak ve üretmek için tasarlanmış modern bir akademik yayın platformu.
                    </p>

                    <Link
                        to="/register"
                        className="cta-button"
                    >
                        Hemen Katıl
                    </Link>

                </div>

                <div className="cta-features">

                    <div className="cta-feature">

                        <span>
                            <BookOpen size={18} />
                        </span>

                        <div>
                            <strong>Akademik İçerikler</strong>

                            <small>
                                Bilimsel araştırmaları ve özgün makaleleri keşfet.
                            </small>
                        </div>

                    </div>

                    <div className="cta-feature">

                        <span>
                            <PenSquare size={18} />
                        </span>

                        <div>
                            <strong>Yayınla</strong>

                            <small>
                                Kendi araştırmalarını ve fikirlerini paylaş.
                            </small>
                        </div>

                    </div>

                    <div className="cta-feature">

                        <span>
                            <ShieldCheck size={18} />
                        </span>

                        <div>
                            <strong>Bağımsız Platform</strong>

                            <small>
                                Reklamsız ve özgür akademik yayıncılık.
                            </small>
                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default CTA;