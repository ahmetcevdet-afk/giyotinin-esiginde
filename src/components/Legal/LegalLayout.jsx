import "./LegalLayout.css";

function LegalLayout({
    title,
    lastUpdated,
    children,
}) {
    return (

        <section className="legal-page">

            <div className="legal-container">

                <span className="legal-badge">
                    Giyotinin Eşiğinde
                </span>

                <h1>
                    {title}
                </h1>

                <p className="legal-updated">
                    Son Güncelleme: {lastUpdated}
                </p>

                <div className="legal-content">

                    {children}

                </div>

            </div>

        </section>

    );
}

export default LegalLayout;