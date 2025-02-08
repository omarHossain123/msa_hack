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
        <div className="waiting-list-card">
          <div className="waiting-list-header">
            <Users className="header-icon" />
            <h2 className="header-title">Current Waiting List</h2>
          </div>
          <div className="waiting-list-empty">
            <p>No patients currently in queue</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="waiting-list-container">
      <div className="waiting-list-card">
        <div className="waiting-list-header">
          <Users className="header-icon" />
          <h2 className="header-title">Current Waiting List</h2>
        </div>

        <div className="table-container">
          <table className="waiting-table">
            <thead>
              <tr className="table-header">
                <th className="table-heading first">Position</th>
                <th className="table-heading">Arrival Time</th>
                <th className="table-heading">Triage Level</th>
                <th className="table-heading last">Est. Wait Time</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr key={patient.id} className="table-row">
                  <td className="table-data">#{index + 1}</td>
                  <td className="table-data">
                    <div className="arrival-time">
                      <Clock className="clock-icon" />
                      {new Date(patient.arrival_time).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="table-data">
                    <span
                      className={`triage-badge ${getTriageColor(
                        patient.triage_level
                      )}`}
                    >
                      {getTriageText(patient.triage_level)}
                    </span>
                  </td>
                  <td className="table-data">
                    <div className="wait-time">
                      <span>{patient.estimated_wait_time}</span>
                      <span className="time-label">mins</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="info-section">
          <div className="info-content">
            <AlertCircle className="info-icon" />
            <p className="info-text">
              Wait times are estimates and may change based on emergency cases.
              Patients are seen based on medical priority, not arrival time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingList;
