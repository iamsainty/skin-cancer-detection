from flask import Flask, request, jsonify
from flask_cors import CORS
from utils import predict

app = Flask(__name__)
CORS(app)  # allow frontend requests

@app.route('/predict', methods=['POST'])
def predict_route():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    image = request.files['image']
    prediction = predict(image)

    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)
