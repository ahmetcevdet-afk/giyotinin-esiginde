import { Link } from "react-router-dom";
import {
    FilePlus2,
    LayoutDashboard,
    BookOpen,
} from "lucide-react";

import { useAuth } from "../../contexts/AuthContext";

import Button from "../Button/Button";

import "./MemberCTA.css";

function MemberCTA() {

    const { user } = useAuth();

    const fullName =
        user?.user_metadata?.full_name ||
        user?.email?.split("@")[0] ||
        "Araştırmacı";

    const firstName = fullName.split(" ")[0];

    return (

        <section className="member-cta">

            <div className="container">

                <div className="member-cta-content">

                    <span className="member-cta-badge">

                        Tekrar hoş geldin 👋

                    </span>

                    <h2>

                        {firstName},
                        bugün ne üzerinde çalışmak istiyorsun?

                    </h2>

                    <p>

                        Yeni bir araştırma oluşturabilir,
                        önceki çalışmalarını düzenleyebilir
                        veya platformdaki yayınları keşfedebilirsin.

                    </p>

                    <div className="member-cta-actions">

                        <Link to="/editor">

                            <Button>

                                <FilePlus2 size={18} />

                                Yeni Makale

                            </Button>

                        </Link>

                        <Link to="/dashboard">

                            <Button variant="secondary">

                                <LayoutDashboard size={18} />

                                Dashboard

                            </Button>

                        </Link>

                    </div>

                    <div className="member-shortcuts">

                        <Link to="/articles">

                            <BookOpen size={18} />

                            Araştırmaları Keşfet

                        </Link>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default MemberCTA;