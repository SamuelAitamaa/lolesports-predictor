import os
from flask import Flask, render_template, request
from flask_cors import CORS, cross_origin
from flask.helpers import send_from_directory
from classifier import predict
import time
import sys


app = Flask(__name__, static_folder='frontend/build',static_url_path='')
cors = CORS(app)

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/api', methods = ['POST'])
@cross_origin()
def get_query_from_react():
    data = request.get_json()
    result = predict(data.get("team1"), data.get("team2"), data.get("region"))
    sys.stdout.flush()
    return result

if __name__=='__main__': 
	app.run()