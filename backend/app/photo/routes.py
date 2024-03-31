from app.photo import photo
from flask import request
from flask import current_app as app, make_response, jsonify, send_file
from flask_cors import cross_origin

import numpy as np
from PIL import Image
import base64
import io
import cv2

from app.utils.detection import get_poses


@cross_origin()
@photo.post("/api/photo")
def make_correction():
    data = request.json

    # print(data)  # Теперь ожидаем список JSON объектов
    photos = []

    image_bytes = base64.b64decode(data["userVideo"])
    image_io = io.BytesIO(image_bytes)
    image = Image.open(image_io)
    numpy_array = np.array(image)
    image_cv = cv2.cvtColor(numpy_array, cv2.COLOR_RGB2BGR)

    photos.append(image_cv)

    image_bytes = base64.b64decode(data["originalVideo"])
    image_io = io.BytesIO(image_bytes)
    image = Image.open(image_io)
    numpy_array = np.array(image)
    image_cv = cv2.cvtColor(numpy_array, cv2.COLOR_RGB2BGR)

    photos.append(image_cv)

    errors = get_poses(photos[0], photos[1])

    response = {"Frame_Error": errors['Frame_Error'], 
                "Step": errors['Step'], 
                "Cumulative_Accuracy": errors['Cumulative_Accuracy']}
    
    return make_response(response)
