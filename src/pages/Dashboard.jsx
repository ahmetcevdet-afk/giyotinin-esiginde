import { useEffect, useState } from "react";
import {
    FileText,
    Clock3,
    CheckCircle2,
    Archive,
    Eye,
    Heart,
    MessageCircle,
} from "lucide-react";

import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

import "./Dashboard.css";

function Dashboard({ theme, setTheme }) {

    const { user } = useAuth();

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        if (!user?.id) return;

        async function fetchArticles() {

            setLoading(true);
            setError("");

            const {
                data,
                error,
            } = await supabase

                .from("articles")

                .select(`
                    id,
                    title,
                    slug,
                    abstract,
                    cover_image,
                    status,
                    visibility,
                    views,
                    likes,
                    comments,
                    reading_time,
                    created_at,
                    updated_at
                `)

                .eq("author_id", user.id)

                .order(
                    "updated_at",
                    {
                        ascending: false,
                    }
                );

            if (error) {

                console.error(error);

                setError(
                    "Makaleler yüklenirken bir hata oluştu."
                );

                setArticles([]);

            } else {

                setArticles(data || []);

            }

            setLoading(false);

        }

        fetchArticles();

    }, [user]);

    const stats = {

        total: articles.length,

        draft: articles.filter(
            (article) =>
                article.status === "draft"
        ).length,

        pending: articles.filter(
            (article) =>
                article.status === "pending"
        ).length,

        published: articles.filter(
            (article) =>
                article.status === "published"
        ).length,

        archived: articles.filter(
            (article) =>
                article.status === "archived"
        ).length,

    };

    function getStatusLabel(status) {

        switch (status) {

            case "draft":
                return "Taslak";

            case "pending":
                return "Editör İncelemesinde";

            case "published":
                return "Yayınlandı";

            case "archived":
                return "Arşivlendi";

            default:
                return status;

        }

    }

    function getStatusIcon(status) {

        switch (status) {

            case "draft":
                return <FileText size={16} />;

            case "pending":
                return <Clock3 size={16} />;

            case "published":
                return <CheckCircle2 size={16} />;

            case "archived":
                return <Archive size={16} />;

            default:
                return <FileText size={16} />;

        }

    }

    function formatDate(date) {

        if (!date) return "";

        return new Date(date).toLocaleDateString(
            "tr-TR",
            {
                day: "numeric",
                month: "long",
                year: "numeric",
            }
        );

    }

    return (

        <>

            <Navbar
                theme={theme}
                setTheme={setTheme}
            />

            <main className="container dashboard-page">

                <header className="dashboard-header">

                    <span className="section-eyebrow">
                        Araştırmacı Paneli
                    </span>

                    <h1>
                        Dashboard
                    </h1>

                    <p>
                        Araştırmalarını, yayın durumlarını
                        ve performanslarını buradan takip et.
                    </p>

                </header>


                {/* =========================================
                    STATS
                ========================================= */}

                <section className="dashboard-stats">

                    <div className="dashboard-stat">

                        <FileText size={22} />

                        <strong>
                            {stats.total}
                        </strong>

                        <span>
                            Toplam Makale
                        </span>

                    </div>


                    <div className="dashboard-stat">

                        <Clock3 size={22} />

                        <strong>
                            {stats.pending}
                        </strong>

                        <span>
                            İncelemede
                        </span>

                    </div>


                    <div className="dashboard-stat">

                        <CheckCircle2 size={22} />

                        <strong>
                            {stats.published}
                        </strong>

                        <span>
                            Yayınlandı
                        </span>

                    </div>


                    <div className="dashboard-stat">

                        <FileText size={22} />

                        <strong>
                            {stats.draft}
                        </strong>

                        <span>
                            Taslak
                        </span>

                    </div>

                </section>


                {/* =========================================
                    ARTICLES
                ========================================= */}

                <section className="dashboard-section">

                    <div className="dashboard-section-header">

                        <div>

                            <h2>
                                Araştırmalarım
                            </h2>

                            <p>
                                Gönderdiğin ve oluşturduğun
                                tüm çalışmalar.
                            </p>

                        </div>

                        <a
                            href="/editor"
                            className="dashboard-new-button"
                        >
                            + Yeni Araştırma
                        </a>

                    </div>


                    {loading && (

                        <div className="dashboard-empty">

                            <p>
                                Makaleler yükleniyor...
                            </p>

                        </div>

                    )}


                    {!loading && error && (

                        <div className="dashboard-empty">

                            <p>
                                {error}
                            </p>

                        </div>

                    )}


                    {!loading &&
                        !error &&
                        articles.length === 0 && (

                            <div className="dashboard-empty">

                                <FileText size={42} />

                                <h3>
                                    Henüz bir araştırman yok
                                </h3>

                                <p>
                                    İlk araştırmanı oluşturarak
                                    yayın sürecini başlatabilirsin.
                                </p>

                                <a
                                    href="/editor"
                                    className="dashboard-new-button"
                                >
                                    İlk Araştırmanı Oluştur
                                </a>

                            </div>

                        )}


                    {!loading &&
                        !error &&
                        articles.length > 0 && (

                            <div className="dashboard-articles">

                                {articles.map((article) => (

                                    <article
                                        key={article.id}
                                        className="dashboard-article"
                                    >

                                        <div className="dashboard-article-cover">

                                            {article.cover_image ? (

                                                <img
                                                    src={article.cover_image}
                                                    alt=""
                                                />

                                            ) : (

                                                <FileText
                                                    size={32}
                                                />

                                            )}

                                        </div>


                                        <div className="dashboard-article-content">

                                            <div className="dashboard-article-top">

                                                <span
                                                    className={`article-status status-${article.status}`}
                                                >

                                                    {getStatusIcon(
                                                        article.status
                                                    )}

                                                    {getStatusLabel(
                                                        article.status
                                                    )}

                                                </span>

                                                <time>

                                                    {formatDate(
                                                        article.updated_at ||
                                                        article.created_at
                                                    )}

                                                </time>

                                            </div>


                                            <h3>

                                                {article.title}

                                            </h3>


                                            {article.abstract && (

                                                <p>

                                                    {article.abstract}

                                                </p>

                                            )}


                                            <div className="dashboard-article-meta">

                                                <span>

                                                    <Eye size={15} />

                                                    {article.views || 0}

                                                </span>

                                                <span>

                                                    <Heart size={15} />

                                                    {article.likes || 0}

                                                </span>

                                                <span>

                                                    <MessageCircle
                                                        size={15}
                                                    />

                                                    {article.comments || 0}

                                                </span>

                                            </div>

                                        </div>

                                    </article>

                                ))}

                            </div>

                        )}

                </section>

            </main>

            <Footer
                theme={theme}
            />

        </>

    );

}

export default Dashboard;