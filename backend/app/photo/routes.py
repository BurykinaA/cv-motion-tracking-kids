from app.photo import photo
from flask import request
import requests
from flask import current_app as app, make_response, jsonify, send_file
from flask_cors import cross_origin


@cross_origin()
@photo.get("/api/photo")
def make_correction():
    # data_list = request
    # print(data_list)
    return make_response("dddd")

