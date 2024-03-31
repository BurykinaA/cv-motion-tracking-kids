from app.photo import photo
from flask import request
from flask import current_app as app, jsonify, send_from_directory, abort
from flask_cors import cross_origin
import os

VIDEO_FOLDER = "videos"


@cross_origin()
@photo.get("/api/video")
def list_videos():
    videos = os.listdir(VIDEO_FOLDER)
    return jsonify(videos)

@cross_origin()
@photo.get("/api/video/<path:filename>")
def get_video(filename):
    filepath = os.path.join(VIDEO_FOLDER, filename)
    print(filepath)
    if not os.path.exists(filepath):
        print(f"Файл не найден: {filepath}")
        abort(404)  # Файл не найден
    return send_from_directory(r'D:\burningheroes\backend\videos', filename, as_attachment=True)
