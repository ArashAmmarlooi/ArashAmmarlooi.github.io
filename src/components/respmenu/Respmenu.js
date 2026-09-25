import React, { useState, useRef } from "react";
import styles from "../respmenu/Respmenu.scss";
import Hamburger from "../../assets/hamburger.svg";
import { scrollToSection } from "../../utils/scrollTo";

const LINKS = [
  { id: "hero", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const Respmenu = ({ navSolid }) => {
  const [open, setOpen] = useState(false);
  const respul = useRef();

  function toggleRespMenu() {
    setOpen(!open);
    const resul = respul.current;
    if (resul) {
      resul.style.display = open ? "none" : "block";
    }
  }

  const handleNav = (e, id) => {
    e.preventDefault();
    scrollToSection(id);
    setOpen(false);
    if (respul.current) respul.current.style.display = "none";
  };

  return (
    <nav className={`${styles.navmenu} ${navSolid ? styles.navSolid : ""}`}>
      <div>
        <button type="button" className={styles.titleHeader} onClick={(e) => handleNav(e, "hero")}>
          Arash Ammarlooi
        </button>
        <img
          onClick={toggleRespMenu}
          src={Hamburger}
          alt="Menu"
          className={styles.humburger}
        />
      </div>
      <ul ref={respul} className={styles.respul} style={{ display: "none" }}>
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

export default Respmenu;
