import "./Hero.css";

import Button from "../Button/Button";

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <span className="hero-badge">Akademik Yayın Platformu</span>

          <h1>
            Fikirler <span>yargılanır,</span>
            <br />
            insanlar değil.
          </h1>

          <p className="hero-description">
            Giyotinin Eşiğinde; araştırmaların, denemelerin, eleştirilerin ve
            özgün akademik çalışmaların yayımlandığı bağımsız bir dijital yayın
            platformudur.
          </p>

          <div className="hero-buttons">
            <Button>Makaleleri Keşfet</Button>
            <Button variant="secondary">Hakkımızda</Button>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <h3>150+</h3>
              <span>Makale</span>
            </div>

            <div className="stat">
              <h3>25+</h3>
              <span>Yazar</span>
            </div>

            <div className="stat">
              <h3>8</h3>
              <span>Kategori</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;