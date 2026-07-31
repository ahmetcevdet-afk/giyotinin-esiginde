import "./Footer.css";

import logoLight from "../../assets/images/logo-light.png";
import logoDark from "../../assets/images/logo-dark.png";

import { Mail, Scale } from "lucide-react";

import {
  FaInstagram,
  FaYoutube,
  FaXTwitter
} from "react-icons/fa6";

function Footer({ theme }) {
  const currentLogo = theme === "dark" ? logoDark : logoLight;

  return (
    <footer className="footer">
      <div className="footer-cta">

  <div className="footer-cta-content">

    <span className="footer-cta-badge">
      📖 Akademik Yayın Platformu
    </span>

    <h2>
      Bilginizi paylaşmaya hazır mısınız?
    </h2>

    <p>
      Araştırmalarınızı, makalelerinizi ve özgün fikirlerinizi
      binlerce okuyucu ile buluşturun.
    </p>

  </div>

  <div className="footer-cta-actions">

    <a
      href="/submit"
      className="footer-cta-primary"
    >
      Makale Gönder
    </a>

    <a
      href="/about"
      className="footer-cta-secondary"
    >
      Daha Fazla Bilgi
    </a>

  </div>

</div>
      <div className="container footer-container">

        <div className="footer-grid">

          {/* Sol */}
          <div className="footer-brand-column">

            <a href="/" className="footer-brand">
              <img
                src={currentLogo}
                alt="Giyotinin Eşiğinde"
                className="footer-logo"
              />

              <div>
                <h3>Giyotinin Eşiğinde</h3>

                <p className="footer-slogan">
                  Fikirler yargılanır, insanlar değil.
                </p>
              </div>
            </a>

            <p className="footer-description">
              Bağımsız akademik yayın platformu. Araştırmaların, makalelerin,
              denemelerin ve özgün fikirlerin yayımlandığı dijital bir ortam.
            </p>

            <div className="footer-socials">

              <a
                href="https://x.com/giyotininesiginde"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
              >
                <FaXTwitter />
              </a>

              <a
                href="https://instagram.com/giyotininesiginde"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>

              <a
                href="https://youtube.com/@giyotininesiginde"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>

            </div>

          </div>

          {/* Platform */}

          <div className="footer-column">

            <h4>Platform</h4>

            <a href="/">Ana Sayfa</a>
            <a href="/articles">Araştırmalar</a>
            <a href="/categories">Kategoriler</a>
            <a href="/authors">Yazarlar</a>
            <a href="/about">Hakkımızda</a>

          </div>

          {/* Yasal */}

          <div className="footer-column">

            <h4>Yasal</h4>

            <a href="/terms">Kullanım Koşulları</a>
            <a href="/privacy">Gizlilik Politikası</a>
            <a href="/cookies">Çerez Politikası</a>
            <a href="/publishing">Yayın İlkeleri</a>

          </div>

          {/* İletişim */}

          <div className="footer-column">

            <h4>İletişim</h4>

            <p>
              <Mail size={16} />
              info@giyotininesiginde.com
            </p>

            <p>
              <Scale size={16} />
              legal@giyotininesiginde.com
            </p>

          </div>

        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">

          <span>
            © 2026 Giyotinin Eşiğinde. Tüm hakları saklıdır.
          </span>

          <span>
            Made with ❤️ in Türkiye
          </span>

        </div>

      </div>
    </footer>
  );
}

export default Footer;