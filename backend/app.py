import datetime
import os
 
from flask import Flask, Response
from flask_mongoengine import MongoEngine

app = Flask(__name__)


@app.route("/api")
def index():
    todos = "Hello bitches"
    return Response(todos, mimetype="application/json", status=200)

if __name__ == "__main__":
    app.run(debug=True, port=5000)