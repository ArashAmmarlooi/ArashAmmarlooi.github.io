import React from "react";
import styles from "../routes/Technology/technology.scss"


const Backendcomp = () => {
  return (
    <>
      <div className={styles.divBar}>
        <p>Nodejs ( expressJs , fastifyjs )</p>
        <div className={styles.divSpan}>
          <span style={{ background: "#628cf0" }}></span>
          <span style={{ background: "#628cf0" }}></span>
          <span style={{ background: "#628cf0" }}></span>
          <span style={{ background: "#628cf0" }}></span>
          <span></span>
        </div>
      </div>

      <div className={styles.divBar}>
        <p>SQL databases (my sql , maria db, ... )</p>
        <div className={styles.divSpan}>
          <span style={{ background: "#628cf0" }}></span>
          <span style={{ background: "#628cf0" }}></span>
          <span style={{ background: "#628cf0" }}></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className={styles.divBar}>
        <p>NoSQL databases (mongoDB ,…)</p>
        <div className={styles.divSpan}>
          <span style={{ background: "#628cf0" }}></span>
          <span style={{ background: "#628cf0" }}></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className={styles.divBar}>
        <p>django</p>
        <div className={styles.divSpan}>
          <span style={{ background: "#628cf0" }}></span>
          <span ></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </>
  );
};

export default Backendcomp;
