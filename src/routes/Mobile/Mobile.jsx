import React, { useEffect } from "react";
import Mobile1 from "../../assets/Mobile.svg";
// const autoslide = require("../utils/javascript");
import * as Utils from '../../utils/javascript';
import "../../styles/partials/_layout.scss";
import "../../styles/partials/_services.scss";

const Mobile = () => {

  useEffect(() => {
    // const images = document.querySelectorAll(".mobilesvg");
    // Utils.autoSlide(images);
  }, []);
  return (
    <>
      <div className="maincontainer">
        <div className="leftcontainer">
          <div className="description">
            <p>Proficient in Javascript, React native</p>
            <p>
              Keep understanding of mobile application UI/UX design system
            </p>
            <p>
              Building and scaffolding mid-to-large scale web applications
              with React native , Styled components
            </p>
            <p>
              Have a little background of Java(android) in order to use in react native apps
              with android modules bridges
            </p>
          </div>
        </div>

        <div className="rightcontainer">
          <img src={Mobile1} className="mobilesvg" />
        </div>
      </div>
      {/* <div className="footer">Developed and deisgned by Arash Ammarlooi</div> */}
    </>
  );
};

export default Mobile;
