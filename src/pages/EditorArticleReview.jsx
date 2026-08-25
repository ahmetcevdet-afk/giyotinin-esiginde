import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    ArrowLeft,
    Archive,
    CheckCircle2,
    Download,
    FileText,
    UserRound,
    CalendarDays,
    Clock3,
} from "lucide-react";

import toast from "react-hot-toast";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";

import "./EditorArticleReview.css";


function EditorArticleReview({
    theme,
    setTheme,
}) {

    const {
        user,
        profile,
        loading: authLoading,
    } = useAuth();

    const {
        id,
    } = useParams();

    const navigate = useNavigate();

    const [article, setArticle] = useState(null);
    const [author, setAuthor] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [actionLoading, setActionLoading] = useState(false);


    /*
    =========================================================
    MAKALEYİ GETİR
    =========================================================
    */

    useEffect(() => {

        if (authLoading) return;

        if (!user || !profile) {

            setLoading(false);
            return;

        }

        if (
            profile.role !== "editor" &&
            profile.role !== "admin"
        ) {

            setLoading(false);
            return;

        }

        async function fetchArticle() {

            setLoading(true);
            setError("");

            const {
                data,
                error: articleError,
            } = await supabase
                .from("articles")
                .select("*")
                .eq("id", id)
                .maybeSingle();

            if (articleError) {

                console.error(articleError);

                setError(
                    "Makale yüklenirken bir hata oluştu."
                );

                setLoading(false);

                return;

            }

            if (!data) {

                setError(
                    "Makale bulunamadı veya bu makaleye erişilemiyor."
                );

                setLoading(false);

                return;

            }

            setArticle(data);


            /*
            =================================================
            YAZAR BİLGİSİ
            =================================================
            */

            if (data.author_id) {

                const {
                    data: authorData,
                    error: authorError,
                } = await supabase
                    .from("profiles")
                    .select(`
                        id,
                        full_name,
                        username,
                        bio,
                        country,
                        education_level,
                        field,
                        institution
                    `)
                    .eq("id", data.author_id)
                    .maybeSingle();

                if (!authorError) {

                    setAuthor(authorData);

                }

            }

            setLoading(false);

        }

        fetchArticle();

    }, [
        id,
        user,
        profile,
        authLoading,
    ]);


    /*
    =========================================================
    TARİH FORMATLAMA
    =========================================================
    */

    function formatDate(date) {

        if (!date) {
            return "Belirtilmemiş";
        }

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
    =========================================================
    DURUM GÜNCELLE
    =========================================================
    */

    async function updateStatus(newStatus) {

        if (!article) return;

        setActionLoading(true);

        const toastId = toast.loading(
            newStatus === "published"
                ? "Makale yayımlanıyor..."
                : "Makale arşivleniyor..."
        );

        try {

            const {
                error: updateError,
            } = await supabase
                .from("articles")
                .update({
                    status: newStatus,
                    updated_at: new Date().toISOString(),
                })
                .eq("id", article.id)
                .eq("status", "pending");

            if (updateError) {

                throw updateError;

            }

            toast.success(
                newStatus === "published"
                    ? "Makale başarıyla yayımland."
                    : "Makale arşivlendi.",
                {
                    id: toastId,
                }
            );

            navigate("/editor-panel");

        } catch (err) {

            console.error(err);

            toast.error(
                err.message ||
                "Makale güncellenemedi.",
                {
                    id: toastId,
                }
            );

        } finally {

            setActionLoading(false);

        }

    }


    /*
    =========================================================
    AUTH LOADING
    =========================================================
    */

    if (authLoading) {

        return (
            <>
                <Navbar
                    theme={theme}
                    setTheme={setTheme}
                />

                <main className="container editor-review-page">

                    <div className="editor-review-state">

                        <p>
                            Yükleniyor...
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
    =========================================================
    YETKİ KONTROLÜ
    =========================================================
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

                <main className="container editor-review-page">

                    <div className="editor-review-state">

                        <FileText size={48} />

                        <h1>
                            Yetkisiz Erişim
                        </h1>

                        <p>
                            Bu sayfaya yalnızca
                            editörler erişebilir.
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
    =========================================================
    MAKALE LOADING
    =========================================================
    */

    if (loading) {

        return (
            <>
                <Navbar
                    theme={theme}
                    setTheme={setTheme}
                />

                <main className="container editor-review-page">

                    <div className="editor-review-state">

                        <p>
                            Makale yükleniyor...
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
    =========================================================
    HATA / MAKALE BULUNAMADI
    =========================================================
    */

    if (error || !article) {

        return (
            <>
                <Navbar
                    theme={theme}
                    setTheme={setTheme}
                />

                <main className="container editor-review-page">

                    <div className="editor-review-state">

                        <FileText size={48} />

                        <h1>
                            Makale Bulunamadı
                        </h1>

                        <p>
                            {error ||
                                "Aradığınız makale mevcut değil."}
                        </p>

                        <button
                            type="button"
                            className="editor-review-button-large archive"
                            onClick={() =>
                                navigate("/editor-panel")
                            }
                        >

                            <ArrowLeft size={16} />

                            Editör Paneline Dön

                        </button>

                    </div>

                </main>

                <Footer
                    theme={theme}
                />
            </>
        );

    }


    /*
    =========================================================
    ANA SAYFA
    =========================================================
    */

    return (
        <>
            <Navbar
                theme={theme}
                setTheme={setTheme}
            />

            <main className="container editor-review-page">

                {/* GERİ DÖN */}

                <button
                    type="button"
                    className="editor-review-back"
                    onClick={() =>
                        navigate("/editor-panel")
                    }
                >

                    <ArrowLeft size={17} />

                    Editör Paneline Dön

                </button>


                {/* HEADER */}

                <header className="editor-review-header">

                    <span className="section-eyebrow">

                        Editör İncelemesi

                    </span>

                    <h1>
                        Makale İncele
                    </h1>

                    <p>
                        Bu yayın isteğini inceleyebilir,
                        yayımlayabilir veya arşivleyebilirsin.
                    </p>

                </header>


                {/* ARTICLE CARD */}

                <article className="editor-review-card-large">


                    {/* COVER */}

                    {article.cover_image && (

                        <div className="editor-review-cover-large">

                            <img
                                src={article.cover_image}
                                alt={article.title}
                            />

                        </div>

                    )}


                    {/* META */}

                    <div className="editor-review-top">

                        <span className="editor-pending-badge">

                            <Clock3 size={14} />

                            İnceleme Bekliyor

                        </span>

                        <span className="editor-review-date">

                            <CalendarDays size={15} />

                            {formatDate(
                                article.created_at
                            )}

                        </span>

                    </div>


                    {/* TITLE */}

                    <h2 className="editor-review-title">

                        {article.title}

                    </h2>


                    {/* AUTHOR */}

                    <div className="editor-review-author">

                        <UserRound size={18} />

                        <div>

                            <strong>

                                {author?.full_name ||
                                    author?.username ||
                                    "Bilinmeyen yazar"}

                            </strong>

                            {author?.institution && (

                                <span>

                                    {author.institution}

                                </span>

                            )}

                        </div>

                    </div>


                    {/* ABSTRACT */}

                    {article.abstract && (

                        <section className="editor-review-section">

                            <h3>
                                Özet
                            </h3>

                            <p>
                                {article.abstract}
                            </p>

                        </section>

                    )}


                    {/* ARTICLE INFORMATION */}

                    <section className="editor-review-section">

                        <h3>
                            Yayın Bilgileri
                        </h3>

                        <div className="editor-review-info-grid">

                            <div>

                                <span>
                                    Dil
                                </span>

                                <strong>
                                    {article.language ||
                                        "Belirtilmemiş"}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Okuma Süresi
                                </span>

                                <strong>

                                    {article.reading_time
                                        ? `${article.reading_time} dakika`
                                        : "Belirtilmemiş"}

                                </strong>

                            </div>


                            <div>

                                <span>
                                    Durum
                                </span>

                                <strong>
                                    {article.status}
                                </strong>

                            </div>

                        </div>

                    </section>


                    {/* PDF / WORD FILE */}

                    <section className="editor-review-section">

                        <h3>
                            Makale Dosyası
                        </h3>

                        {article.file_url ? (

                            <a
                                href={article.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="editor-file-link"
                            >

                                <FileText size={22} />

                                <span>
                                    Makale dosyasını aç
                                </span>

                                <Download size={18} />

                            </a>

                        ) : (

                            <div className="editor-file-missing">

                                <FileText size={20} />

                                Makale dosyası bulunamadı.

                            </div>

                        )}

                    </section>


                    {/* ACTIONS */}

                    <div className="editor-review-actions-large">

                        <button
                            type="button"
                            className="editor-review-button-large archive"
                            onClick={() =>
                                updateStatus("archived")
                            }
                            disabled={actionLoading}
                        >

                            <Archive size={18} />

                            {actionLoading
                                ? "İşleniyor..."
                                : "Arşivle"}

                        </button>


                        <button
                            type="button"
                            className="editor-review-button-large publish"
                            onClick={() =>
                                updateStatus("published")
                            }
                            disabled={actionLoading}
                        >

                            <CheckCircle2 size={18} />

                            {actionLoading
                                ? "İşleniyor..."
                                : "Yayınla"}

                        </button>

                    </div>

                </article>

            </main>

            <Footer
                theme={theme}
                setTheme={setTheme}
            />
        </>
    );

}

export default EditorArticleReview;