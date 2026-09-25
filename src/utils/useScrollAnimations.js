import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerNavigator } from "./scrollTo";

gsap.registerPlugin(ScrollTrigger);

// Elements opt into animations through data attributes, so this hook stays
// decoupled from the hashed class names CSS modules generate.
const HEADER_OFFSET = 78;

// How much page scrolling it takes to travel the full width of the track.
// At 1.0 a pixel of scrolling moves the track a pixel, which makes six
// full-width panels feel endless; 0.55 covers the same ground in roughly one
// viewport height per panel.
const TRAVEL_RATIO = 0.55;

// Low scrub keeps the track glued to the wheel. Higher values read as lag.
const SCRUB = 0.35;

function splitHeadings(scope) {
  scope.querySelectorAll("[data-animate='split']").forEach((el) => {
    if (el.dataset.splitReady === "true") return;
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = "";
    // Words are plain inline-blocks rather than clipped masks: an
    // overflow-hidden wrapper changes the inline box's baseline and clips
    // glyphs once a heading wraps onto a second line.
    words.forEach((word, i) => {
      const span = document.createElement("span");
      span.className = "js-word";
      span.style.display = "inline-block";
      span.textContent = word + (i < words.length - 1 ? "\u00A0" : "");
      el.appendChild(span);
    });
    el.dataset.splitReady = "true";
  });
}

/**
 * Builds the scroll choreography. On wide screens the whole page becomes a
 * pinned horizontal track: scrolling down travels to the right. Narrow screens
 * keep a conventional vertical flow with the same reveal animations.
 */
export default function useScrollAnimations({
  scopeRef,
  trackRef,
  onProgress,
  onActivePanel,
}) {
  useEffect(() => {
    const scope = scopeRef.current;
    const track = trackRef.current;
    if (!scope || !track) return undefined;

    const panels = Array.from(track.querySelectorAll("[data-panel]"));

    // Reports which panel the viewport is currently sitting on so the arrows
    // and dots can reflect position.
    let reportedIndex = 0;
    const reportPanel = (index) => {
      if (index !== reportedIndex && onActivePanel) {
        reportedIndex = index;
        onActivePanel(index);
      }
    };

    splitHeadings(scope);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context((self) => {
      const q = self.selector;

      // Shared reveal definitions. `container` is the horizontal tween when the
      // sideways layout is active, otherwise undefined for normal vertical scroll.
      const buildReveals = (container) => {
        const edge = container ? "left 88%" : "top 88%";

        q("[data-animate='fade-up']").forEach((el) => {
          gsap.fromTo(
            el,
            { y: 16, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.32,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: edge, containerAnimation: container },
            }
          );
        });

        // Short travel and a brief stagger so a row of cards finishes as the
        // slide locks in, instead of still rising after it has stopped.
        q("[data-animate='card']").forEach((el, i) => {
          gsap.fromTo(
            el,
            { y: 18, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.32,
              ease: "power2.out",
              delay: (i % 4) * 0.025,
              scrollTrigger: {
                trigger: el,
                start: container ? "left 78%" : "top 88%",
                containerAnimation: container,
              },
            }
          );
        });

        q("[data-animate='split']").forEach((el) => {
          gsap.fromTo(
            el.querySelectorAll(".js-word"),
            { yPercent: 40, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.35,
              ease: "power2.out",
              stagger: 0.02,
              scrollTrigger: {
                trigger: el,
                start: container ? "left 92%" : "top 90%",
                containerAnimation: container,
              },
            }
          );
        });

        q("[data-meter]").forEach((el) => {
          gsap.fromTo(
            el,
            { width: "0%" },
            {
              width: `${parseFloat(el.dataset.meter) || 0}%`,
              duration: 0.55,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: container ? "left 92%" : "top 92%",
                containerAnimation: container,
              },
            }
          );
        });

        q("[data-count]").forEach((el) => {
          const target = parseFloat(el.dataset.count) || 0;
          const suffix = el.dataset.countSuffix || "";
          const counter = { value: 0 };
          gsap.to(counter, {
            value: target,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: container ? "left 94%" : "top 94%",
              containerAnimation: container,
            },
            onUpdate: () => {
              el.textContent = `${Math.round(counter.value)}${suffix}`;
            },
          });
        });

        // Depth parallax. Layers drift along the axis of travel.
        q("[data-parallax]").forEach((el) => {
          const speed = parseFloat(el.dataset.parallax) || 0.12;
          const panel = el.closest("[data-panel]") || el;
          gsap.to(el, {
            [container ? "xPercent" : "yPercent"]: speed * -100,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: container ? "left right" : "top bottom",
              end: container ? "right left" : "bottom top",
              scrub: true,
              containerAnimation: container,
            },
          });
        });
      };

      if (reduceMotion) {
        gsap.set(q("[data-animate], [data-parallax]"), { clearProps: "all" });
        q("[data-meter]").forEach((el) => {
          el.style.width = `${parseFloat(el.dataset.meter) || 0}%`;
        });
        return;
      }

      // Hero intro plays immediately, independent of scroll position.
      gsap.from(q("[data-animate='hero']"), {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.085,
      });

      const mm = gsap.matchMedia();

      // --- Sideways layout: scrolling down drives the track to the right ---
      mm.add("(min-width: 1024px)", () => {
        const getDistance = () => Math.max(track.scrollWidth - window.innerWidth, 1);
        const getScrollLength = () => getDistance() * TRAVEL_RATIO;

        const horizontal = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: scope,
            pin: true,
            scrub: SCRUB,
            start: "top top",
            end: () => `+=${getScrollLength()}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            // Settle on a whole slide. Inertia is off so momentum cannot skip
            // past the neighbouring panel.
            snap: {
              snapTo: 1 / Math.max(panels.length - 1, 1),
              inertia: false,
              duration: { min: 0.2, max: 0.45 },
              delay: 0.05,
              ease: "power2.inOut",
            },
            onUpdate: (st) => {
              if (onProgress) onProgress(st.progress * 100);

              // The panel occupying the left third of the viewport is the
              // one the visitor is reading.
              const travelled = st.progress * getDistance() + window.innerWidth * 0.34;
              let index = 0;
              for (let i = 0; i < panels.length; i += 1) {
                if (panels[i].offsetLeft <= travelled) index = i;
              }
              reportPanel(index);
            },
          },
        });

        buildReveals(horizontal);

        // One wheel gesture advances exactly one slide. Further events from
        // the same gesture are ignored until the slide has settled.
        let wheelLock = false;
        const onWheel = (event) => {
          if (Math.abs(event.deltaY) < 6 && Math.abs(event.deltaX) < 6) return;
          event.preventDefault();
          if (wheelLock) return;

          const direction = (event.deltaY || event.deltaX) > 0 ? 1 : -1;
          const next = Math.min(Math.max(reportedIndex + direction, 0), panels.length - 1);
          if (next === reportedIndex) return;

          wheelLock = true;
          const st = horizontal.scrollTrigger;
          const span = st.end - st.start;
          window.scrollTo({
            top: st.start + (span * next) / (panels.length - 1),
            behavior: "smooth",
          });
          window.setTimeout(() => {
            wheelLock = false;
          }, 700);
        };
        window.addEventListener("wheel", onWheel, { passive: false });

        // Translate a section id into the page scroll offset that parks the
        // matching panel at the left edge of the viewport.
        const unregister = registerNavigator((id) => {
          const panel = track.querySelector(`#${CSS.escape(id)}`);
          if (!panel) return false;
          const st = horizontal.scrollTrigger;
          const max = getDistance();
          const ratio = Math.min(panel.offsetLeft / max, 1);
          window.scrollTo({
            top: st.start + (st.end - st.start) * ratio,
            behavior: "smooth",
          });
          return true;
        });

        return () => {
          window.removeEventListener("wheel", onWheel);
          unregister();
        };
      });

      // --- Stacked layout for tablets and phones ---
      mm.add("(max-width: 1023px)", () => {
        buildReveals(undefined);

        const onScroll = () => {
          const max = document.documentElement.scrollHeight - window.innerHeight;
          if (onProgress) onProgress(max > 0 ? (window.scrollY / max) * 100 : 0);

          const line = window.innerHeight * 0.4;
          let index = 0;
          panels.forEach((panel, i) => {
            if (panel.getBoundingClientRect().top <= line) index = i;
          });
          reportPanel(index);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });

        const unregister = registerNavigator((id) => {
          const panel = document.getElementById(id);
          if (!panel) return false;
          window.scrollTo({
            top: panel.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET,
            behavior: "smooth",
          });
          return true;
        });

        return () => {
          window.removeEventListener("scroll", onScroll);
          unregister();
        };
      });
    }, scope);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const refreshTimer = window.setTimeout(refresh, 300);

    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [scopeRef, trackRef, onProgress, onActivePanel]);
}
