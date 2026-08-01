import { Link } from "react-router-dom";

import "./NotFound.css";

function NotFound() {
    return (
        <main className="not-found">

            <h1>404</h1>

            <h2>Sayfa Bulunamadı</h2>

            <p>
                Aradığınız sayfa kaldırılmış, taşınmış
                veya hiç var olmamış olabilir.
            </p>

            <Link to="/" className="back-home">
                Ana Sayfaya Dön
            </Link>

        </main>
    );
}

export default NotFound;