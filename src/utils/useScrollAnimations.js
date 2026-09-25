import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerNavigator } from "./scrollTo";

gsap.registerPlugin(ScrollTrigger);

// Elements opt into animations through data attributes, so this hook stays
// decoupled from the hashed class names CSS modules generate.
const HEADER_OFFSET = 78;

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
export default function useScrollAnimations({ scopeRef, trackRef, onProgress }) {
  useEffect(() => {
    const scope = scopeRef.current;
    const track = trackRef.current;
    if (!scope || !track) return undefined;

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
            { y: 42, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: edge, containerAnimation: container },
            }
          );
        });

        q("[data-animate='card']").forEach((el, i) => {
          gsap.fromTo(
            el,
            { y: 54, scale: 0.96, opacity: 0 },
            {
              y: 0,
              scale: 1,
              opacity: 1,
              duration: 0.85,
              ease: "power3.out",
              delay: (i % 4) * 0.06,
              scrollTrigger: {
                trigger: el,
                start: container ? "left 92%" : "top 92%",
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
              duration: 0.75,
              ease: "power3.out",
              stagger: 0.04,
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
              duration: 1.25,
              ease: "power3.out",
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

        const horizontal = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: scope,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${getDistance()}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (st) => onProgress && onProgress(st.progress * 100),
          },
        });

        buildReveals(horizontal);

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

        return () => unregister();
      });

      // --- Stacked layout for tablets and phones ---
      mm.add("(max-width: 1023px)", () => {
        buildReveals(undefined);

        const onScroll = () => {
          const max = document.documentElement.scrollHeight - window.innerHeight;
          if (onProgress) onProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
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
  }, [scopeRef, trackRef, onProgress]);
}
