from app.photo import photo
from flask import request
from flask import current_app as app, jsonify, send_from_directory
from flask_cors import cross_origin
import os

VIDEO_FOLDER = "backend/videos"


@cross_origin()
@photo.get("/api/video")
def list_videos():
    videos = os.listdir(VIDEO_FOLDER)
    return jsonify(videos)


@cross_origin()
@photo.get("/api/video/<filename>")
def get_video(filename):
    return send_from_directory(VIDEO_FOLDER, filename)
