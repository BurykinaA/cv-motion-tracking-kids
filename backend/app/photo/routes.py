from app.photo import photo
from flask import request
from flask import current_app as app, make_response, jsonify, send_file
from flask_cors import cross_origin

import numpy as np
from PIL import Image
import base64
import io
import cv2

from app.utils.detection import get_poses, get_picture_dtw



@cross_origin()
@photo.post("/api/photo")
def make_correction():
    try:
        data = request.json

        photos = []

        # Обработка userVideo
        image_bytes = base64.b64decode(data["userVideo"])
        image_io = io.BytesIO(image_bytes)
        image = Image.open(image_io)
        numpy_array = np.array(image)
        image_cv = cv2.cvtColor(numpy_array, cv2.COLOR_RGB2BGR)
        photos.append(image_cv)

        # Обработка originalVideo
        image_bytes = base64.b64decode(data["originalVideo"])
        image_io = io.BytesIO(image_bytes)
        image = Image.open(image_io)
        numpy_array = np.array(image)
        image_cv = cv2.cvtColor(numpy_array, cv2.COLOR_RGB2BGR)
        photos.append(image_cv)

        errors = get_poses(photos[0], photos[1])

        response = {
            "Frame_Error": errors["Frame_Error"],
            "Step": errors["Step"],
            "Cumulative_Accuracy": errors["Cumulative_Accuracy"],
        }

        return make_response(response, 200)

    except Exception as e:
        # В этом случае можно логировать e для отладки или будущих улучшений
        print(e)  # Логирование ошибки, в реальном приложении можно использовать logging
        return make_response(jsonify({"error": "no_body"}), 500)



@cross_origin()
@photo.get("/api/photo/graph")
def get_graph():
    a, b = get_picture_dtw()
    ans = {'dtw': a,
           'dtw_total_distance': b}
    return make_response(ans)
