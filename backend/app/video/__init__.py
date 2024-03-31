from flask import Blueprint

video = Blueprint("video", __name__)

from app.video import routes
