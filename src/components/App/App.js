import { Link } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <div>
      <img id='backgroundImg' src='./images/lakemountain.jpg'></img>
      <div id="navbar">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/music">Music Player</Link>
        <Link to="/projects">Projects</Link>
      </div>
    </div>
  );
}