import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SymptomForm from "./components/SymptomForm";
import WaitingList from "./components/WaitingList";
import EstimatedWaitTime from "./components/EstimatedWaitTime";
import AuthPage from "./components/AuthPage";

const App = () => {
  const [waitingList, setWaitingList] = useState([]);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchWaitingList();
    // Check if user is already logged in
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
    <div className="max-w-4xl mx-auto space-y-6">
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
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900">
                ER Virtual Waiting Room
              </h1>
            </div>
            {isAuthenticated && (
              <div className="flex items-center gap-4">
                <span className="text-gray-600">Welcome, {user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>

        <main className="container mx-auto px-4 py-8">
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
