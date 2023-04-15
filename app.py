from flask import Flask, render_template, request, jsonify
from datetime import datetime
import os
import base64
import cv2

app = Flask(__name__)

# Initialize the camera
camera = cv2.VideoCapture(0)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/capture', methods=['POST'])
def capture():
    # Get the label from the form data
    label = request.form['label']

    # Get the current date and time
    now = datetime.now()
    date_time = now.strftime("%m-%d-%Y_%H-%M-%S")

    # Capture an image from the camera
    ret, frame = camera.read()

    # Save the image to the local file system
    image_name = f"{date_time}_{label}.png"
    cv2.imwrite(f"static/images/{image_name}", frame)

    # Encode the image to base64 format for display in HTML
    with open(f"static/images/{image_name}", "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')

    return jsonify({'image': encoded_string})
