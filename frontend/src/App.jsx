import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import SymptomForm from "./components/SymptomForm";
import WaitingList from "./components/WaitingList";
import EstimatedWaitTime from "./components/EstimatedWaitTime";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  const [waitingList, setWaitingList] = useState([]);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchWaitingList();
    // Check if user is already logged in (e.g., from localStorage)
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
          Authorization: `Bearer ${user?.token}`, // Add token if your API requires it
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

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  const MainContent = () => (
    <div className="space-y-6">
      {isAuthenticated ? (
        !currentPatient ? (
          <SymptomForm onSubmit={addPatient} />
        ) : (
          <EstimatedWaitTime patient={currentPatient} />
        )
      ) : (
        <div className="text-center py-8">
          <h2 className="text-xl font-semibold mb-4">
            Welcome to the ER Virtual Waiting Room
          </h2>
          <p className="mb-4">Please log in to join the queue</p>
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Log In Here
          </Link>
        </div>
      )}
      <WaitingList patients={waitingList} />
    </div>
  );

  return (
    <Router>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          ER Virtual Waiting Room
        </h1>
        <nav className="mb-8 flex justify-between items-center">
          <div>
            <Link to="/" className="mr-4 text-blue-600 hover:text-blue-800">
              Home
            </Link>
            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className="mr-4 text-blue-600 hover:text-blue-800"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Register
                </Link>
              </>
            )}
          </div>
          {isAuthenticated && (
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Welcome, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <Register />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
