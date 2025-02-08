import { Clock, AlertCircle, Activity, Users } from "lucide-react";
import "./EstimatedWaitTime.css";

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
    <div className="estimated-wait-container">
      <div className="estimated-wait-box">
        <div className="estimated-header">
          <Clock className="h-6 w-6" />
          <h2>Your Estimated Wait Time</h2>
        </div>

        <div className="estimated-content">
          {/* Main Status Card */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className={`estimated-section triage-${patient.triage_level}`}>
              <div className="flex items-center gap-3 mb-4">
                <Activity className="h-5 w-5" />
                <h3 className="font-semibold">Triage Level</h3>
              </div>
              <div>
                <p className="text-3xl font-bold">
                  Level {patient.triage_level}
                </p>
                <p className="text-sm opacity-90">
                  {getTriageDescription(patient.triage_level)}
                </p>
              </div>
            </div>

            <div className="estimated-section wait-time">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-blue-600">Wait Time</h3>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600">
                  {patient.estimated_wait_time}
                </p>
                <p className="text-blue-600 opacity-90">minutes</p>
                <p className="text-sm text-blue-600 opacity-90">
                  Estimated time until you're seen
                </p>
              </div>
            </div>
          </div>

          {/* Position in Queue */}
          <div className="queue-info">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-gray-600" />
              <p className="text-sm text-gray-600">
                There are currently{" "}
                <span className="font-semibold">{patient.queue_position}</span>{" "}
                patients waiting to be seen
              </p>
            </div>
          </div>

          {/* Important Notice */}
          <div className="notice-box">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-amber-800 font-medium">
                Important Notice
              </p>
              <p className="notice-text">
                Wait times are estimates and may change based on emergency
                cases. If your condition worsens, please notify staff
                immediately or call emergency services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimatedWaitTime;
