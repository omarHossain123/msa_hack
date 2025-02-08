from flask import Blueprint, request, jsonify, create_access_token




auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['POST'])
def login():
    data = request.json
    if data['username'] == 'admin' and data['password'] == 'password':
        token1 = jwt.encode({'user': data['username']}, 'secret', algorithm='HS256')
        token = create_access_token(identity=data['username'])
        
        return jsonify(access_token=token)
    return jsonify({"error": "Invalid credentials"}), 401
