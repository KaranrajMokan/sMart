#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Sep 25 19:20:53 2021

@author: karanrajmokan
"""

from flask import Flask, Response

app = Flask(__name__)


@app.route("/api")
def index():
    message = "Hola"
    return Response(message, mimetype="application/json", status=200)

if __name__ == "__main__":
    app.run(debug=True, port=5000)