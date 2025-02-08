import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:5000/login_user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      setFeedback(res.ok ? data.message : data.error || "Login failed.");
    } catch (err) {
      console.error(err);
      setFeedback("Login failed.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={loginUser}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br/>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br/>
        <button type="submit">Login</button>
      </form>
      <p>{feedback}</p>
    </div>
  );
}

export default Login;