import React, { useEffect, useState } from "react";
import HomeSlider from "./routes/HomeSlider/HomeSlider";
import Navmenu from "./components/navmenu/Navmenu.js";
import Respmenu from "./components/respmenu/Respmenu.js";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import "./styles/styles.scss";

let mql;

export default function App() {
  const [media, setMedia] = useState(true);
  const location = useLocation();
  
  React.useEffect(() => {
    // Keep background purple for home page
    document.body.style.background = "rgb(96, 63, 213)";
  }, [location]);

  useEffect(() => {
    mql = window.matchMedia("(min-width: 777px)");
    mql.addEventListener("change", resize);
    function resize(e) {
      setMedia(mql.matches)
    }
    return () => {
      mql.removeEventListener("change", resize);
    }
  }, []);
  
  return (
    <>
      {!media ? <Respmenu /> : <Navmenu />}
      <Routes>
        <Route path="/" element={<HomeSlider />} />
      </Routes>
    </>
  )
}