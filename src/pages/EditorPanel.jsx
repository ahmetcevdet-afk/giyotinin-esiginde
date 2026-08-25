import { useEffect, useState } from "react";

import {
    Clock3,
    CheckCircle2,
    Archive,
    FileText,
    Eye,
} from "lucide-react";

import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

import "./EditorPanel.css";

function EditorPanel({ theme, setTheme }) {

    const {
        user,
        profile,
        loading: authLoading,
    } = useAuth();

    const [articles, setArticles] = useState([]);

    const [loading, setLoading] = useState(true);

    const [actionLoading, setActionLoading] =
        useState(null);

    const [error, setError] = useState("");


    async function fetchPendingArticles() {

        if (!user?.id) return;

        setLoading(true);
        setError("");

        const {
            data,
            error,
        } = await supabase
            .from("articles")
            .select(`
                id,
                author_id,
                title,
                slug,
                abstract,
                content,
                cover_image,
                language,
                status,
                visibility,
                views,
                likes,
                comments,
                reading_time,
                created_at,
                updated_at
            `)
            .eq("status", "pending")
            .order("created_at", {
                ascending: true,
            });


        if (error) {

            console.error(error);

            setError(
                "Bekleyen makaleler yüklenemedi."
            );

            setArticles([]);

        } else {

            setArticles(data || []);

        }

        setLoading(false);

    }


    useEffect(() => {

        if (
            authLoading ||
            !user ||
            !profile
        ) {
            return;
        }


        if (
            profile.role !== "editor" &&
            profile.role !== "admin"
        ) {

            setLoading(false);

            return;

        }


        fetchPendingArticles();

    }, [
        user,
        profile,
        authLoading,
    ]);


    async function updateArticleStatus(
        articleId,
        newStatus
    ) {

        setActionLoading(articleId);

        setError("");


        const {
            error,
        } = await supabase
            .from("articles")
            .update({
                status: newStatus,
                updated_at:
                    new Date().toISOString(),
            })
            .eq("id", articleId)
            .eq("status", "pending");


        if (error) {

            console.error(error);

            setError(
                "Makale güncellenemedi."
            );

            setActionLoading(null);

            return;

        }


        setArticles((prev) =>
            prev.filter(
                (article) =>
                    article.id !== articleId
            )
        );

        setActionLoading(null);

    }


    function formatDate(date) {

        if (!date) return "";

        return new Date(date).toLocaleDateString(
            "tr-TR",
            {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            }
        );

    }


    /*
    ==========================================
    AUTH LOADING
    ==========================================
    */

    if (authLoading) {

        return (
            <>
                <Navbar
                    theme={theme}
                    setTheme={setTheme}
                />

                <main className="container editor-panel-page">

                    <p>
                        Yükleniyor...
                    </p>

                </main>

                <Footer
                    theme={theme}
                />
            </>
        );

    }


    /*
    ==========================================
    ACCESS DENIED
    ==========================================
    */

    if (
        !user ||
        !profile ||
        (
            profile.role !== "editor" &&
            profile.role !== "admin"
        )
    ) {

        return (
            <>
                <Navbar
                    theme={theme}
                    setTheme={setTheme}
                />

                <main className="container editor-panel-page">

                    <div className="editor-access-denied">

                        <FileText size={46} />

                        <h1>
                            Yetkisiz Erişim
                        </h1>

                        <p>
                            Bu sayfaya yalnızca editörler
                            erişebilir.
                        </p>

                    </div>

                </main>

                <Footer
                    theme={theme}
                />
            </>
        );

    }


    /*
    ==========================================
    PANEL
    ==========================================
    */

    return (
        <>
            <Navbar
                theme={theme}
                setTheme={setTheme}
            />

            <main className="container editor-panel-page">

                <header className="editor-panel-header">

                    <span className="section-eyebrow">
                        Editör Paneli
                    </span>

                    <h1>
                        Yayın Bekleyen Araştırmalar
                    </h1>

                    <p>
                        Yazarlar tarafından gönderilen
                        yayın isteklerini buradan inceleyebilirsin.
                    </p>

                </header>


                <div className="editor-panel-summary">

                    <div className="editor-summary-card">

                        <Clock3 size={22} />

                        <strong>
                            {articles.length}
                        </strong>

                        <span>
                            İnceleme Bekliyor
                        </span>

                    </div>

                </div>


                {error && (

                    <div className="editor-panel-error">
                        {error}
                    </div>

                )}


                {loading && (

                    <div className="editor-panel-empty">

                        <p>
                            Makaleler yükleniyor...
                        </p>

                    </div>

                )}


                {!loading &&
                    !error &&
                    articles.length === 0 && (

                    <div className="editor-panel-empty">

                        <CheckCircle2 size={46} />

                        <h2>
                            İncelenecek makale yok
                        </h2>

                        <p>
                            Şu anda editör onayı bekleyen
                            bir yayın bulunmuyor.
                        </p>

                    </div>

                )}


                {!loading &&
                    articles.length > 0 && (

                    <section className="editor-panel-article-list">

                        {articles.map((article) => (

                            <article
                                key={article.id}
                                className="editor-panel-article-card"
                            >

                                {/* KAPAK */}

                                <div className="editor-panel-article-cover">

                                    {article.cover_image ? (

                                        <img
                                            src={article.cover_image}
                                            alt=""
                                        />

                                    ) : (

                                        <FileText size={34} />

                                    )}

                                </div>


                                {/* İÇERİK */}

                                <div className="editor-panel-article-body">

                                    <div className="editor-panel-article-meta">

                                        <span className="editor-pending-badge">

                                            <Clock3 size={14} />

                                            İnceleme Bekliyor

                                        </span>

                                        <time>
                                            {formatDate(
                                                article.created_at
                                            )}
                                        </time>

                                    </div>


                                    <h2>
                                        {article.title}
                                    </h2>


                                    {article.abstract && (

                                        <p className="editor-panel-article-abstract">

                                            {article.abstract}

                                        </p>

                                    )}


                                    <div className="editor-panel-article-info">

                                        {article.language && (

                                            <span>
                                                Dil:{" "}
                                                {article.language}
                                            </span>

                                        )}

                                        {article.reading_time && (

                                            <span>
                                                {article.reading_time} dk okuma
                                            </span>

                                        )}

                                    </div>


                                    {/* BUTONLAR */}

                                    <div className="editor-panel-article-actions">

                                        <a
                                            href={`/editor-panel/articles/${article.id}`}
                                            className="editor-review-button secondary"
                                        >

                                            <Eye size={17} />

                                            İncele

                                        </a>


                                        <button
                                            type="button"
                                            className="editor-review-button archive"
                                            disabled={
                                                actionLoading ===
                                                article.id
                                            }
                                            onClick={() =>
                                                updateArticleStatus(
                                                    article.id,
                                                    "archived"
                                                )
                                            }
                                        >

                                            <Archive size={17} />

                                            Reddet / Arşivle

                                        </button>


                                        <button
                                            type="button"
                                            className="editor-review-button publish"
                                            disabled={
                                                actionLoading ===
                                                article.id
                                            }
                                            onClick={() =>
                                                updateArticleStatus(
                                                    article.id,
                                                    "published"
                                                )
                                            }
                                        >

                                            <CheckCircle2 size={17} />

                                            {actionLoading ===
                                            article.id
                                                ? "İşleniyor..."
                                                : "Yayınla"}

                                        </button>

                                    </div>

                                </div>

                            </article>

                        ))}

                    </section>

                )}

            </main>


            <Footer
                theme={theme}
            />

        </>
    );

}

export default EditorPanel;