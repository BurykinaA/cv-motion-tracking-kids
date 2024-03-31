from flask import Blueprint

text = Blueprint("text", __name__)

from app.text import routes
