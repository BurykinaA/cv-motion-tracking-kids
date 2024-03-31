from app.photo import photo
from flask import request
from flask import current_app as app, make_response, jsonify, send_file
from flask_cors import cross_origin


@cross_origin()
@photo.post("/api/text")
def answer_question():
    data = request  # Теперь ожидаем список JSON объектов
    print(data)
    
    response = {"output": data}
    return make_response(response)
