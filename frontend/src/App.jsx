import { useState, useEffect } from "react";
import SymptomForm from "./components/SymptomForm";
import WaitingList from "./components/WaitingList";
import EstimatedWaitTime from "./components/EstimatedWaitTime";

const App = () => {
  const [waitingList, setWaitingList] = useState([]);
  const [currentPatient, setCurrentPatient] = useState(null);

  useEffect(() => {
    fetchWaitingList();
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
        },
        body: JSON.stringify({ symptoms }),
      });
      const newPatient = await response.json();
      setCurrentPatient(newPatient);
      fetchWaitingList();
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        ER Virtual Waiting Room
      </h1>

      {!currentPatient ? (
        <SymptomForm onSubmit={addPatient} />
      ) : (
        <EstimatedWaitTime patient={currentPatient} />
      )}

      <WaitingList patients={waitingList} />
    </div>
  );
};

export default App;
