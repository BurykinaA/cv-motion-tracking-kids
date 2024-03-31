from app.photo import photo
from flask import request
from flask import current_app as app, make_response, jsonify, send_file
from flask_cors import cross_origin

import numpy as np
from PIL import Image
import base64
import io

from app.utils.detection import detect_and_correct_errors


@cross_origin()
@photo.post("/api/photo")
def make_correction():
    data = request.json
    
    #print(data)  # Теперь ожидаем список JSON объектов
    photos = []

    image_bytes = base64.b64decode(data["userVideo"])
    image_io = io.BytesIO(image_bytes)
    image = Image.open(image_io)
    numpy_array = np.array(image)

    photos.append(numpy_array)

    image_bytes = base64.b64decode(data["originalVideo"])
    image_io = io.BytesIO(image_bytes)
    image = Image.open(image_io)
    numpy_array = np.array(image)

    photos.append(numpy_array)

    #errors = detect_and_correct_errors(photos[0], photos[1])

    response = {"Frame_Error": "",
                "Step": 'CORRECT STEP',
                "Cumulative_Accuracy": '98%'}
    return make_response(response)
