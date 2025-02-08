import { useState } from "react";
import { Plus, X, ClipboardList } from "lucide-react";
import "./SymptomForm.css";

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
    <div className="symptom-form-container">
      <div className="symptom-form-card">
        <div className="symptom-form-header">
          <ClipboardList className="symptom-form-icon" />
          <h2 className="symptom-form-title">
            What brings you to the ER today?
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="symptom-form">
          <div className="symptom-input-group">
            {symptoms.map((symptom, index) => (
              <div key={index} className="symptom-input-wrapper">
                <input
                  value={symptom}
                  onChange={(e) => handleSymptomChange(index, e.target.value)}
                  placeholder="Enter a symptom"
                  className="symptom-input"
                />
                {symptoms.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveSymptom(index)}
                    className="remove-symptom-btn"
                  >
                    <X className="remove-icon" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="symptom-form-buttons">
            <button
              type="button"
              onClick={handleAddSymptom}
              className="add-symptom-btn"
            >
              <Plus className="add-icon" />
              Add Symptom
            </button>
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SymptomForm;
