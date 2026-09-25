import React from "react";
import Webmobile from "../assets/Webmobile.svg";
import styles from './root.scss'

const Home = () => {
    return (
        <>
            <section className={styles.homeSection}>
                <div className={styles.leftCont}>
                    <div className={styles.parag}>
                        <h1>Hi, i'm arash ammarlooi</h1>
                        <p>I'm a developer & designer</p>
                        <div className={styles.rect}></div>
                    </div>
                </div>

                <div className={styles.rightCont}>
                    <img src={Webmobile} alt="Homesvg" />
                </div>
            </section>
        </>
    );
};

export default Home;