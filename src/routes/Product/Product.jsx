import React from "react";
import Productsvg from "../../assets/Productsvg.svg";
import "../../styles/partials/_layout.scss";
import "../../styles/partials/_services.scss";

const Product = () => {
  return (
    <>

      <div className="maincontainer">
        <div className="leftcontainer">
          <div className="description">
            <p>
              Design product/digital launches that drove meaningful impact to
              the business
            </p>
            <p>Ability to quickly produce a great range of UX/UI concepts</p>
            <p>
              Design simple and delightful experiences to complex problems with
              prototyping , wireframing & mocking
            </p>
            <p>
              strong product design process, thinking and execution in
              Information Architecture , Visual Design & Branding
            </p>
          </div>
        </div>

        <div className="rightcontainer">
          <img src={Productsvg} className="productsvg" />
        </div>
        {/* <div className="footer">Developed and deisgned by Arash Ammarlooi</div> */}
      </div>
    </>
  );
};

export default Product;
