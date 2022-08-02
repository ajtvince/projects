import { Link } from "react-router-dom";

export default function App() {
  return (
    <div>
      <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/music">Music Player</Link>
        <Link to="/game">Game</Link>
      </div>
    </div>
  );
}