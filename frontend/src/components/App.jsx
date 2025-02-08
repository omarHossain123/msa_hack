import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";

function App() {
  return (
    <div>
      <nav>
        <Link to="/login" style={{ margin: 10 }}>Login</Link>
        <Link to="/register" style={{ margin: 10 }}>Register</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<div>Welcome to the Virtual ER Queue App</div>} />
      </Routes>
    </div>
  );
}

export default App;