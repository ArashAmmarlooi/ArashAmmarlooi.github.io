import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Web1 from "../../assets/Webui.svg";
import "../../styles/partials/_layout.scss";
import "../../styles/partials/_services.scss";
// import {autoslide} from "../utils/javascript";
import * as Utils from '../../utils/javascript';

const autoslide = require("../../utils/javascript");

import {
  CSSTransition,
  Transition,
  TransitionGroup,
} from "react-transition-group";

const Web = () => {
  useEffect(() => {
    // const images = document.querySelectorAll(".websvg");
    // Utils.autoSlide(images);
  }, []);
  return (
    <>
      <div style={{ height: "100vh" }}>
        <div className="maincontainer">
          <div className="leftcontainer">
            <div className="description">
              <p>
                Proficient in HTML5, CSS 3, JavaScript and their associated
                build components
              </p>
              <p>
                Well versed with modern Javascript libraries – Reactjs ,
                expressjs, p5.js, Chart.js , D3.js
              </p>
              <p>Keep understanding of responsive design principles</p>
              <p>
                Building and scaffolding mid-to-large scale web applications
                with Reactjs & Typescript
              </p>
              <p>Prototyping, developing and testing web applications</p>
            </div>
          </div>

          <div className="rightcontainer">
            <img src={Web1} className="websvg" alt="" />
          </div>
        </div>
        {/* <div className="footer">Deve  loped and deisgned by Arash Ammarlooi</div> */}
      </div>
    </>
  );
};

export default Web;
