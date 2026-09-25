import React, { useEffect, useState } from "react";
import Portfolio from "./routes/Portfolio/Portfolio";
import Navmenu from "./components/navmenu/Navmenu.js";
import Respmenu from "./components/respmenu/Respmenu.js";
import { Routes, Route } from "react-router-dom";

import "./styles/styles.scss";

let mql;

export default function App() {
  const [media, setMedia] = useState(true);
  const [navSolid, setNavSolid] = useState(false);

  useEffect(() => {
    document.body.style.background = "#ffffff";
    document.body.style.margin = "0";
  }, []);

  useEffect(() => {
    mql = window.matchMedia("(min-width: 777px)");
    setMedia(mql.matches);
    const resize = () => setMedia(mql.matches);
    mql.addEventListener("change", resize);
    return () => mql.removeEventListener("change", resize);
  }, []);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {!media ? <Respmenu navSolid={navSolid} /> : <Navmenu navSolid={navSolid} />}
      <Routes>
        <Route path="/" element={<Portfolio />} />
      </Routes>
    </>
  );
}
