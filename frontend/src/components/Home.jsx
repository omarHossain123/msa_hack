import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.get("http://127.0.0.1:5000/logout", { withCredentials: true });
    navigate("/login");
  };

  return (
    <div>
      <h1>Welcome to the Virtual ER Queue!</h1>
      <button onClick={handleLogout}>Logout</button>
      <br />
      <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
    </div>
  );
}

export default Home;
