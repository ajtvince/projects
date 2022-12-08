import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./components/App/App";
import Projects from "../src/components/Projects/Projects";
import MusicPage from "../src/components/Music/MusicPage";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/music" element={<MusicPage />} />
      <Route path="/" element={<Projects />} />
    </Routes>
    <App />
  </BrowserRouter>
);