import React, { useEffect, useRef, useState } from "react";
import styles from "./Portfolio.scss";
import { scrollToSection } from "../../utils/scrollTo";

const GITHUB_URL = "https://github.com/ArashAmmarlooi";
const LINKEDIN_URL = "https://www.linkedin.com/in/arash-ammarlooi-12372b147/";
const EMAIL_ADDRESS = "arashammarlooi@hotmail.com";
const PHONE_NUMBER = "+1 438 367 6701";

const TECH_CATEGORIES = [
  { id: "all", label: "All Technologies" },
  { id: "fullstack-js", label: "JavaScript & TypeScript" },
  { id: "java", label: "Java Frameworks" },
  { id: "python", label: "Python Ecosystem" },
  { id: "database", label: "SQL & Databases" },
  { id: "devops", label: "DevOps & Linux" },
];

const TECH_CARDS = [
  {
    category: "fullstack-js",
    title: "React, Next.js & Modern Frontend",
    badge: "Frontend & Fullstack",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    description: "Production web applications with dynamic rendering, server components, and responsive design.",
    skills: ["React 18", "Next.js (App & Pages)", "Angular", "TypeScript", "HTML5 & Modern SCSS", "State Management (Redux, Context)"],
  },
  {
    category: "fullstack-js",
    title: "Node.js & Backend JavaScript",
    badge: "JavaScript Runtime",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    description: "High-throughput RESTful services, GraphQL APIs, and asynchronous microservices.",
    skills: ["Node.js", "Express.js", "Fastify", "REST APIs", "GraphQL", "Webpack & Tooling", "Jest & Unit Testing"],
  },
  {
    category: "java",
    title: "Java & Spring Frameworks",
    badge: "Enterprise Backend",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
    description: "Robust enterprise services, secure API layers, and scalable object-relational mapping.",
    skills: ["Spring Boot", "Spring MVC", "Spring Security", "Hibernate ORM", "JPA", "Maven & Gradle", "Microservices", "JUnit"],
  },
  {
    category: "python",
    title: "Python Frameworks & APIs",
    badge: "Python Ecosystem",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    description: "Modern asynchronous API gateways, rapid application development, and data automation scripts.",
    skills: ["Django", "FastAPI", "Flask", "Python Automation", "RESTful Endpoints", "Data Processing", "Celery / Async Workers"],
  },
  {
    category: "database",
    title: "SQL Databases & Data Administration",
    badge: "Data & Storage",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
    description: "Schema architecture, query performance tuning, migrations, and transactional integrity.",
    skills: ["PostgreSQL", "MySQL", "MariaDB", "Relational Modeling", "Indexing & Optimization", "MongoDB (NoSQL)", "Data Engineering"],
  },
  {
    category: "devops",
    title: "DevOps & Linux Deployment",
    badge: "Infrastructure & CI/CD",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
    description: "Server provisioning, hardened remote environments, web server configuration, and deployment.",
    skills: ["Linux (Ubuntu, Debian, CentOS)", "Bash Shell Scripting", "Nginx & Apache", "CI/CD Pipelines", "Git / GitHub / GitLab", "SSH & Hardening", "Hosting & Release"],
  },
];

const SERVICES = [
  {
    number: "01",
    title: "Full-Stack Web Development",
    desc: "End-to-end web applications built with React, Next.js, Angular, Node.js, and Java Spring Boot. Fast, responsive, and maintainable.",
    points: ["Modern Single Page & Server-Rendered Apps", "Clean Component Architecture", "Strict TypeScript & Testing"],
  },
  {
    number: "02",
    title: "API Architecture & Backend Systems",
    desc: "Scalable backends engineered with Spring Boot, Django, FastAPI, and Express. Designed for high throughput and security.",
    points: ["RESTful & GraphQL Services", "Authentication & Role-Based Access", "Microservices & Database Integration"],
  },
  {
    number: "03",
    title: "Database Engineering & SQL Administration",
    desc: "Reliable data layers built with PostgreSQL, MySQL, MariaDB, and MongoDB. Schema optimization and administration.",
    points: ["Relational Schema Design", "Query Optimization & Indexing", "Data Integrity & Migration Strategies"],
  },
  {
    number: "04",
    title: "DevOps & Linux Server Deployment",
    desc: "Production deployment on Linux infrastructure. Automated builds, Nginx reverse proxies, SSL configuration, and server administration.",
    points: ["Linux Bash Automation", "Nginx & Apache Configuration", "CI/CD & GitHub Version Control"],
  },
];

const Portfolio = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeCategory, setActiveCategory] = useState("all");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollY(currentScroll);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress((currentScroll / docHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredCards =
    activeCategory === "all"
      ? TECH_CARDS
      : TECH_CARDS.filter((c) => c.category === activeCategory);

  // Parallax subtle shifts for hero floating badges (safe range, subtle effect)
  const badgeShift1 = scrollY * 0.12;
  const badgeShift2 = scrollY * -0.09;
  const badgeShift3 = scrollY * 0.07;
  const badgeShift4 = scrollY * -0.11;

  return (
    <div className={styles.container}>
      {/* Scroll Reading Progress Bar */}
      <div
        className={styles.progressBar}
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Hero Section */}
      <section id="hero" className={styles.heroSection}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <div className={styles.availabilityPill}>
              <span className={styles.statusDot} />
              <span>Full-Stack Engineer &amp; Software Developer</span>
            </div>

            <h1 className={styles.heroHeading}>
              Engineering robust, scalable software with clean code &amp; modern architecture.
            </h1>

            <p className={styles.heroSummary}>
              I'm <strong>Arash Ammarlooi</strong>, a developer with 10+ years of experience building
              modern web applications and backend systems. Specializing in{" "}
              <strong>React, Next.js, Angular, Java (Spring Boot), Python (Django &amp; FastAPI)</strong>,
              SQL databases, and Linux DevOps deployment.
            </p>

            <div className={styles.heroButtons}>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.primaryBtn}
              >
                <svg className={styles.btnIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.905-.42-.405-1.035-.705-.015-.72.96-.015 1.62.885 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                View My GitHub
              </a>

              <a
                href="#contact"
                className={styles.secondaryBtn}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
              >
                Get in Touch
              </a>

              <a
                href="#skills"
                className={styles.ghostBtn}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("skills");
                }}
              >
                Explore Skills &darr;
              </a>
            </div>

            {/* Quick stats row */}
            <div className={styles.statsRow}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>10+</span>
                <span className={styles.statLabel}>Years Experience</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.statItem}>
                <span className={styles.statNumber}>Full-Stack</span>
                <span className={styles.statLabel}>Frontend &amp; Backend</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.statItem}>
                <span className={styles.statNumber}>DevOps</span>
                <span className={styles.statLabel}>Linux &amp; Deployment</span>
              </div>
            </div>
          </div>

          {/* Parallax Floating Cards Area */}
          <div className={styles.heroVisual} aria-hidden="true">
            <div
              className={`${styles.floatingCard} ${styles.badgeReact}`}
              style={{ transform: `translate3d(0, ${badgeShift1}px, 0)` }}
            >
              <span className={styles.badgeDot} style={{ background: "#0284c7" }} />
              <div>
                <strong>React &amp; Next.js</strong>
                <small>Frontend &amp; TypeScript</small>
              </div>
            </div>

            <div
              className={`${styles.floatingCard} ${styles.badgeJava}`}
              style={{ transform: `translate3d(0, ${badgeShift2}px, 0)` }}
            >
              <span className={styles.badgeDot} style={{ background: "#ea580c" }} />
              <div>
                <strong>Java Spring Boot</strong>
                <small>Enterprise Microservices</small>
              </div>
            </div>

            <div
              className={`${styles.floatingCard} ${styles.badgePython}`}
              style={{ transform: `translate3d(0, ${badgeShift3}px, 0)` }}
            >
              <span className={styles.badgeDot} style={{ background: "#059669" }} />
              <div>
                <strong>Python &amp; FastAPI</strong>
                <small>Django &amp; REST APIs</small>
              </div>
            </div>

            <div
              className={`${styles.floatingCard} ${styles.badgeDevops}`}
              style={{ transform: `translate3d(0, ${badgeShift4}px, 0)` }}
            >
              <span className={styles.badgeDot} style={{ background: "#4f46e5" }} />
              <div>
                <strong>Linux &amp; DevOps</strong>
                <small>SQL &amp; Server Hosting</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Technology Section */}
      <section id="skills" className={styles.skillsSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionPretitle}>Core Competencies</span>
          <h2 className={styles.sectionTitle}>Technology Stack &amp; Frameworks</h2>
          <p className={styles.sectionDesc}>
            A comprehensive overview of my technical capabilities spanning frontend frameworks,
            enterprise Java, modern Python, relational databases, and Linux server deployment.
          </p>
        </div>

        {/* Category Tabs */}
        <div className={styles.filterTabs} role="tablist">
          {TECH_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat.id}
              className={`${styles.tabBtn} ${activeCategory === cat.id ? styles.tabActive : ""}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <div className={styles.techGrid}>
          {filteredCards.map((card) => (
            <article key={card.title} className={styles.techCard}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIconBox}>{card.icon}</div>
                <div className={styles.cardTitleBox}>
                  <span className={styles.cardBadge}>{card.badge}</span>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                </div>
              </div>

              <p className={styles.cardDesc}>{card.description}</p>

              <div className={styles.skillsWrap}>
                {card.skills.map((skill) => (
                  <span key={skill} className={styles.skillPill}>
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className={styles.servicesSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionPretitle}>What I Provide</span>
          <h2 className={styles.sectionTitle}>Services &amp; Architecture Delivery</h2>
          <p className={styles.sectionDesc}>
            Reliable engineering solutions tailored for end-to-end product delivery, robust backends,
            and production deployments.
          </p>
        </div>

        <div className={styles.servicesGrid}>
          {SERVICES.map((s) => (
            <div key={s.number} className={styles.serviceBox}>
              <span className={styles.serviceNum}>{s.number}</span>
              <h3 className={styles.serviceTitle}>{s.title}</h3>
              <p className={styles.serviceText}>{s.desc}</p>
              <ul className={styles.servicePoints}>
                {s.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={styles.aboutSection}>
        <div className={styles.aboutContainer}>
          <div className={styles.aboutSidebar}>
            <span className={styles.sectionPretitle}>Background</span>
            <h2 className={styles.aboutHeading}>Building high-impact software for 10+ years.</h2>

            <div className={styles.highlightCard}>
              <h4>Leadership &amp; Collaboration</h4>
              <p>
                Experienced in leading agile cross-functional teams, establishing clear code standards,
                and mentoring developers to achieve on-time, high-quality deliverables.
              </p>
            </div>

            <div className={styles.highlightCard}>
              <h4>System-First Mindset</h4>
              <p>
                Every project is approached with thorough problem breakdown, scalable data architecture,
                and production-ready deployment configurations.
              </p>
            </div>
          </div>

          <div className={styles.aboutContent}>
            <p>
              I am <strong>Arash Ammarlooi</strong>, a developer and designer with over 10 years of
              experience creating and managing software applications. Throughout my career, I have
              developed a strong foundation in problem-solving and delivering effective solutions that
              meet both user needs and business objectives.
            </p>
            <p>
              Creativity is at the heart of my work. I approach each project with fresh perspectives and
              innovative thinking, always looking for ways to improve user experiences and streamline
              processes. My ability to think outside the box has helped me tackle complex challenges and
              deliver elegant solutions.
            </p>
            <p>
              I thrive in collaborative environments and believe that great products are built through
              effective teamwork. I have experience working with diverse teams, communicating ideas
              clearly, and contributing to a positive team culture. As a team leader, I focus on
              empowering team members, facilitating clear communication, and ensuring everyone can
              contribute their best work.
            </p>
            <p>
              I am a natural solution finder who enjoys breaking down complex problems into manageable
              parts. My analytical mindset, combined with practical experience, allows me to identify root
              causes and develop sustainable solutions. I am committed, responsible, and passionate about
              creating software that makes a meaningful impact.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={styles.contactSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionPretitle}>Get in Touch</span>
          <h2 className={styles.sectionTitle}>Let's Connect &amp; Collaborate</h2>
          <p className={styles.sectionDesc}>
            I am currently open to full-time roles, contract work, and engineering collaborations.
            Feel free to reach out via GitHub, email, phone, or LinkedIn.
          </p>
        </div>

        <div className={styles.contactGrid}>
          {/* GitHub Card - Prominently highlighted */}
          <div className={`${styles.contactCard} ${styles.contactCardFeatured}`}>
            <div className={styles.contactIconCircle}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.905-.42-.405-1.035-.705-.015-.72.96-.015 1.62.885 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </div>
            <div className={styles.contactDetails}>
              <span className={styles.contactType}>GitHub Profile</span>
              <h3 className={styles.contactValue}>github.com/ArashAmmarlooi</h3>
              <p className={styles.contactSub}>Browse my source code, repositories, and technical contributions.</p>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLinkBtn}
              >
                Visit GitHub &rarr;
              </a>
            </div>
          </div>

          {/* Email Card */}
          <div className={styles.contactCard}>
            <div className={styles.contactIconCircle}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div className={styles.contactDetails}>
              <span className={styles.contactType}>Direct Email</span>
              <h3 className={styles.contactValue}>{EMAIL_ADDRESS}</h3>
              <p className={styles.contactSub}>Send me an email for project discussions or interview inquiries.</p>
              <a href={`mailto:${EMAIL_ADDRESS}`} className={styles.contactLinkBtn}>
                Send Email &rarr;
              </a>
            </div>
          </div>

          {/* Phone & Skype Card */}
          <div className={styles.contactCard}>
            <div className={styles.contactIconCircle}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div className={styles.contactDetails}>
              <span className={styles.contactType}>Phone &amp; Skype</span>
              <h3 className={styles.contactValue}>{PHONE_NUMBER}</h3>
              <p className={styles.contactSub}>Skype ID: arashammarlooi_1</p>
              <a href={`tel:${PHONE_NUMBER.replace(/\s+/g, "")}`} className={styles.contactLinkBtn}>
                Call Directly &rarr;
              </a>
            </div>
          </div>

          {/* LinkedIn Card */}
          <div className={styles.contactCard}>
            <div className={styles.contactIconCircle}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </div>
            <div className={styles.contactDetails}>
              <span className={styles.contactType}>LinkedIn Network</span>
              <h3 className={styles.contactValue}>arash-ammarlooi</h3>
              <p className={styles.contactSub}>Connect on LinkedIn for professional history and recommendations.</p>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLinkBtn}
              >
                Connect on LinkedIn &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <strong>Arash Ammarlooi</strong>
            <span>Full-Stack Software Engineer</span>
          </div>
          <div className={styles.footerLinks}>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={`mailto:${EMAIL_ADDRESS}`}>Email</a>
          </div>
          <p className={styles.footerCopy}>
            &copy; {new Date().getFullYear()} Arash Ammarlooi. Built with React &amp; Clean Modern Design.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
