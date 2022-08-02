import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App/App";
import About from "./components/About/About";
import Game from "../src/components/Game/Game";
import Music from "../src/components/Music/Music";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <BrowserRouter>
    <App />
    <Routes>
      <Route path="/" element={<About />} />
      <Route path="/about" element={<About />} />
      <Route path="/music" element={<Music />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  </BrowserRouter>
);