import "./Logo.css";

function Logo() {
    return (
        <div className="logo">

            <svg
                className="logo-svg"
                viewBox="0 0 120 120"
                xmlns="http://www.w3.org/2000/svg"
            >

                {/* Buraya giyotin gelecek */}

            </svg>

            <div className="logo-text">

                <span className="top">
                    GİYOTİNİN
                </span>

                <span className="bottom">
                    EŞİĞİNDE
                </span>

                <p>
                    Fikirler yargılanır, insanlar değil.
                </p>

            </div>

        </div>
    );
}

export default Logo;