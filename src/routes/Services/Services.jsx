import React from "react";
import styles from './Services.scss';

const Services = () => {
  return (
    <>
      <div className={styles.servicesWrapper}>
        <div className={styles.servicesContainer}>
          <h1>Services</h1>
          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <h2>Web Development</h2>
              <p>Custom web applications tailored to your needs</p>
            </div>
            <div className={styles.serviceCard}>
              <h2>Mobile Development</h2>
              <p>Native and cross-platform mobile applications</p>
            </div>
            <div className={styles.serviceCard}>
              <h2>Product Design</h2>
              <p>User-centered design solutions</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;