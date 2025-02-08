from flask import Blueprint, request, jsonify, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required
import datetime

login_bp = Blueprint("login_bp", __name__)

db = SQLAlchemy()
login_manager = LoginManager()

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(250), unique=True, nullable=False)
    password = db.Column(db.String(250), nullable=False)

class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(250), nullable=False)
    last_name = db.Column(db.String(250), nullable=False)
    phone = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String(500))
    dob = db.Column(db.Date, nullable=False)
    height = db.Column(db.Float, nullable=False)
    weight = db.Column(db.Float, nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    symptoms = db.Column(db.Text)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@login_bp.route("/register_user", methods=["POST"])
def register_user():
    data = request.json
    new_user = User(username=data["username"], password=data["password"])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered."}), 201

@login_bp.route("/login_user", methods=["POST"])
def login_user_route():
    data = request.json
    user = User.query.filter_by(username=data["username"]).first()
    if user and user.password == data["password"]:
        login_user(user)
        return jsonify({"message": "Logged in."}), 200
    return jsonify({"error": "Invalid credentials"}), 401

@login_bp.route("/logout_user", methods=["POST"])
@login_required
def logout_user_route():
    logout_user()
    return jsonify({"message": "Logged out."}), 200

@login_bp.route("/add_patient", methods=["POST"])
@login_required
def add_patient():
    data = request.json
    try:
        new_patient = Patient(
            first_name=data["first_name"],
            last_name=data["last_name"],
            phone=data["phone"],
            address=data.get("address", ""),
            dob=datetime.datetime.strptime(data["dob"], '%Y-%m-%d').date(),
            height=float(data["height"]),
            weight=float(data["weight"]),
            gender=data["gender"],
            age=int(data["age"]),
            symptoms=data["symptoms"],
        )
        db.session.add(new_patient)
        db.session.commit()
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    return jsonify({"message": "Patient added."}), 201