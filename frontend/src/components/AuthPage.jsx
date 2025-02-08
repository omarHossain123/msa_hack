import { useState } from "react";
import { LockKeyhole, UserCircle2 } from "lucide-react";
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
      <div className="auth-box">
        <div className="auth-header">
          <h2>Welcome</h2>
          <p>{isLogin ? "Sign in to your account" : "Create a new account"}</p>
        </div>

        <div className="auth-body">
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-input-container">
              <UserCircle2 className="auth-icon" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="auth-input-container">
              <LockKeyhole className="auth-icon" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {feedback && (
              <div
                className={`feedback-box ${
                  feedback.includes("failed")
                    ? "feedback-error"
                    : "feedback-success"
                }`}
              >
                {feedback}
              </div>
            )}

            <button type="submit" className="auth-button">
              {isLogin ? "Sign In" : "Register"}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <button onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Create an account" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
