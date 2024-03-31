from app.photo import photo
from flask import request
from flask import current_app as app, make_response, jsonify, send_file
from flask_cors import cross_origin

from app.utils.vectara_corpus import get_answer_from_vectara


@cross_origin()
@photo.post("/api/text")
def answer_question():
    data = request.json["text"]
    response = {"output": get_answer_from_vectara(data)}
    return make_response(response)
