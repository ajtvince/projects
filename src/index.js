import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App/App";
import About from "./components/About/About";
import Projects from "../src/components/Projects/Projects";
import MusicPage from "../src/components/Music/MusicPage";
import Home from "../src/components/Home/Home";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/music" element={<MusicPage />} />
      <Route path="/projects" element={<Projects />} />
    </Routes>
    <App />
  </BrowserRouter>
);