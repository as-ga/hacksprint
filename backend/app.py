from flask import Flask, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS

# import os
# from dotenv import load_dotenv
# load_dotenv()

def create_app():
    app = Flask(__name__)
    cors = CORS()
    cors.init_app(app)
    # app.config['MONGO_URI'] = os.getenv('MONGO_URI')
    app.config['MONGO_URI'] = 'mongodb+srv://GauravEcom:gaurav123@gauravpython.nrffryg.mongodb.net'
    mongo = PyMongo(app)

    @app.route('/')
    def index():
        return jsonify({"message": "Welcome to the Flask API!"})

    return app



myapp = create_app()

if __name__ == '__main__':
    myapp.run(debug=True)