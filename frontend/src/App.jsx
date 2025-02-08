import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");

  const registerUser = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/register_user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      setFeedback(data.message || "Registration succeeded.");
    } catch (err) {
      console.error(err);
      setFeedback("Registration failed.");
    }
  };

  const loginUser = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/login_user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setFeedback(data.message);
      } else {
        setFeedback(data.error || "Login failed.");
      }
    } catch (err) {
      console.error(err);
      setFeedback("Login failed.");
    }
  };

  return (
    <div>
      <h2>Register or Login</h2>
      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={registerUser}>Register</button>
      <button onClick={loginUser}>Login</button>
      <p>{feedback}</p>
    </div>
  );
}

export default App;