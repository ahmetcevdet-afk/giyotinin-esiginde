import "./Home.css";


import {
  FiBookOpen,
  FiCompass,
  FiCpu,
  FiFeather,
  FiGlobe,
  FiHeart,
  FiTrendingUp,
} from "react-icons/fi";

import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Footer from "../components/Footer/Footer";
import CTA from "../components/CTA/CTA"; 

const categories = [
  { name: "Siyaset", count: "412 araştırma", icon: FiGlobe },
  { name: "Felsefe", count: "367 araştırma", icon: FiCompass },
  { name: "Ekonomi", count: "289 araştırma", icon: FiTrendingUp },
  { name: "Tarih", count: "522 araştırma", icon: FiBookOpen },
  { name: "Yapay Zekâ", count: "276 araştırma", icon: FiCpu },
  { name: "Eğitim", count: "198 araştırma", icon: FiFeather },
  { name: "Psikoloji", count: "173 araştırma", icon: FiHeart },
];

const announcements = [
  {
    category: "Yeni Yayın",
    date: "24 Temmuz 2026",
    title: "Modern dünyada eleştiri kültürü üzerine yeni dosya yayında.",
  },
  {
    category: "Çağrı",
    date: "18 Temmuz 2026",
    title: "Sonbahar sayısı için makale ve deneme başvuruları açıldı.",
  },
  {
    category: "Söyleşi",
    date: "12 Temmuz 2026",
    title: "Düşüncenin kamusal alandaki yeri üzerine yeni bir konuşma.",
  },
];

function Home({ theme, setTheme }) {
  return (
    <>
      <Navbar
  theme={theme}
  setTheme={setTheme}
/>

      <main>
        <Hero />

        <section
          className="categories-section"
          aria-labelledby="categories-title"
        >
          <div className="container">
            <div className="categories-heading">
              <div>
                <span className="section-eyebrow">Keşfet</span>
                <h2 id="categories-title">İlgi Alanlarını Seç</h2>
              </div>

              <a className="section-link" href="/categories">
                Tüm kategoriler <span aria-hidden="true">→</span>
              </a>
            </div>

            <div className="categories-list">
              {categories.map((category) => {
                const Icon = category.icon;

                return (
                  <a
                    className="category-item"
                    href="/categories"
                    key={category.name}
                  >
                    <span className="category-icon" aria-hidden="true">
                      <Icon />
                    </span>

                    <span className="category-content">
                      <span className="category-name">{category.name}</span>
                      <span className="category-count">{category.count}</span>
                    </span>

                    <span className="category-arrow" aria-hidden="true">
                      →
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section
          className="announcements-section"
          aria-labelledby="announcements-title"
        >
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="section-eyebrow">Gündem</span>
                <h2 id="announcements-title">Duyurular</h2>
              </div>

              <a className="section-link" href="/announcements">
                Tümünü Gör <span aria-hidden="true">→</span>
              </a>
            </div>

            <div className="announcements-grid">
              {announcements.map((announcement) => (
                <a
                  className="announcement-card"
                  href="/announcements"
                  key={announcement.title}
                >
                  <div className="announcement-meta">
                    <span>{announcement.category}</span>
                    <time>{announcement.date}</time>
                  </div>

                  <h3>{announcement.title}</h3>

                  <span className="announcement-link">
                    Duyuruyu oku <span aria-hidden="true">→</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <CTA />
      <Footer />
    </>
  );
}

export default Home;