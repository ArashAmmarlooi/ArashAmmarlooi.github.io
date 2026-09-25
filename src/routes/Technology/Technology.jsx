import React, { useEffect, useRef } from "react";
import styles from "./technology.scss";
import {
  Route,
  Routes,
  useLocation,
  NavLink,
  useNavigate,
  useMatch,
} from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Frontendcomp from "../../components/Frontendcomp";
import Backendcomp from "../../components/Backendcomp";
import Productcomp from "../../components/Productcomp";
import Devopscomp from "../../components/Devopscomp";
import { handleTab, autoslide } from "../../utils/javascript";
import "../../styles/partials/_layout.scss";
import "../../styles/partials/_services.scss";

const Technology = ({ match }) => {
  const tabcontainer = useRef();
  const techMenu = useRef();


  // const routeMatch = useMatch();
  const location = useLocation();
  // const history = useNavigate();


  useEffect(() => {
    const techMen = techMenu.current;
    const tabCont = tabcontainer.current;
  }, [])

  function tabFunc(e) {
    console.log(e, 'e');
    let id = e.currentTarget.dataset.id
    const techMen = techMenu.current;
    const tabCont = tabcontainer.current;
    for (let i in techMen.children) {
      let currentactive = document.getElementsByClassName("liactive___1Nu0m");
      if (currentactive.length > 0) {
        techMen.children[i].className = techMen.children[i].className.replace(
          "liactive___1Nu0m",
          ""
        );
      }
    }
    e.target.classList.add("liactive___1Nu0m");


    for (let i in tabCont.children) {
      let currentTabActive = document.getElementsByClassName("tabContactive___2NdNu___20636");
      if (currentTabActive.length > 0) {
        tabCont.children[i].className = tabCont.children[i].className.replace(
          "tabContactive___2NdNu___20636",
          ""
        );
      }
      if (id === tabCont.children[i].dataset.id) tabCont.children[i].classList.add('tabContactive___2NdNu___20636');
    }

  }




  const currentKey = location.pathname.split("/")[1] || "/";
  const timeout = { enter: 500, exit: 500 };
  return (
    <>
      <div className="page" style={{ marginTop: '120px' }}>
        <div className={styles.tabwrapper}>
          <div className={styles.techcontent}>
            <div className={styles.techmenu}>
              <ul ref={techMenu}>
                <li onClick={tabFunc} data-id="1" className={styles.liactive}>
                  frontend
                </li>

                <li onClick={tabFunc} data-id="2">
                  backend
                </li>

                <li onClick={tabFunc} data-id="3">
                  product
                </li>

                <li onClick={tabFunc} data-id="4">
                  devops
                </li>
              </ul>
            </div>

            <div className={styles.tabcontainer} ref={tabcontainer}>
              <div data-id="1" className={`${styles.tabContent} ${styles.tabContactive___2NdNu}`}><Frontendcomp /></div>
              <div data-id="2" className={styles.tabContent}><Backendcomp /></div>
              <div data-id="3" className={styles.tabContent}><Productcomp /></div>
              <div data-id="4" className={styles.tabContent}><Devopscomp /></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Technology;
