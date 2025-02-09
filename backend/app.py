from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from datetime import datetime
from triage import assess_severity
from login import login_bp, db, login_manager
import os
from werkzeug.utils import secure_filename

# Define upload settings before using them
UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg"}

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite"
app.config["SECRET_KEY"] = "WOAH, THIS IS SECRET! AND TOOOTALLY RANDOM! sinjab sucks "
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER  # This will now work

CORS(app)

# Ensure upload directory exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

# Initialize extensions with the app
db.init_app(app)
login_manager.init_app(app)

with app.app_context():
    db.create_all()

app.register_blueprint(login_bp)

@app.route("/api/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(file_path)
        return jsonify({"message": "File uploaded", "file_path": file_path})

    return jsonify({"error": "Invalid file type"}), 400

def load_waiting_list():
    with open('mock_data.json', 'r') as f:
        return json.load(f)

def save_waiting_list(data):
    with open('mock_data.json', 'w') as f:
        json.dump(data, f, indent=4)

@app.route('/api/waiting-list', methods=['GET'])
def get_waiting_list():
    return jsonify(load_waiting_list())

@app.route('/api/add-patient', methods=['POST'])
def add_patient():
    data = request.json  # Full request payload

    print(f"DEBUG: Received patient data -> {json.dumps(data, indent=4)}")  # Debugging

    waiting_list = load_waiting_list()

    # Extract symptoms correctly
    if isinstance(data.get("symptoms"), dict) and "symptoms" in data["symptoms"]:
        symptoms = data["symptoms"]["symptoms"]  # Extract correctly if nested
    else:
        symptoms = data.get("symptoms", [])

    # Ensure symptoms is a **list**
    if not isinstance(symptoms, list):
        print(f"ERROR: Symptoms data is not a list! Found: {type(symptoms)}. Fixing it...")
        symptoms = []  # Fix by assigning an empty list

    print(f"DEBUG: Extracted symptoms -> {symptoms}")

    triage_level = assess_severity(symptoms)

    # Calculate estimated wait time based on triage level
    base_wait_times = {
        1: 0,    # Immediate
        2: 15,   # Emergency (15 mins)
        3: 30,   # Urgent (30 mins)
        4: 60,   # Semi-urgent (1 hour)
        5: 120   # Non-urgent (2 hours)
    }

    # Store additional medical information
    new_patient = {
        "id": len(waiting_list["waiting_patients"]) + 1,
        "arrival_time": datetime.now().isoformat(),
        "symptoms": symptoms,
        "temperature": data.get("temperature", ""),
        "smoking_drinking_drugs": data.get("smoking_drinking_drugs", "No"),
        "pregnant": data.get("pregnant", "No"),
        "pre_existing_conditions": data.get("pre_existing_conditions", ""),
        "recent_surgeries": data.get("recent_surgeries", ""),
        "allergies": data.get("allergies", ""),
        "current_medications": data.get("current_medications", ""),
        "healthcare_number": data.get("healthcare_number", ""),
        "attachments": data.get("attachments", []),
        "triage_level": triage_level,
        "estimated_wait_time": base_wait_times[triage_level]
    }

    waiting_list["waiting_patients"].append(new_patient)
    save_waiting_list(waiting_list)

    return jsonify(new_patient)



@app.route('/api/remove-patient/<int:patient_id>', methods=['DELETE'])
def remove_patient(patient_id):
    waiting_list = load_waiting_list()
    waiting_list["waiting_patients"] = [p for p in waiting_list["waiting_patients"] if p["id"] != patient_id]
    save_waiting_list(waiting_list)
    return jsonify({"message": "Patient removed"})

if __name__ == '__main__':
    app.run(debug=True)
