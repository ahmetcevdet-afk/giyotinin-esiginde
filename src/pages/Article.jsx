import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

import { supabase } from "../lib/supabase";

import "./Article.css";

function Article({

    theme,

    setTheme,

}) {

    const { slug } = useParams();

    const [article, setArticle] = useState(null);

    const [loading, setLoading] = useState(true);

    const [notFound, setNotFound] = useState(false);

    useEffect(() => {

        async function fetchArticle() {

            setLoading(true);

            const { data, error } = await supabase

                .from("articles")

                .select("*")

                .eq("slug", slug)

                .eq("status", "published")

                .eq("visibility", "public")

                .maybeSingle();

            if (error || !data) {

                console.error(error);

                setNotFound(true);

                setLoading(false);

                return;

            }

            setArticle(data);

            setLoading(false);

        }

        fetchArticle();

    }, [slug]);

    if (loading) {

        return (

            <>

                <Navbar
                    theme={theme}
                    setTheme={setTheme}
                />

                <main className="container article-page">

                    <p>

                        Makale yükleniyor...

                    </p>

                </main>

                <Footer theme={theme} />

            </>

        );

    }

    if (notFound) {

        return (

            <>

                <Navbar
                    theme={theme}
                    setTheme={setTheme}
                />

                <main className="container article-page">

                    <div className="article-not-found">

                        <h1>

                            Makale Bulunamadı

                        </h1>

                        <p>

                            Aradığınız makale mevcut değil
                            veya henüz yayımlanmamış.

                        </p>

                    </div>

                </main>

                <Footer theme={theme} />

            </>

        );

    }

    return (

        <>

            <Navbar
                theme={theme}
                setTheme={setTheme}
            />

            <main className="container article-page">

                <article className="article">

                    {article.cover_image && (

                        <img
                            src={article.cover_image}
                            alt={article.title}
                            className="article-cover"
                        />

                    )}

                    <header className="article-header">

                        <span className="article-language">

                            {article.language || "Türkçe"}

                        </span>

                        <h1>

                            {article.title}

                        </h1>

                        {article.abstract && (

                            <p className="article-abstract">

                                {article.abstract}

                            </p>

                        )}

                        <div className="article-meta">

                            <span>

                                {article.reading_time
                                    ? `${article.reading_time} dk okuma`
                                    : "Makale"}

                            </span>

                            <span>

                                {article.views} okunma

                            </span>

                        </div>

                    </header>

                    <div className="article-content">

                        {article.content
                            .split("\n")
                            .map((paragraph, index) => (

                                paragraph.trim() ? (

                                    <p key={index}>

                                        {paragraph}

                                    </p>

                                ) : (

                                    <br key={index} />

                                )

                            ))}

                    </div>

                </article>

            </main>

            <Footer
                theme={theme}
            />

        </>

    );

}

export default Article;