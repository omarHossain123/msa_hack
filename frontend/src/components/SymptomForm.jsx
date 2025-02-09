import { useState } from "react";
import { Plus, X, Upload } from "lucide-react";
import "./SymptomForm.css";

const SymptomForm = ({ onSubmit }) => {
  const [symptoms, setSymptoms] = useState([""]);
  const [temperature, setTemperature] = useState("");
  const [smokingDrinkingDrugs, setSmokingDrinkingDrugs] = useState(false);
  const [substanceDetails, setSubstanceDetails] = useState(""); // New input for specifying substances
  const [pregnant, setPregnant] = useState(false);
  const [preExistingConditions, setPreExistingConditions] = useState("");
  const [recentSurgeries, setRecentSurgeries] = useState("");
  const [allergies, setAllergies] = useState("");
  const [currentMedications, setCurrentMedications] = useState("");
  const [healthcareNumber, setHealthcareNumber] = useState("");
  const [attachments, setAttachments] = useState([]);

  const handleAddSymptom = () => setSymptoms([...symptoms, ""]);
  const handleRemoveSymptom = (index) => {
    const newSymptoms = symptoms.filter((_, i) => i !== index);
    setSymptoms(newSymptoms.length ? newSymptoms : [""]);
  };

  const handleSymptomChange = (index, value) => {
    const newSymptoms = [...symptoms];
    newSymptoms[index] = value;
    setSymptoms(newSymptoms);
  };

  const handleFileUpload = (event) => {
    setAttachments([...attachments, ...event.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let filteredSymptoms = symptoms.map((s) => s.trim()).filter(Boolean); // Ensures no empty values

    console.log("DEBUG: Sending Symptoms ->", filteredSymptoms);

    if (filteredSymptoms.length > 0) {
      const patientData = {
        symptoms: filteredSymptoms, // ✅ Ensure symptoms is a direct list
        temperature,
        smoking_drinking_drugs: smokingDrinkingDrugs
          ? substanceDetails || "Yes"
          : "No",
        pregnant: pregnant ? "Yes" : "No",
        pre_existing_conditions: preExistingConditions,
        recent_surgeries: recentSurgeries,
        allergies,
        current_medications: currentMedications,
        healthcare_number: healthcareNumber,
        attachments,
      };

      console.log("DEBUG: Final Payload ->", patientData);
      onSubmit(patientData); // Send correctly formatted data
    } else {
      console.error("ERROR: Symptoms list is empty!");
    }
  };

  return (
    <div className="symptom-form-container">
      <h2 className="symptom-form-title">What brings you to the ER today?</h2>
      <form onSubmit={handleSubmit} className="symptom-form">
        {symptoms.map((symptom, index) => (
          <div key={index} className="symptom-input-container">
            <input
              type="text"
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
                <X size={16} />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddSymptom}
          className="add-symptom-btn"
        >
          <Plus size={16} /> Add Symptom
        </button>

        {/* Medical History Section */}
        <h3 className="medical-history-title">Medical History</h3>

        <label>What is your current temperature (if available)?</label>
        <input
          type="text"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
          placeholder="Enter temperature"
          className="symptom-input"
        />

        <label>
          <input
            type="checkbox"
            checked={smokingDrinkingDrugs}
            onChange={(e) => setSmokingDrinkingDrugs(e.target.checked)}
          />
          Do you smoke, drink alcohol, or use recreational drugs?
        </label>

        {/* Conditional Input for Substance Details */}
        {smokingDrinkingDrugs && (
          <input
            type="text"
            value={substanceDetails}
            onChange={(e) => setSubstanceDetails(e.target.value)}
            placeholder="Please specify (e.g., alcohol, tobacco, cannabis, etc.)"
            className="substance-input"
          />
        )}

        <label>
          <input
            type="checkbox"
            checked={pregnant}
            onChange={(e) => setPregnant(e.target.checked)}
          />
          Are you pregnant?
        </label>

        <label>Do you have any pre-existing medical conditions?</label>
        <input
          type="text"
          value={preExistingConditions}
          onChange={(e) => setPreExistingConditions(e.target.value)}
          placeholder="E.g., Diabetes, Heart Disease, High Blood Pressure"
          className="symptom-input"
        />

        <label>Have you had any recent surgeries or hospitalizations?</label>
        <input
          type="text"
          value={recentSurgeries}
          onChange={(e) => setRecentSurgeries(e.target.value)}
          placeholder="Enter recent surgeries/hospitalizations"
          className="symptom-input"
        />

        <label>Do you have any known allergies?</label>
        <input
          type="text"
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
          placeholder="E.g., Medications, Foods, Latex"
          className="symptom-input"
        />

        <label>Are you currently taking any medications?</label>
        <input
          type="text"
          value={currentMedications}
          onChange={(e) => setCurrentMedications(e.target.value)}
          placeholder="Enter medications"
          className="symptom-input"
        />

        {/* Healthcare Number */}
        <h3 className="medical-history-title">Personal Information</h3>
        <label>Healthcare Number</label>
        <input
          type="text"
          value={healthcareNumber}
          onChange={(e) => setHealthcareNumber(e.target.value)}
          placeholder="Enter your healthcare number"
          className="symptom-input"
        />

        {/* Attachments Upload */}
        <h3 className="medical-history-title">Upload Medical Documents</h3>
        <label>Attach medical reports, prescriptions, or relevant images</label>
        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          className="symptom-input"
        />
        {attachments.length > 0 && (
          <ul className="uploaded-files">
            {attachments.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        )}

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SymptomForm;
