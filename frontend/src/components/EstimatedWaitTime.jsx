import { Clock, AlertCircle, Activity, Users } from "lucide-react";
import "./EstimatedWaitTime.css"; // Import the external CSS file

const EstimatedWaitTime = ({ patient }) => {
  const getTriageDescription = (level) => {
    const descriptions = {
      1: "Immediate care required",
      2: "Emergency - Very urgent",
      3: "Urgent",
      4: "Semi-urgent",
      5: "Non-urgent",
    };
    return descriptions[level] || "Unknown";
  };

  return (
    <div className="estimated-wait-time-container">
      <h2 className="estimated-wait-time-title">Your Estimated Wait Time</h2>
      <div className="status-card">
        <Clock size={32} />
        <h3>Triage Level: {patient.triage_level}</h3>
        <p>{getTriageDescription(patient.triage_level)}</p>
        <p>Estimated Wait Time: {patient.estimated_wait_time} minutes</p>
      </div>
      <div className="queue-status">
        <Users size={24} />
        <p>
          There are currently {patient.queue_position} patients ahead of you.
        </p>
      </div>
      <div className="important-notice">
        <AlertCircle size={24} />
        <p>
          Wait times are estimates and may change based on emergency cases. If
          your condition worsens, please notify staff immediately or call
          emergency services.
        </p>
      </div>
    </div>
  );
};

export default EstimatedWaitTime;
