import os
from flask import Flask
app = Flask(__name__)
from flask_cors import CORS, cross_origin

CORS(app, support_credentials=True)
from app import views