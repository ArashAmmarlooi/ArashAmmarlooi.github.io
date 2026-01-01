import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styles from './HomeSlider.scss';
import Webmobile from "../../assets/Webmobile.svg";
import Webui from "../../assets/Webui.svg";
import Mobile from "../../assets/Mobile.svg";
import Devopssvg from "../../assets/devopssvg.svg";
import Productsvg from "../../assets/Productsvg.svg";
import Email from "../../assets/Email.svg";
import Phone from "../../assets/Phone.svg";
import Linkedin from "../../assets/Linkedin.svg";
import Contactsvg from "../../assets/contactsvg.svg";
import "../../styles/partials/_layout.scss";
import "../../styles/partials/_services.scss";

const HomeSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState('next');
  const totalSlides = 3;

  const nextSlide = () => {
    setDirection('next');
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setDirection('prev');
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 'next' : 'prev');
    setCurrentSlide(index);
  };

  const renderSlide = () => {
    switch(currentSlide) {
      case 0:
        return (
          <div className={styles.homeSlide}>
            <div className={styles.leftCont}>
              <div className={styles.parag}>
                <h1>Hi, i'm arash ammarlooi</h1>
                <p>I'm a Fullstack Engineer and Software Developer</p>
                <div className={styles.rect}></div>
              </div>
            </div>
            <div className={styles.rightCont}>
              <img src={Webmobile} alt="Home" />
            </div>
          </div>
        );
      case 1:
        return (
          <div className={styles.servicesSlide}>
            <h2 className={styles.servicesTitle}>Services</h2>
            <div className={styles.servicesGrid}>
              <div className={styles.serviceCard}>
                <div className={styles.serviceImage}>
                  <img src={Webui} alt="Web Development" className="websvg" />
                </div>
                <div className={styles.serviceContent}>
                  <h3>Web Application Development</h3>
                  <p>Custom web applications tailored to your needs</p>
                </div>
              </div>
              <div className={styles.serviceCard}>
                <div className={styles.serviceImage}>
                  <img src={Mobile} alt="Mobile Development" className="mobilesvg" />
                </div>
                <div className={styles.serviceContent}>
                  <h3>Mobile Application Development</h3>
                  <p>Native and cross-platform mobile applications</p>
                </div>
              </div>
              <div className={styles.serviceCard}>
                <div className={styles.serviceImage}>
                  <img src={Productsvg} alt="Product Design" className="productsvg" />
                </div>
                <div className={styles.serviceContent}>
                  <h3>Database administration and Data Engineering</h3>
                  <p>User-centered database design solutions</p>
                </div>
              </div>
              <div className={styles.serviceCard}>
                <div className={styles.serviceImage}>
                  <img src={Devopssvg} alt="DevOps" className="devopssvg" />
                </div>
                <div className={styles.serviceContent}>
                  <h3>DevOps Engineering</h3>
                  <p>Infrastructure and deployment solutions</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className={styles.aboutContactSlide}>
            <div className={styles.aboutSection}>
              <h2>About</h2>
              <div className={styles.aboutContent}>
                <p>
                  I am arash ammarlooi, a developer and designer with over 10 years of experience 
                  in creating and managing software applications. Throughout my career, I have 
                  developed a strong foundation in problem-solving and delivering effective solutions 
                  that meet both user needs and business objectives.
                </p>
                <p>
                  Creativity is at the heart of my work. I approach each project with fresh 
                  perspectives and innovative thinking, always looking for ways to improve user 
                  experiences and streamline processes. My ability to think outside the box has 
                  helped me tackle complex challenges and deliver elegant solutions.
                </p>
                <p>
                  I thrive in collaborative environments and believe that great products are built 
                  through effective teamwork. I have experience working with diverse teams, 
                  communicating ideas clearly, and contributing to a positive team culture. 
                  As a team leader, I focus on empowering team members, facilitating clear 
                  communication, and ensuring everyone can contribute their best work.
                </p>
                <p>
                  I am a natural solution finder who enjoys breaking down complex problems into 
                  manageable parts. My analytical mindset, combined with practical experience, 
                  allows me to identify root causes and develop sustainable solutions. I am 
                  committed, responsible, and passionate about creating software that makes a 
                  meaningful impact.
                </p>
              </div>
            </div>

            <div className={styles.contactSection}>
              <div className={styles.contactBox}>
              <div className={styles.contactItem}>
              <h2>Contact</h2>
                </div>
                <div className={styles.contactItem}>
                  <img src={Phone} alt="Phone" />
                  <div className={styles.contactInfo}>
                    <p>+14383676701</p>
                    <p>skype : arashammarlooi_1</p>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <img src={Email} alt="Email" />
                  <a href="mailto:arashammarlooi@hotmail.com">
                    arashammarlooi@hotmail.com
                  </a>
                </div>
                <div className={styles.contactItem}>
                  <img src={Linkedin} alt="LinkedIn" />
                  <a href="https://www.linkedin.com/in/arash-ammarlooi-12372b147/">
                    LinkedIn Profile
                  </a>
                </div>
              </div>

              <div className={styles.contactImage}>
                <img src={Contactsvg} alt="Contact" />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Determine if we're on a white background slide (slides 1 and 2)
  const isWhiteBackground = currentSlide !== 0;

  return (
    <div className={`${styles.sliderContainer} ${isWhiteBackground ? styles.whiteBackground : ''}`}>
      <TransitionGroup component={null}>
        <CSSTransition
          key={currentSlide}
          timeout={600}
          classNames={{
            enter: direction === 'next' ? styles.slideEnterNext : styles.slideEnterPrev,
            enterActive: styles.slideEnterActive,
            exit: direction === 'next' ? styles.slideExitNext : styles.slideExitPrev,
            exitActive: direction === 'next' ? styles.slideExitActiveNext : styles.slideExitActivePrev,
          }}
        >
          <div className={styles.slide}>
            {renderSlide()}
          </div>
        </CSSTransition>
      </TransitionGroup>

      {/* Navigation Buttons */}
      <button 
        className={`${styles.navButton} ${styles.prevButton}`} 
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button 
        className={`${styles.navButton} ${styles.nextButton}`} 
        onClick={nextSlide}
        aria-label="Next slide"
      >
        ›
      </button>

      {/* Dots Indicator */}
      <div className={styles.dotsContainer}>
        {[...Array(totalSlides)].map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${currentSlide === index ? styles.activeDot : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeSlider;