import os
from flask import Flask, render_template, request
from reverseProxy import proxyRequest
from classifier import predict
import time
import sys


MODE = os.getenv('FLASK_ENV')
DEV_SERVER_URL = 'https://lolesports-predictor.herokuapp.com/'

app = Flask(__name__)

# Ignore static folder in development mode.
if MODE == "development":
    app = Flask(__name__, static_folder=None)

@app.route('/')
@app.route('/<path:path>')
def index(path=''):
    if MODE == 'development':
        return proxyRequest(DEV_SERVER_URL, path)
    else:
        return render_template("index.html")

@app.route('/', methods = ['POST'])
def get_query_from_react():
    data = request.get_json()
    result = predict(data.get("team1"), data.get("team2"), data.get("region"))
    sys.stdout.flush()
    return result