import React, { useState } from "react";
import styles from "./Respmenu.scss";
import { scrollToSection } from "../../utils/scrollTo";

const LINKS = [
  { id: "hero", label: "Home" },
  { id: "skills", label: "Skills & Stack" },
  { id: "javascript", label: "JavaScript" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const GITHUB_URL = "https://github.com/ArashAmmarlooi";
const LINKEDIN_URL = "https://www.linkedin.com/in/arash-ammarlooi-12372b147/";

const Respmenu = ({ navSolid }) => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  const handleNav = (e, id) => {
    e.preventDefault();
    scrollToSection(id);
    setOpen(false);
  };

  return (
    <header className={`${styles.header} ${navSolid ? styles.headerScrolled : ""}`}>
      <div className={styles.bar}>
        <button
          type="button"
          className={styles.brand}
          onClick={(e) => handleNav(e, "hero")}
          aria-label="Arash Ammarlooi - Home"
        >
          <span className={styles.brandName}>Arash Ammarlooi</span>
          <span className={styles.brandRole}>Fullstack Engineer</span>
        </button>

        <button
          type="button"
          className={styles.hamburgerBtn}
          onClick={toggleMenu}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <nav className={styles.drawer}>
          <ul className={styles.menuList}>
            {LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={styles.drawerLink}
                  onClick={(e) => handleNav(e, link.id)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className={styles.actionItem}>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.githubDrawerBtn}
              >
                View GitHub
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.linkedinDrawerBtn}
              >
                View LinkedIn
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Respmenu;
