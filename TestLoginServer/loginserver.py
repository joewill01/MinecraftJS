from flask import Flask, jsonify, request, make_response
import jwt
import json
import datetime
from functools import wraps

app = Flask(__name__)
app.config["SECRET_KEY"] = '\x9f\xeaxN\x93\x0f\xca\xd8o\x04\xa01\xff7\xce\xcb\x1e\xd15p\xe5\xc6\xd0\x83'

def get_users():
        with open("users.txt","r") as f:
                return json.loads(f.read())

def token_required(f):
	@wraps(f)
	def decorated(*args, **kwargs):
		token = request.headers.get("x-access-token")

		if not token:
			return jsonify({"message":"Token is missing"}), 403

		try:
			data = jwt.decode(token, app.config["SECRET_KEY"])
		except:
			return jsonify({"message":"Token is invalid"}), 403

		return f(data["user"], *args, **kwargs)
	return decorated

@app.route("/register")
def register():
        return ""

@app.route("/login")
def login():
        auth = request.authorization

        users = get_users()
        valid_user = [user for user in users if user["email"] == auth.username]
        if valid_user == []:
                return make_response("Could not verify", 401, {"WWW.Authenticate" : "Basic realm='Login Required'"})
        valid_user = valid_user[0]

        if valid_user["password"] == auth.password:
                del valid_user["password"]
                token = jwt.encode({"user": valid_user, "exp": datetime.datetime.utcnow() + datetime.timedelta(days=7)}, app.config["SECRET_KEY"])

                return jsonify({"token": token.decode("UTF-8")})

        return make_response("Could not verify", 401, {"WWW.Authenticate" : "Basic realm='Login Required'"})

@app.route("/get_user_info")
@token_required
def protected(current_user):
        print(current_user)
        return jsonify({"message":"good token"})

if __name__ == "__main__":
    app.run(debug=True)
