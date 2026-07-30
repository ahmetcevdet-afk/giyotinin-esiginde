import "./Hero.css";

import Button from "../Button/Button";

const announcements = [
  {
    date: "24 Temmuz 2026",
    category: "Yeni Yayın",
    title: "Modern dünyada eleştiri kültürü üzerine yeni dosya yayında.",
  },
  {
    date: "18 Temmuz 2026",
    category: "Çağrı",
    title: "Sonbahar sayısı için makale ve deneme başvuruları açıldı.",
  },
  {
    date: "12 Temmuz 2026",
    category: "Söyleşi",
    title: "Düşüncenin kamusal alandaki yeri üzerine yeni bir konuşma.",
  },
];

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

        <aside className="announcements-panel" aria-labelledby="announcements-title">
          <div className="announcements-header">
            <div>
              <span className="announcements-eyebrow">Gündem</span>
              <h2 id="announcements-title">Duyurular</h2>
            </div>
            <a href="/announcements">Tümünü gör</a>
          </div>

          <div className="announcements-list">
            {announcements.map((announcement) => (
              <a
                className="announcement-item"
                href="/announcements"
                key={announcement.title}
              >
                <div className="announcement-meta">
                  <span>{announcement.category}</span>
                  <time>{announcement.date}</time>
                </div>
                <h3>{announcement.title}</h3>
                <span className="announcement-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

export default Hero;