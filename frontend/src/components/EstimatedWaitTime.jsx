import React from "react";

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

  const getTriageColor = (level) => {
    const colors = {
      1: "text-red-600",
      2: "text-orange-600",
      3: "text-yellow-600",
      4: "text-green-600",
      5: "text-blue-600",
    };
    return colors[level] || "text-gray-600";
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold text-center text-gray-900 mb-6">
          Your Estimated Wait Time
        </h2>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Triage Level</p>
              <p
                className={`text-lg font-semibold ${getTriageColor(
                  patient.triage_level
                )}`}
              >
                Level {patient.triage_level}
              </p>
              <p className="text-sm text-gray-600">
                {getTriageDescription(patient.triage_level)}
              </p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-sm text-gray-500">Estimated Wait</p>
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-2xl font-bold text-blue-600">
                  {patient.estimated_wait_time}
                </p>
                <span className="text-sm text-gray-600">mins</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
            <svg
              className="h-5 w-5 text-blue-600 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm text-blue-800">
              Wait times are estimates and may change based on emergency cases.
              Please seek immediate medical attention if your condition worsens.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimatedWaitTime;
