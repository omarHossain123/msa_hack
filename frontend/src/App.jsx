import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return ( <div>
      <nav>
        <Link to="/" style={{ margin: 10 }}>Home</Link>
        <Link to="/login" style={{ margin: 10 }}>Login</Link>
        <Link to="/register" style={{ margin: 10 }}>Register</Link>
      </nav>
      <Routes>
        <Route path="/" element={<div>Welcome to Virtual ER Queue</div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>);
}

export default App;