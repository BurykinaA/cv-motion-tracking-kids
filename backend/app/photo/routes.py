from app.photo import photo
from flask import request
from flask import current_app as app, make_response, jsonify, send_file
from flask_cors import cross_origin

import numpy as np
from PIL import Image
import base64
import io

from backend.app.utils.detection import detect_and_correct_errors


@cross_origin()
@photo.post("/api/photo")
def make_correction():
    data_list = request.json  # Теперь ожидаем список JSON объектов
    photos = []

    for data in data_list:
        image_bytes = base64.b64decode(data["photo"])
        image_io = io.BytesIO(image_bytes)
        image = Image.open(image_io)
        numpy_array = np.array(image)

        photos.append(numpy_array)

    errors = detect_and_correct_errors(photos[0], photos[1])

    response = {"frame": "".join(errors)}
    return make_response(response)
