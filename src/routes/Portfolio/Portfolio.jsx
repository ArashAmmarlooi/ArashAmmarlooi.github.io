import React, { useEffect, useRef, useState } from "react";
import styles from "./Portfolio.scss";
import Email from "../../assets/Email.svg";
import Phone from "../../assets/Phone.svg";
import Linkedin from "../../assets/Linkedin.svg";

const SKILL_GROUPS = [
  {
    title: "JavaScript & Frontend",
    accent: "#818cf8",
    items: [
      "React, Next.js, Angular",
      "TypeScript & modern ES6+",
      "HTML, CSS/SCSS, responsive UI",
      "React Native · REST · GraphQL",
      "Webpack · Jest · Mocha",
    ],
  },
  {
    title: "Java Ecosystem",
    accent: "#f97316",
    items: [
      "Spring Boot & Spring MVC",
      "Hibernate · JPA · Maven",
      "Microservices & REST APIs",
      "JUnit · enterprise patterns",
    ],
  },
  {
    title: "Python Stack",
    accent: "#34d399",
    items: [
      "Django & Flask",
      "FastAPI · data pipelines",
      "Scripting & automation",
      "API design & integration",
    ],
  },
  {
    title: "Databases & SQL",
    accent: "#38bdf8",
    items: [
      "MySQL · MariaDB · PostgreSQL",
      "Schema design & optimization",
      "MongoDB & NoSQL stores",
      "Data engineering & admin",
    ],
  },
  {
    title: "DevOps & Linux",
    accent: "#a78bfa",
    items: [
      "Linux servers · Bash scripting",
      "Nginx · Apache · deployment",
      "GitHub · GitLab · CI/CD",
      "SSH · hosting · cloud rollout",
    ],
  },
  {
    title: "Full-Stack Delivery",
    accent: "#f472b6",
    items: [
      "Node.js · Express · Fastify",
      "End-to-end product builds",
      "Agile · Scrum · Jira · Kanban",
      "Performance tuning & debugging",
    ],
  },
];

const SERVICES = [
  {
    title: "Web Application Development",
    desc: "Custom full-stack web apps with polished UX and scalable architecture.",
  },
  {
    title: "Mobile Application Development",
    desc: "Cross-platform and native experiences built for real users.",
  },
  {
    title: "Database & Data Engineering",
    desc: "SQL design, administration, and reliable data pipelines.",
  },
  {
    title: "DevOps Engineering",
    desc: "Linux deployment, automation, and production-ready infrastructure.",
  },
];

const ABOUT_PARAS = [
  "I am Arash Ammarlooi, a full-stack engineer and software developer with over 10 years of experience creating and managing software applications. I combine strong problem-solving with delivery that meets user needs and business goals.",
  "Creativity drives my work. I bring fresh perspectives to each project—improving experiences, streamlining processes, and turning complex challenges into elegant solutions.",
  "I thrive in collaborative teams and have led groups with clear communication and a focus on empowering everyone to do their best work.",
  "I'm a natural solution finder: analytical, committed, and passionate about software that makes a meaningful impact.",
];

const GITHUB_URL = "https://github.com/ArashAmmarlooi";

function useRevealOnScroll() {
  useEffect(() => {
    const nodes = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealed);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);
}

const Portfolio = () => {
  const pageRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useRevealOnScroll();

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      if (pageRef.current) {
        pageRef.current.style.setProperty("--scroll-y", String(window.scrollY));
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const heroShift = scrollY * 0.35;
  const heroShiftSlow = scrollY * 0.15;
  const heroOpacity = Math.max(0, 1 - scrollY / 700);

  return (
    <div className={styles.page} ref={pageRef}>
      <section id="hero" className={styles.hero}>
        <div
          className={styles.heroOrb1}
          style={{ transform: `translate3d(0, ${heroShift}px, 0)` }}
        />
        <div
          className={styles.heroOrb2}
          style={{ transform: `translate3d(0, ${heroShiftSlow}px, 0)` }}
        />
        <div
          className={styles.heroGrid}
          style={{ transform: `translate3d(0, ${heroShiftSlow * 0.5}px, 0)` }}
        />

        <div
          className={styles.heroInner}
          style={{ opacity: heroOpacity, transform: `translateY(${scrollY * 0.08}px)` }}
        >
          <p className={styles.heroEyebrow}>Full-Stack Engineer</p>
          <h1>
            Hi, I&apos;m <span>Arash Ammarlooi</span>
          </h1>
          <p className={styles.heroLead}>
            I build stunning web & mobile products with React, Next.js, Angular, Java,
            Python, SQL, and Linux-powered DevOps.
          </p>
          <div className={styles.heroActions}>
            <a href="#contact" className={styles.btnPrimary}>
              Get in touch
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={styles.btnGhost}>
              View GitHub
            </a>
          </div>
        </div>

        <div className={styles.scrollHint} aria-hidden="true">
          <span>Scroll</span>
          <div className={styles.scrollLine} />
        </div>
      </section>

      <section id="skills" className={styles.section}>
        <div className={styles.sectionHead} data-reveal>
          <span className={styles.sectionLabel}>Expertise</span>
          <h2>Technology stack</h2>
          <p>
            Java & Python backends, modern JavaScript frontends, databases, and
            production deployment on Linux.
          </p>
        </div>
        <div className={styles.skillsGrid}>
          {SKILL_GROUPS.map((group, i) => (
            <article
              key={group.title}
              className={styles.skillCard}
              data-reveal
              style={{ transitionDelay: `${i * 80}ms`, "--accent": group.accent }}
            >
              <div className={styles.skillCardGlow} />
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="services" className={`${styles.section} ${styles.sectionAlt}`}>
        <div
          className={styles.parallaxBand}
          style={{ transform: `translate3d(0, ${(scrollY - 400) * 0.06}px, 0)` }}
        />
        <div className={styles.sectionHead} data-reveal>
          <span className={styles.sectionLabel}>Services</span>
          <h2>What I deliver</h2>
        </div>
        <div className={styles.servicesGrid}>
          {SERVICES.map((s, i) => (
            <div key={s.title} className={styles.serviceCard} data-reveal style={{ transitionDelay: `${i * 100}ms` }}>
              <span className={styles.serviceIndex}>{String(i + 1).padStart(2, "0")}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className={styles.section}>
        <div className={styles.aboutLayout} data-reveal>
          <div className={styles.aboutVisual}>
            <div className={styles.aboutFrame}>
              <div className={styles.aboutStat}>
                <strong>10+</strong>
                <span>Years building software</span>
              </div>
            </div>
          </div>
          <div className={styles.aboutCopy}>
            <span className={styles.sectionLabel}>About</span>
            <h2>Developer, designer, team leader</h2>
            {ABOUT_PARAS.map((text) => (
              <p key={text.slice(0, 40)}>{text}</p>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className={`${styles.section} ${styles.contactSection}`}>
        <div className={styles.sectionHead} data-reveal>
          <span className={styles.sectionLabel}>Contact</span>
          <h2>Let&apos;s build something remarkable</h2>
        </div>
        <div className={styles.contactGrid} data-reveal>
          <div className={styles.contactCard}>
            <img src={Phone} alt="" />
            <div>
              <h4>Phone & Skype</h4>
              <p>+1 438 367 6701</p>
              <p>Skype: arashammarlooi_1</p>
            </div>
          </div>
          <div className={styles.contactCard}>
            <img src={Email} alt="" />
            <div>
              <h4>Email</h4>
              <a href="mailto:arashammarlooi@hotmail.com">arashammarlooi@hotmail.com</a>
            </div>
          </div>
          <div className={styles.contactCard}>
            <img src={Linkedin} alt="" />
            <div>
              <h4>LinkedIn</h4>
              <a
                href="https://www.linkedin.com/in/arash-ammarlooi-12372b147/"
                target="_blank"
                rel="noopener noreferrer"
              >
                arash-ammarlooi
              </a>
            </div>
          </div>
          <div className={styles.contactCard}>
            <svg className={styles.githubIcon} viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.905-.42-.405-1.035-.705-.015-.72.96-.015 1.62.885 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
              />
            </svg>
            <div>
              <h4>GitHub</h4>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                github.com/ArashAmmarlooi
              </a>
            </div>
          </div>
        </div>
        <footer className={styles.footer}>
          <p>© {new Date().getFullYear()} Arash Ammarlooi · Crafted with React</p>
        </footer>
      </section>
    </div>
  );
};

export default Portfolio;
