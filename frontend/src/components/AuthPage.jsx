import { useState } from "react";
import { Heart, Mail, Lock } from "lucide-react";
import "./AuthPage.css";

const AuthPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "login_user" : "register_user";

    try {
      const res = await fetch(`http://127.0.0.1:5000/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setFeedback(data.message);
        if (isLogin && onLogin) {
          onLogin({ name: username, token: data.token });
        }
      } else {
        setFeedback(
          data.error || `${isLogin ? "Login" : "Registration"} failed.`
        );
      }
    } catch (error) {
      setFeedback(`${isLogin ? "Login" : "Registration"} failed.`);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <Heart className="auth-logo-icon" />
          <h1>QCare</h1>
        </div>

        <h2 className="auth-title">
          {isLogin ? "Welcome back" : "Create your account"}
        </h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <Mail className="input-icon" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <Lock className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {feedback && (
            <div
              className={`feedback ${
                feedback.includes("failed") ? "error" : "success"
              }`}
            >
              {feedback}
            </div>
          )}

          <button type="submit" className="submit-button">
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="auth-switch">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
