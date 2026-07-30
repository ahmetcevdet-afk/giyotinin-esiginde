import "./Home.css";
import {
  FiBookOpen,
  FiHeart,
  FiCompass,
  FiCpu,
  FiFeather,
  FiGlobe,
  FiTrendingUp,
} from "react-icons/fi";

import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Footer from "../components/Footer/Footer";

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

function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <section className="categories-section" aria-label="Kategoriler">
          <div className="container">
            <div className="categories-list">
              {categories.map((category) => (
                <a
                  className="category-item"
                  href="/categories"
                  key={category.name}
                >
                  <span className="category-name">{category.name}</span>
                  <span className="category-count">{category.count}</span>
                </a>
              ))}

              <a className="category-item all-categories" href="/categories">
                Tüm Kategoriler <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        <section className="categories-section" aria-labelledby="categories-title">
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
          <a className="category-item" href="/categories" key={category.name}>
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
      </main>

      <Footer />
    </>
  );
}

export default Home;