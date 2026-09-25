import React from "react";
import styles from "./Navmenu.scss";
import { scrollToSection } from "../../utils/scrollTo";

const LINKS = [
  { id: "hero", label: "Home" },
  { id: "skills", label: "Stack" },
  { id: "javascript", label: "JavaScript" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const GITHUB_URL = "https://github.com/ArashAmmarlooi";
const LINKEDIN_URL = "https://www.linkedin.com/in/arash-ammarlooi-12372b147/";

const Navmenu = ({ navSolid }) => {
  const handleNav = (e, id) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <header className={`${styles.header} ${navSolid ? styles.headerScrolled : ""}`}>
      <div className={styles.navContainer}>
        <button
          type="button"
          className={styles.brand}
          onClick={(e) => handleNav(e, "hero")}
          aria-label="Arash Ammarlooi - Home"
        >
          <span className={styles.brandName}>Arash Ammarlooi</span>
          <span className={styles.brandRole}>Fullstack Engineer</span>
        </button>

        <nav className={styles.navLinks}>
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={styles.navLink}
              onClick={(e) => handleNav(e, link.id)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.navActions}>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconBtn}
            aria-label="GitHub profile"
            title="github.com/ArashAmmarlooi"
          >
            <svg className={styles.btnIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.905-.42-.405-1.035-.705-.015-.72.96-.015 1.62.885 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconBtn}
            aria-label="LinkedIn profile"
            title="linkedin.com/in/arash-ammarlooi-12372b147"
          >
            <svg className={styles.btnIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            <span>LinkedIn</span>
          </a>
          <button
            type="button"
            className={styles.contactBtn}
            onClick={(e) => handleNav(e, "contact")}
          >
            Contact
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navmenu;
