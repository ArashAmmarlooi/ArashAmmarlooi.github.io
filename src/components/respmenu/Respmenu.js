import React, { useState, useRef } from "react";
import styles from "../respmenu/Respmenu.scss";
import Hamburger from "../../assets/hamburger.svg";
import { NavLink } from "react-router-dom";

const Respmenu = () => {
  const [ultoggle, setUltoggle] = useState(true);
  const respul = useRef();

  function toggleRespMenu() {
    const resul = respul.current;
    setUltoggle(!ultoggle)
    if (ultoggle) {
      resul.style.display = 'block';
    }
    else {
      resul.style.display = 'none';
    }
  }

  return (
    <>
      <nav className={styles.navmenu}>
        <div>
          <p className={styles.titleHeader}>Arash Ammarlooi</p>
          <img onClick={toggleRespMenu} src={Hamburger} alt="Hamburger" className={styles.humburger} />
        </div>
        <ul ref={respul} className={styles.respul}>
          <li>
            <NavLink 
              exact 
              activeClassName={styles.navactive} 
              to="/"
              onClick={() => setUltoggle(true)}>
              Home
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Respmenu;