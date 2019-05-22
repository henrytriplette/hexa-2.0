import sys
import time
import json
import argparse

from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

parser = argparse.ArgumentParser()
parser.add_argument('--port', default=5000, type=float,
                    help='Set the server port number.')

args = parser.parse_args()

# Start Flask App
app = Flask(__name__, static_url_path='') #, static_folder='public', )
CORS(app)

@app.route('/')
def index():
    return "Hello, Hexa! Server is up"

@app.route('/sample', methods=['POST'])
def get_random():
    try:
        num = int(request.form['num'])
        print('Random', num)

        response = jsonify([
            [num]
        ])
        return response
    except Exception as e:
        print(e)
        return '', 500

if __name__ == '__main__':

    # port = int(sys.argv[1]) if len(sys.argv) > 1 else 5000
    port = args.port
    print('port=', port)
    app.run(host='0.0.0.0', debug=True, port=port)
