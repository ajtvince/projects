import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App/App";
import About from "./components/About/About";
import Projects from "../src/components/Projects/Projects";
import Music from "../src/components/Music/Music";
import Home from "../src/components/Home/Home";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <BrowserRouter>
    <App />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/music" element={<Music />} />
      <Route path="/projects" element={<Projects />} />
    </Routes>
  </BrowserRouter>
);