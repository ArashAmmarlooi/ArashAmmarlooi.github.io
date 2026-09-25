import React from "react";
import styles from "../navmenu/Navmenu.scss";
import { scrollToSection } from "../../utils/scrollTo";

const LINKS = [
  { id: "hero", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const Navmenu = ({ navSolid }) => {
  const handleNav = (e, id) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <nav className={`${styles.navmenu} ${navSolid ? styles.navSolid : ""}`}>
      <button
        type="button"
        className={styles.titleHeader}
        onClick={(e) => handleNav(e, "hero")}
      >
        Arash Ammarlooi
      </button>
      <ul>
        {LINKS.map((link) => (
          <li key={link.id}>
            <a href={`#${link.id}`} onClick={(e) => handleNav(e, link.id)}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navmenu;
