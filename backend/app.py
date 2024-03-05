from app import app
from flask_cors import CORS, cross_origin

CORS(app, support_credentials=True)

if __name__ == "__main__":
    app.run(debug=True)