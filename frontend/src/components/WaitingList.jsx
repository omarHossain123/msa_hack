import { Users, Clock, AlertCircle } from "lucide-react";
import "./WaitingList.css"; // Import the external CSS file

const WaitingList = ({ patients }) => {
  const getTriageColor = (level) => {
    const colors = {
      1: "triage-red",
      2: "triage-orange",
      3: "triage-yellow",
      4: "triage-green",
      5: "triage-blue",
    };
    return colors[level] || "triage-gray";
  };

  const getTriageText = (level) => {
    const text = {
      1: "Critical",
      2: "Emergency",
      3: "Urgent",
      4: "Semi-urgent",
      5: "Non-urgent",
    };
    return text[level] || "Unknown";
  };

  if (!patients || patients.length === 0) {
    return (
      <div className="waiting-list-container">
        <h2 className="waiting-list-title">Current Waiting List</h2>
        <p>No patients currently in queue.</p>
      </div>
    );
  }

  return (
    <div className="waiting-list-container">
      <h2 className="waiting-list-title">Current Waiting List</h2>
      <table className="waiting-list-table">
        <thead>
          <tr>
            <th>Position</th>
            <th>Arrival Time</th>
            <th>Triage Level</th>
            <th>Est. Wait Time</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr key={index}>
              <td>#{index + 1}</td>
              <td>{new Date(patient.arrival_time).toLocaleTimeString()}</td>
              <td className={getTriageColor(patient.triage_level)}>
                {getTriageText(patient.triage_level)}
              </td>
              <td>{patient.estimated_wait_time} mins</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="waiting-list-disclaimer">
        Wait times are estimates and may change based on emergency cases.
        Patients are seen based on medical priority, not arrival time.
      </p>
    </div>
  );
};

export default WaitingList;
