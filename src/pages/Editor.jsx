import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Save,
    Send,
    FileText,
    Image as ImageIcon,
    X,
} from "lucide-react";

import toast from "react-hot-toast";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Button from "../components/Button/Button";

import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";

import "./Editor.css";


/* =========================================================
   SLUG
========================================================= */

function createSlug(text) {

    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/ğ/g, "g")
        .replace(/ü/g, "u")
        .replace(/ş/g, "s")
        .replace(/ı/g, "i")
        .replace(/ö/g, "o")
        .replace(/ç/g, "c")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

}


/* =========================================================
   DOSYA İSMİ
========================================================= */

function sanitizeFileName(name) {

    return name
        .toLowerCase()
        .replace(/ğ/g, "g")
        .replace(/ü/g, "u")
        .replace(/ş/g, "s")
        .replace(/ı/g, "i")
        .replace(/ö/g, "o")
        .replace(/ç/g, "c")
        .replace(/[^a-z0-9.-]/g, "-")
        .replace(/-+/g, "-");

}


/* =========================================================
   EDITOR
========================================================= */

function Editor({

    theme,

    setTheme,

}) {

    const navigate = useNavigate();

    const {
        user,
    } = useAuth();


    /* =====================================================
       FORM
    ===================================================== */

    const [title, setTitle] = useState("");

    const [abstract, setAbstract] = useState("");

    const [category, setCategory] = useState("");

    const [articleType, setArticleType] = useState("");

    const [language, setLanguage] = useState("Türkçe");


    /* =====================================================
       FILES
    ===================================================== */

    const [coverFile, setCoverFile] = useState(null);

    const [articleFile, setArticleFile] = useState(null);


    /* =====================================================
       LOADING
    ===================================================== */

    const [loading, setLoading] = useState(false);


    /* =====================================================
       COVER
    ===================================================== */

    function handleCoverChange(event) {

        const file =
            event.target.files?.[0];

        if (!file) return;


        const validTypes = [

            "image/png",

            "image/jpeg",

            "image/webp",

        ];


        if (!validTypes.includes(file.type)) {

            toast.error(
                "Lütfen PNG, JPG veya WEBP formatında bir kapak görseli seçin."
            );

            return;

        }


        setCoverFile(file);

    }


    /* =====================================================
       ARTICLE FILE
    ===================================================== */

    function handleArticleFileChange(event) {

        const file =
            event.target.files?.[0];

        if (!file) return;


        const validTypes = [

            "application/pdf",

            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

            "application/msword",

        ];


        const validExtensions = [

            ".pdf",

            ".docx",

            ".doc",

        ];


        const extension =

            "." +

            file.name
                .split(".")
                .pop()
                .toLowerCase();


        if (

            !validTypes.includes(file.type) &&

            !validExtensions.includes(extension)

        ) {

            toast.error(
                "Sadece PDF veya Word dosyası yükleyebilirsiniz."
            );

            return;

        }


        setArticleFile(file);

    }


    /* =====================================================
       REMOVE FILES
    ===================================================== */

    function removeCover() {

        setCoverFile(null);

    }


    function removeArticleFile() {

        setArticleFile(null);

    }


    /* =====================================================
       UPLOAD
    ===================================================== */

    async function uploadFile(

        bucket,

        file,

        folder,

    ) {

        if (!file) return null;


        const safeName =
            sanitizeFileName(file.name);


        const filePath =

            `${folder}/${Date.now()}-${safeName}`;


        const {
            error,
        } = await supabase.storage

            .from(bucket)

            .upload(

                filePath,

                file,

                {

                    cacheControl: "3600",

                    upsert: false,

                }

            );


        if (error) {

            throw error;

        }


        const {
            data,
        } = supabase.storage

            .from(bucket)

            .getPublicUrl(filePath);


        return data.publicUrl;

    }


    /* =====================================================
       SLUG OLUŞTUR
    ===================================================== */

    async function generateUniqueSlug() {

        const baseSlug =
            createSlug(title);


        if (!baseSlug) {

            throw new Error(
                "Geçerli bir makale başlığı girin."
            );

        }


        let slug = baseSlug;

        let counter = 1;


        while (true) {

            const {
                data,
                error,
            } = await supabase

                .from("articles")

                .select("id")

                .eq("slug", slug)

                .maybeSingle();


            if (error) {

                throw error;

            }


            if (!data) {

                break;

            }


            counter++;

            slug =
                `${baseSlug}-${counter}`;

        }


        return slug;

    }


    /* =====================================================
       SAVE ARTICLE
       
       draft   = taslak
       pending = editöre yayın isteği
    ===================================================== */

    async function saveArticle(status) {

        if (!user) {

            toast.error(
                "Makale oluşturmak için giriş yapmalısınız."
            );

            return;

        }


        /* -------------------------------------------------
           VALIDATION
        ------------------------------------------------- */

        if (!title.trim()) {

            toast.error(
                "Makale başlığı gerekli."
            );

            return;

        }


        if (!abstract.trim()) {

            toast.error(
                "Makale özeti gerekli."
            );

            return;

        }


        if (!category) {

            toast.error(
                "Lütfen bir kategori seçin."
            );

            return;

        }


        if (!articleType) {

            toast.error(
                "Lütfen makale türünü seçin."
            );

            return;

        }


        if (!articleFile) {

            toast.error(
                "Lütfen PDF veya Word dosyanızı yükleyin."
            );

            return;

        }


        /* -------------------------------------------------
           LOADING
        ------------------------------------------------- */

        setLoading(true);


        const toastId =
            toast.loading(

                status === "pending"

                    ? "Yayın isteği gönderiliyor..."

                    : "Taslak kaydediliyor..."

            );


        try {

            /* =============================================
               SLUG
            ============================================= */

            const slug =
                await generateUniqueSlug();


            /* =============================================
               COVER
            ============================================= */

            const coverUrl =

                await uploadFile(

                    "article-covers",

                    coverFile,

                    user.id

                );


            /* =============================================
               ARTICLE FILE
            ============================================= */

            const articleUrl =

                await uploadFile(

                    "article-files",

                    articleFile,

                    user.id

                );


            /* =============================================
               FILE TYPE
            ============================================= */

            const extension =

                articleFile.name

                    .split(".")

                    .pop()

                    .toLowerCase();


            /* =============================================
               DATABASE
            ============================================= */

            const {
                data,
                error,
            } = await supabase

                .from("articles")

                .insert({

                    author_id:
                        user.id,

                    title:
                        title.trim(),

                    slug,

                    abstract:
                        abstract.trim(),

                    /*
                     * Makalenin asıl içeriği
                     * PDF / Word dosyasında.
                     */
                    content:
                        "",

                    cover_image:
                        coverUrl,

                    category,

                    article_type:
                        articleType,

                    language,

                    /*
                     * draft veya pending
                     */
                    status,

                    /*
                     * Kullanıcı hiçbir zaman
                     * doğrudan public yapamaz.
                     */
                    visibility:
                        "private",

                    file_url:
                        articleUrl,

                    file_type:
                        extension,

                    file_name:
                        articleFile.name,

                    views:
                        0,

                    likes:
                        0,

                    comments:
                        0,

                    reading_time:
                        1,

                    created_at:
                        new Date().toISOString(),

                    updated_at:
                        new Date().toISOString(),

                })

                .select("id, slug, status")

                .single();


            if (error) {

                throw error;

            }


            /* =============================================
               SUCCESS
            ============================================= */

            if (status === "pending") {

                toast.success(

                    "Yayın isteğiniz editöre gönderildi.",

                    {
                        id: toastId,
                    }

                );

            } else {

                toast.success(

                    "Taslak başarıyla kaydedildi.",

                    {
                        id: toastId,
                    }

                );

            }


            /* =============================================
               YÖNLENDİRME
            ============================================= */

            /*
             * Makale henüz yayınlanmadığı için
             * public makale sayfasına gitmiyoruz.
             */

            navigate("/dashboard");


        } catch (error) {

            console.error(error);


            toast.error(

                error.message ||

                "Makale kaydedilemedi.",

                {
                    id: toastId,
                }

            );

        } finally {

            setLoading(false);

        }

    }


    /* =====================================================
       RENDER
    ===================================================== */

    return (

        <>

            <Navbar
                theme={theme}
                setTheme={setTheme}
            />


            <main className="container editor-page">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="editor-header">

                    <div>

                        <span className="section-eyebrow">

                            Yayın Merkezi

                        </span>


                        <h1>

                            Yeni Araştırma

                        </h1>


                        <p>

                            Çalışmanı oluştur,
                            dosyanı yükle ve
                            editöre gönder.

                        </p>

                    </div>

                </div>


                {/* =================================================
                    EDITOR CARD
                ================================================= */}

                <div className="editor-card">


                    {/* =================================================
                        BAŞLIK
                    ================================================= */}

                    <div className="editor-field">

                        <label>

                            Başlık

                        </label>


                        <input

                            type="text"

                            value={title}

                            onChange={(e) =>
                                setTitle(
                                    e.target.value
                                )
                            }

                            placeholder="Makalenizin başlığını yazın..."

                        />

                    </div>


                    {/* =================================================
                        ÖZET
                    ================================================= */}

                    <div className="editor-field">

                        <label>

                            Özet

                        </label>


                        <textarea

                            value={abstract}

                            onChange={(e) =>
                                setAbstract(
                                    e.target.value
                                )
                            }

                            placeholder="Makalenizin kısa özetini yazın..."

                            rows={5}

                        />

                    </div>


                    {/* =================================================
                        KATEGORİ + TÜR
                    ================================================= */}

                    <div className="editor-row">


                        <div className="editor-field">

                            <label>

                                Kategori

                            </label>


                            <select

                                value={category}

                                onChange={(e) =>
                                    setCategory(
                                        e.target.value
                                    )
                                }

                            >

                                <option value="">

                                    Kategori seçin

                                </option>

                                <option value="Siyaset">

                                    Siyaset

                                </option>

                                <option value="Felsefe">

                                    Felsefe

                                </option>

                                <option value="Ekonomi">

                                    Ekonomi

                                </option>

                                <option value="Tarih">

                                    Tarih

                                </option>

                                <option value="Yapay Zekâ">

                                    Yapay Zekâ

                                </option>

                                <option value="Eğitim">

                                    Eğitim

                                </option>

                                <option value="Psikoloji">

                                    Psikoloji

                                </option>

                                <option value="Diğer">

                                    Diğer

                                </option>

                            </select>

                        </div>


                        <div className="editor-field">

                            <label>

                                Tür

                            </label>


                            <select

                                value={articleType}

                                onChange={(e) =>
                                    setArticleType(
                                        e.target.value
                                    )
                                }

                            >

                                <option value="">

                                    Tür seçin

                                </option>

                                <option value="Araştırma">

                                    Araştırma

                                </option>

                                <option value="Makale">

                                    Makale

                                </option>

                                <option value="İnceleme">

                                    İnceleme

                                </option>

                                <option value="Deneme">

                                    Deneme

                                </option>

                                <option value="Rapor">

                                    Rapor

                                </option>

                                <option value="Diğer">

                                    Diğer

                                </option>

                            </select>

                        </div>

                    </div>


                    {/* =================================================
                        DİL
                    ================================================= */}

                    <div className="editor-field">

                        <label>

                            Dil

                        </label>


                        <select

                            value={language}

                            onChange={(e) =>
                                setLanguage(
                                    e.target.value
                                )
                            }

                        >

                            <option value="Türkçe">

                                Türkçe

                            </option>

                            <option value="English">

                                English

                            </option>

                        </select>

                    </div>


                    {/* =================================================
                        KAPAK
                    ================================================= */}

                    <div className="editor-field">

                        <label>

                            Kapak Görseli

                        </label>


                        <label className="editor-upload">

                            <ImageIcon size={22} />


                            <span>

                                {coverFile

                                    ? coverFile.name

                                    : "Kapak görseli yükle"

                                }

                            </span>


                            <input

                                type="file"

                                accept="image/png,image/jpeg,image/webp,image/jpg"

                                onChange={
                                    handleCoverChange
                                }

                                hidden

                            />

                        </label>


                        {coverFile && (

                            <div className="editor-file-preview">

                                <ImageIcon size={18} />

                                <span>

                                    {coverFile.name}

                                </span>


                                <button

                                    type="button"

                                    onClick={
                                        removeCover
                                    }

                                >

                                    <X size={16} />

                                </button>

                            </div>

                        )}

                    </div>


                    {/* =================================================
                        MAKALE DOSYASI
                    ================================================= */}

                    <div className="editor-field">

                        <label>

                            Makale Dosyası

                        </label>


                        <label className="editor-upload">

                            <FileText size={22} />


                            <span>

                                {articleFile

                                    ? articleFile.name

                                    : "PDF veya Word dosyası yükle"

                                }

                            </span>


                            <input

                                type="file"

                                accept="
                                    .pdf,
                                    .doc,
                                    .docx,
                                    application/pdf,
                                    application/msword,
                                    application/vnd.openxmlformats-officedocument.wordprocessingml.document
                                "

                                onChange={
                                    handleArticleFileChange
                                }

                                hidden

                            />

                        </label>


                        {articleFile && (

                            <div className="editor-file-preview">

                                <FileText size={18} />

                                <span>

                                    {articleFile.name}

                                </span>


                                <button

                                    type="button"

                                    onClick={
                                        removeArticleFile
                                    }

                                >

                                    <X size={16} />

                                </button>

                            </div>

                        )}

                    </div>


                    {/* =================================================
                        BİLGİ
                    ================================================= */}

                    <div className="editor-submit-info">

                        <strong>

                            Yayın süreci

                        </strong>

                        <p>

                            Makalenizi gönderdiğinizde
                            doğrudan yayımlanmaz. Önce editör
                            tarafından incelenir. Onaylanan
                            çalışmalar platformda yayımlanır.

                        </p>

                    </div>


                    {/* =================================================
                        ACTIONS
                    ================================================= */}

                    <div className="editor-actions">


                        {/* TASLAK */}

                        <Button

                            variant="secondary"

                            type="button"

                            disabled={loading}

                            onClick={() =>
                                saveArticle(
                                    "draft"
                                )
                            }

                        >

                            <Save size={18} />

                            Taslak Kaydet

                        </Button>


                        {/* YAYIN İSTEĞİ */}

                        <Button

                            type="button"

                            disabled={loading}

                            onClick={() =>
                                saveArticle(
                                    "pending"
                                )
                            }

                        >

                            <Send size={18} />

                            Yayın İsteği Gönder

                        </Button>


                    </div>


                </div>

            </main>


            <Footer
                theme={theme}
            />

        </>

    );

}


export default Editor;