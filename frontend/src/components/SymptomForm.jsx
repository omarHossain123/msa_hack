import React, { useState } from "react";

const SymptomForm = ({ onSubmit }) => {
  const [symptoms, setSymptoms] = useState([""]);

  const handleAddSymptom = () => {
    setSymptoms([...symptoms, ""]);
  };

  const handleRemoveSymptom = (index) => {
    const newSymptoms = symptoms.filter((_, i) => i !== index);
    setSymptoms(newSymptoms.length ? newSymptoms : [""]);
  };

  const handleSymptomChange = (index, value) => {
    const newSymptoms = [...symptoms];
    newSymptoms[index] = value;
    setSymptoms(newSymptoms);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredSymptoms = symptoms.filter((s) => s.trim() !== "");
    if (filteredSymptoms.length > 0) {
      onSubmit(filteredSymptoms);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-center text-gray-900 mb-6">
        What brings you to the ER today?
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {symptoms.map((symptom, index) => (
          <div key={index} className="flex gap-2">
            <input
              value={symptom}
              onChange={(e) => handleSymptomChange(index, e.target.value)}
              placeholder="Enter a symptom"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {symptoms.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveSymptom(index)}
                className="p-2 text-red-600 hover:text-red-800 focus:outline-none"
              >
                ✕
              </button>
            )}
          </div>
        ))}

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={handleAddSymptom}
            className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            + Add Symptom
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SymptomForm;
