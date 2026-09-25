// The portfolio switches between a vertical layout and a GSAP-driven horizontal
// track. Whichever layout is active registers how navigation should resolve a
// section id, so the menus can stay agnostic of the current mode.
let navigate = null;

export function registerNavigator(fn) {
  navigate = fn;
  return () => {
    if (navigate === fn) navigate = null;
  };
}

export function scrollToSection(id) {
  if (navigate && navigate(id)) return;

  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
