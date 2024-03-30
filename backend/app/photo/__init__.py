from flask import Blueprint

photo = Blueprint("photo", __name__)

from app.photo import routes
