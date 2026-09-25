import React, { useState, useEffect } from "react";
import styles from "../navmenu/Navmenu.scss";
import { NavLink, useLocation } from "react-router-dom";

const Navmenu = () => {
  const [state, setState] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const isHome = location.pathname === '/' || location.pathname === '/Portfolio' || location.pathname.endsWith('/Portfolio');
    setState(isHome);
  }, [location.pathname]);

  return (
    <>
      <nav className={styles.navmenu}>
        <p className={styles.titleHeader}>Arash Ammarlooi</p>
        <ul>
          <li>
            <NavLink
              className={state ? styles.amenu : styles.amenuloc}
              end
              to="/">
              Home
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navmenu;