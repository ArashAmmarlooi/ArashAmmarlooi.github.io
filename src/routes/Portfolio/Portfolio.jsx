import React, { useCallback, useRef, useState } from "react";
import styles from "./Portfolio.scss";
import { scrollToSection } from "../../utils/scrollTo";
import useScrollAnimations from "../../utils/useScrollAnimations";

const GITHUB_URL = "https://github.com/ArashAmmarlooi";
const LINKEDIN_URL = "https://www.linkedin.com/in/arash-ammarlooi-12372b147/";
const LINKEDIN_LABEL = "linkedin.com/in/arash-ammarlooi-12372b147";
const EMAIL_ADDRESS = "arashammarlooi@hotmail.com";
const PHONE_NUMBER = "+1 438 367 6701";

const IconGithub = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.905-.42-.405-1.035-.705-.015-.72.96-.015 1.62.885 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const IconLinkedin = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const IconMail = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconPhone = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const TECH_CARDS = [
  {
    badge: "Frontend & Fullstack",
    title: "React, Next.js & Angular",
    desc: "Production interfaces with server rendering, routing, and design systems that scale.",
    skills: ["React 18", "Next.js", "Angular", "TypeScript", "SCSS", "Redux"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    badge: "JavaScript Runtime",
    title: "Node.js & API Layers",
    desc: "High-throughput REST and GraphQL services with resilient async architecture.",
    skills: ["Node.js", "Express", "Fastify", "GraphQL", "REST", "Jest"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    badge: "Enterprise Backend",
    title: "Java & Spring Frameworks",
    desc: "Secure enterprise services, ORM-backed persistence, and microservice boundaries.",
    skills: ["Spring Boot", "Spring MVC", "Spring Security", "Hibernate", "JPA", "Maven", "JUnit"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
  {
    badge: "Python Ecosystem",
    title: "Django, FastAPI & Flask",
    desc: "Rapid application development, async gateways, and automation pipelines.",
    skills: ["Django", "FastAPI", "Flask", "Celery", "Automation", "Data Processing"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    badge: "Data & Storage",
    title: "SQL Databases & Administration",
    desc: "Schema architecture, query tuning, migrations, and transactional integrity.",
    skills: ["PostgreSQL", "MySQL", "MariaDB", "Indexing", "MongoDB", "Data Engineering"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    badge: "Infrastructure & CI/CD",
    title: "DevOps & Linux Deployment",
    desc: "Server provisioning, hardened remote access, reverse proxies, and releases.",
    skills: ["Linux", "Bash", "Nginx", "Apache", "CI/CD", "Git & GitHub", "SSH"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
  },
];

const JS_SKILLS = [
  { name: "React & Component Architecture", level: 95 },
  { name: "TypeScript & Type-Safe Design", level: 90 },
  { name: "Next.js Server Rendering", level: 88 },
  { name: "Node.js & Express APIs", level: 90 },
  { name: "Angular & RxJS", level: 82 },
  { name: "ES2023+, Async & Event Loop", level: 93 },
  { name: "Testing: Jest, Mocha, TDD", level: 86 },
  { name: "Webpack, Babel & Build Tooling", level: 88 },
];

const JS_HIGHLIGHTS = [
  "Deep command of closures, prototypes, the event loop, and memory profiling.",
  "State orchestration with Redux Toolkit, Context, and server-side caching.",
  "Performance budgets: code splitting, lazy hydration, and bundle analysis.",
  "Animation engineering with GSAP timelines and ScrollTrigger choreography.",
];

const SERVICES = [
  {
    number: "01",
    title: "Full-Stack Web Development",
    desc: "End-to-end applications with React, Next.js, Angular, Node.js, and Spring Boot.",
    points: ["SPA & server-rendered apps", "Clean component architecture", "Strict TypeScript and testing"],
  },
  {
    number: "02",
    title: "API Architecture & Backends",
    desc: "Scalable services engineered with Spring Boot, Django, FastAPI, and Express.",
    points: ["REST & GraphQL services", "Auth and role-based access", "Microservices integration"],
  },
  {
    number: "03",
    title: "Database & SQL Engineering",
    desc: "Reliable data layers on PostgreSQL, MySQL, MariaDB, and MongoDB.",
    points: ["Relational schema design", "Query optimization", "Migration strategies"],
  },
  {
    number: "04",
    title: "DevOps & Linux Deployment",
    desc: "Production rollout on Linux with automated builds and hardened servers.",
    points: ["Bash automation", "Nginx & Apache config", "CI/CD with GitHub"],
  },
];

const Portfolio = () => {
  const scopeRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);

  // Written straight to the DOM node so scroll updates never trigger a re-render.
  const handleProgress = useCallback((value) => {
    if (progressRef.current) {
      progressRef.current.style.width = `${value}%`;
    }
  }, []);

  useScrollAnimations({ scopeRef, trackRef, onProgress: handleProgress });

  const go = (e, id) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <div className={styles.viewport} ref={scopeRef}>
      <div className={styles.progressBar} ref={progressRef} aria-hidden="true" />

      <div className={styles.track} ref={trackRef}>
        {/* ---------------------------------------------------------- HERO */}
        <section id="hero" className={`${styles.panel} ${styles.heroPanel}`} data-panel>
          <div className={styles.heroDecor} data-parallax="0.18" aria-hidden="true" />
          <div className={styles.heroInner}>
            <div className={styles.heroCopy}>
              <div className={styles.pill} data-animate="hero">
                <span className={styles.statusDot} />
                Full-Stack Engineer &amp; Software Developer
              </div>

              <h1 className={styles.heroHeading} data-animate="hero">
                Engineering robust, scalable software with clean code and modern architecture.
              </h1>

              <p className={styles.heroSummary} data-animate="hero">
                I&apos;m <strong>Arash Ammarlooi</strong>, a developer with 10+ years building web
                applications and backend systems in <strong>React, Next.js, Angular,
                Java Spring Boot, Python</strong>, SQL databases, and Linux DevOps.
              </p>

              <div className={styles.heroButtons} data-animate="hero">
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={styles.primaryBtn}>
                  <IconGithub className={styles.btnIcon} />
                  View GitHub
                </a>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={styles.secondaryBtn}>
                  <IconLinkedin className={styles.btnIcon} />
                  LinkedIn Profile
                </a>
                <a href="#contact" className={styles.ghostBtn} onClick={(e) => go(e, "contact")}>
                  Get in touch
                </a>
              </div>

              <div className={styles.statsRow} data-animate="hero">
                <div className={styles.statItem}>
                  <span className={styles.statNumber} data-count="10" data-count-suffix="+">
                    10+
                  </span>
                  <span className={styles.statLabel}>Years experience</span>
                </div>
                <span className={styles.statDivider} />
                <div className={styles.statItem}>
                  <span className={styles.statNumber} data-count="6" data-count-suffix="">
                    6
                  </span>
                  <span className={styles.statLabel}>Core stacks mastered</span>
                </div>
                <span className={styles.statDivider} />
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>Linux</span>
                  <span className={styles.statLabel}>Deployment &amp; DevOps</span>
                </div>
              </div>
            </div>

            <div className={styles.heroBadges} aria-hidden="true">
              {[
                { color: "#0284c7", title: "React & Next.js", sub: "Frontend & TypeScript", speed: "0.10" },
                { color: "#ea580c", title: "Java Spring Boot", sub: "Enterprise microservices", speed: "0.16" },
                { color: "#059669", title: "Python & FastAPI", sub: "Django & REST APIs", speed: "0.07" },
                { color: "#4f46e5", title: "Linux & DevOps", sub: "SQL & server hosting", speed: "0.13" },
              ].map((b) => (
                <div key={b.title} className={styles.badgeCard} data-parallax={b.speed}>
                  <span className={styles.badgeDot} style={{ background: b.color }} />
                  <div>
                    <strong>{b.title}</strong>
                    <small>{b.sub}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.scrollCue}>
            <span>Scroll to move right</span>
            <span className={styles.cueArrow} aria-hidden="true">
              &rarr;
            </span>
          </div>
        </section>

        {/* -------------------------------------------------------- SKILLS */}
        <section id="skills" className={`${styles.panel} ${styles.skillsPanel}`} data-panel>
          <div className={styles.panelHead}>
            <span className={styles.pretitle}>Core competencies</span>
            <h2 className={styles.panelTitle} data-animate="split">
              Technology stack and frameworks
            </h2>
            <p className={styles.panelDesc} data-animate="fade-up">
              Frontend frameworks, enterprise Java, modern Python, relational databases, and
              Linux server deployment.
            </p>
          </div>

          <div className={styles.cardRow}>
            {TECH_CARDS.map((card) => (
              <article
                key={card.title}
                className={`${styles.techCard} ${activeCard === card.title ? styles.techCardActive : ""}`}
                data-animate="card"
                onMouseEnter={() => setActiveCard(card.title)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className={styles.cardIcon}>{card.icon}</div>
                <span className={styles.cardBadge}>{card.badge}</span>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDesc}>{card.desc}</p>
                <div className={styles.pillWrap}>
                  {card.skills.map((s) => (
                    <span key={s} className={styles.skillPill}>
                      {s}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------- JAVASCRIPT */}
        <section id="javascript" className={`${styles.panel} ${styles.jsPanel}`} data-panel>
          <div className={styles.jsLayout}>
            <div className={styles.jsIntro}>
              <span className={styles.pretitle}>Specialisation</span>
              <h2 className={styles.panelTitle} data-animate="split">
                JavaScript and TypeScript in depth
              </h2>
              <p className={styles.panelDesc} data-animate="fade-up">
                JavaScript is where I spend most of my engineering time, from browser rendering
                internals through to Node.js services running in production.
              </p>
              <ul className={styles.jsHighlights}>
                {JS_HIGHLIGHTS.map((h) => (
                  <li key={h} data-animate="fade-up">
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.jsMeters}>
              {JS_SKILLS.map((skill) => (
                <div key={skill.name} className={styles.meterRow} data-animate="fade-up">
                  <div className={styles.meterLabel}>
                    <span>{skill.name}</span>
                    <span className={styles.meterValue}>{skill.level}%</span>
                  </div>
                  <div className={styles.meterTrack}>
                    <span className={styles.meterFill} data-meter={skill.level} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ SERVICES */}
        <section id="services" className={`${styles.panel} ${styles.servicesPanel}`} data-panel>
          <div className={styles.panelHead}>
            <span className={styles.pretitle}>What I provide</span>
            <h2 className={styles.panelTitle} data-animate="split">
              Services and architecture delivery
            </h2>
          </div>

          <div className={styles.cardRow}>
            {SERVICES.map((s) => (
              <div key={s.number} className={styles.serviceCard} data-animate="card">
                <span className={styles.serviceNum}>{s.number}</span>
                <h3 className={styles.cardTitle}>{s.title}</h3>
                <p className={styles.cardDesc}>{s.desc}</p>
                <ul className={styles.servicePoints}>
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* --------------------------------------------------------- ABOUT */}
        <section id="about" className={`${styles.panel} ${styles.aboutPanel}`} data-panel>
          <div className={styles.aboutLayout}>
            <div className={styles.aboutSide}>
              <span className={styles.pretitle}>Background</span>
              <h2 className={styles.panelTitle} data-animate="split">
                Building high impact software for a decade
              </h2>
              <div className={styles.highlightCard} data-animate="fade-up">
                <h4>Leadership &amp; collaboration</h4>
                <p>
                  Leading agile cross-functional teams, setting code standards, and mentoring
                  developers toward on-time, high-quality delivery.
                </p>
              </div>
              <div className={styles.highlightCard} data-animate="fade-up">
                <h4>System-first mindset</h4>
                <p>
                  Thorough problem breakdown, scalable data architecture, and production-ready
                  deployment configuration on every project.
                </p>
              </div>
            </div>

            <div className={styles.aboutCopy}>
              <p data-animate="fade-up">
                I am <strong>Arash Ammarlooi</strong>, a developer and designer with over 10 years
                of experience creating and managing software applications. I have a strong
                foundation in problem-solving and in delivering solutions that meet both user
                needs and business objectives.
              </p>
              <p data-animate="fade-up">
                Creativity is at the heart of my work. I approach each project with fresh
                perspectives, always looking for ways to improve user experiences and streamline
                processes. Thinking outside the box has helped me tackle complex challenges and
                deliver elegant solutions.
              </p>
              <p data-animate="fade-up">
                I thrive in collaborative environments and believe great products are built
                through effective teamwork. As a team leader I focus on empowering people,
                facilitating clear communication, and making sure everyone can contribute their
                best work.
              </p>
              <p data-animate="fade-up">
                I am a natural solution finder who enjoys breaking complex problems into
                manageable parts. My analytical mindset, combined with practical experience, lets
                me identify root causes and develop sustainable solutions.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- CONTACT */}
        <section id="contact" className={`${styles.panel} ${styles.contactPanel}`} data-panel>
          <div className={styles.panelHead}>
            <span className={styles.pretitle}>Get in touch</span>
            <h2 className={styles.panelTitle} data-animate="split">
              Let us connect and collaborate
            </h2>
            <p className={styles.panelDesc} data-animate="fade-up">
              Open to full-time roles, contract work, and engineering collaborations.
            </p>
          </div>

          <div className={styles.contactRow}>
            <div className={`${styles.contactCard} ${styles.contactFeatured}`} data-animate="card">
              <div className={styles.contactIcon}>
                <IconGithub />
              </div>
              <span className={styles.contactType}>GitHub</span>
              <h3 className={styles.contactValue}>github.com/ArashAmmarlooi</h3>
              <p className={styles.contactSub}>Source code, repositories, and contributions.</p>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                Visit GitHub &rarr;
              </a>
            </div>

            <div className={`${styles.contactCard} ${styles.contactFeatured}`} data-animate="card">
              <div className={styles.contactIcon}>
                <IconLinkedin />
              </div>
              <span className={styles.contactType}>LinkedIn</span>
              <h3 className={styles.contactValue}>{LINKEDIN_LABEL}</h3>
              <p className={styles.contactSub}>Professional history, roles, and recommendations.</p>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                Connect on LinkedIn &rarr;
              </a>
            </div>

            <div className={styles.contactCard} data-animate="card">
              <div className={styles.contactIcon}>
                <IconMail />
              </div>
              <span className={styles.contactType}>Email</span>
              <h3 className={styles.contactValue}>{EMAIL_ADDRESS}</h3>
              <p className={styles.contactSub}>Project discussions and interview inquiries.</p>
              <a href={`mailto:${EMAIL_ADDRESS}`} className={styles.contactLink}>
                Send email &rarr;
              </a>
            </div>

            <div className={styles.contactCard} data-animate="card">
              <div className={styles.contactIcon}>
                <IconPhone />
              </div>
              <span className={styles.contactType}>Phone &amp; Skype</span>
              <h3 className={styles.contactValue}>{PHONE_NUMBER}</h3>
              <p className={styles.contactSub}>Skype ID: arashammarlooi_1</p>
              <a href={`tel:${PHONE_NUMBER.replace(/\s+/g, "")}`} className={styles.contactLink}>
                Call directly &rarr;
              </a>
            </div>
          </div>

          <footer className={styles.footer}>
            <div className={styles.footerBrand}>
              <strong>Arash Ammarlooi</strong>
              <span>Full-Stack Software Engineer</span>
            </div>
            <div className={styles.footerLinks}>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                {LINKEDIN_LABEL}
              </a>
              <a href={`mailto:${EMAIL_ADDRESS}`}>Email</a>
            </div>
            <p className={styles.footerCopy}>
              &copy; {new Date().getFullYear()} Arash Ammarlooi. Built with React and GSAP.
            </p>
          </footer>
        </section>
      </div>
    </div>
  );
};

export default Portfolio;
