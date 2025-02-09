import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Heart, LogOut, Menu, X } from "lucide-react";
import SymptomForm from "./components/SymptomForm";
import WaitingList from "./components/WaitingList";
import EstimatedWaitTime from "./components/EstimatedWaitTime";
import AuthPage from "./components/AuthPage";
import "./App.css";

const App = () => {
  const [waitingList, setWaitingList] = useState([]);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchWaitingList();
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const fetchWaitingList = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/waiting-list");
      const data = await response.json();
      setWaitingList(data.waiting_patients);
    } catch (error) {
      console.error("Error fetching waiting list:", error);
    }
  };

  const addPatient = async (symptoms) => {
    try {
      const response = await fetch("http://localhost:5000/api/add-patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ symptoms, userId: user?.id }),
      });
      const newPatient = await response.json();
      setCurrentPatient(newPatient);
      fetchWaitingList();
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setCurrentPatient(null);
    localStorage.removeItem("user");
  };

  const MainContent = () => (
    <div className="main-content">
      {isAuthenticated ? (
        !currentPatient ? (
          <SymptomForm onSubmit={addPatient} />
        ) : (
          <EstimatedWaitTime patient={currentPatient} />
        )
      ) : (
        <Navigate to="/auth" replace />
      )}
      <WaitingList patients={waitingList} />
    </div>
  );

  return (
    <Router>
      <div className="app-container">
        <header className="header">
          <div className="header-content">
            <div className="logo-container">
              <Heart className="logo-icon" />
              <h1 className="logo-text">QCare</h1>
            </div>

            <button
              className="mobile-menu-button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>

            {isAuthenticated && (
              <nav className={`nav-menu ${isMobileMenuOpen ? "active" : ""}`}>
                <span className="username">{user?.name}</span>
                <button onClick={handleLogout} className="logout-button">
                  <LogOut className="logout-icon" />
                  <span>Logout</span>
                </button>
              </nav>
            )}
          </div>
        </header>

        <main className="main-container">
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <MainContent />
                ) : (
                  <Navigate to="/auth" replace />
                )
              }
            />
            <Route
              path="/auth"
              element={
                isAuthenticated ? (
                  <Navigate to="/" replace />
                ) : (
                  <AuthPage onLogin={handleLogin} />
                )
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
