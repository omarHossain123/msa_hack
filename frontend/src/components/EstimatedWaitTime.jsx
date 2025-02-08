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
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Your Estimated Wait Time</h2>
      <div className="space-y-4">
        <div>
          <p className="font-medium">Triage Level:</p>
          <p className="text-lg">
            Level {patient.triage_level} -{" "}
            {getTriageDescription(patient.triage_level)}
          </p>
        </div>
        <div>
          <p className="font-medium">Estimated Wait Time:</p>
          <p className="text-2xl font-bold text-blue-600">
            {patient.estimated_wait_time} minutes
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">
            Please note that wait times are estimates and may change based on
            emergency cases.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EstimatedWaitTime;
