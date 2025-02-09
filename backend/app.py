from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from datetime import datetime
#from triage import assess_severity
from openAITriage import assess_severity
from login import login_bp, db, login_manager
import os

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite"
app.config["SECRET_KEY"] = "WOAH, THIS IS SECRET! AND TOOOTALLY RANDOM! sinjab sucks "
CORS(app)

# Initialize extensions with the app
db.init_app(app)
login_manager.init_app(app)

with app.app_context():
    db.create_all()

app.register_blueprint(login_bp)

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
    data = request.json
    waiting_list = load_waiting_list()
    
    # Assess severity using the CTAS scale
    symptoms = data.get('symptoms', [])
    triage_level = assess_severity(symptoms)
    
    # Calculate estimated wait time based on triage level
    base_wait_times = {
        1: 0,    # Immediate
        2: 15,   # Emergency (15 mins)
        3: 30,   # Urgent (30 mins)
        4: 60,   # Semi-urgent (1 hour)
        5: 120   # Non-urgent (2 hours)
    }
    
    new_patient = {
        "id": len(waiting_list["waiting_patients"]) + 1,
        "arrival_time": datetime.now().isoformat(),
        "symptoms": symptoms,
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