import React from "react";
import styles from './About.scss'

const About = () => {
  return (
    <>
      <div className={styles.aboutwrraper}>
        <div className={styles.aboutcontainer}>
          <p>
            I am arash ammarlooi, a developer and designer with over 6 years of experience 
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
    </>
  );
};

export default About;