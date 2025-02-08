const WaitingList = ({ patients }) => {
  const getTriageColor = (level) => {
    const colors = {
      1: "bg-red-500",
      2: "bg-orange-500",
      3: "bg-yellow-500",
      4: "bg-green-500",
      5: "bg-blue-500",
    };
    return colors[level] || "bg-gray-500";
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Current Waiting List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">Position</th>
              <th className="px-4 py-2">Arrival Time</th>
              <th className="px-4 py-2">Triage Level</th>
              <th className="px-4 py-2">Est. Wait Time</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient, index) => (
              <tr key={patient.id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">
                  {new Date(patient.arrival_time).toLocaleTimeString()}
                </td>
                <td className="border px-4 py-2">
                  <span
                    className={`${getTriageColor(
                      patient.triage_level
                    )} text-white px-2 py-1 rounded`}
                  >
                    Level {patient.triage_level}
                  </span>
                </td>
                <td className="border px-4 py-2">
                  {patient.estimated_wait_time} mins
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WaitingList;
