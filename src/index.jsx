import React, { Fragment } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navmenu from "./components/navmenu/Navmenu.js";
import Respmenu from "./components/respmenu/Respmenu.js";

import App from './App.jsx'

import Root from "./routes/root.jsx";

// Detect if running on GitHub Pages (production) or local development
const basename = process.env.NODE_ENV === 'production' ? '/Portfolio' : '';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode >
);