from flask import Flask, request, jsonify
from flask_cors import CORS
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

@app.route("/")
def home():
    return jsonify({"message": "Backend is running!"})

if __name__ == "__main__":
    app.run(debug=True)