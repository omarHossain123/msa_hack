import { useState } from "react";

const SymptomForm = ({ onSubmit }) => {
  const [symptoms, setSymptoms] = useState([""]);

  const handleAddSymptom = () => {
    setSymptoms([...symptoms, ""]);
  };

  const handleSymptomChange = (index, value) => {
    const newSymptoms = [...symptoms];
    newSymptoms[index] = value;
    setSymptoms(newSymptoms);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredSymptoms = symptoms.filter((s) => s.trim() !== "");
    onSubmit(filteredSymptoms);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Enter Your Symptoms</h2>
      <form onSubmit={handleSubmit}>
        {symptoms.map((symptom, index) => (
          <input
            key={index}
            type="text"
            value={symptom}
            onChange={(e) => handleSymptomChange(index, e.target.value)}
            placeholder="Enter a symptom"
            className="w-full p-2 mb-2 border rounded"
          />
        ))}
        <button
          type="button"
          onClick={handleAddSymptom}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded mr-2"
        >
          Add Another Symptom
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SymptomForm;
