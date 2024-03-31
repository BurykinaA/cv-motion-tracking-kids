FROM python:3.10-slim
WORKDIR /code
COPY requirements.txt .
RUN apt-get update && apt-get install -y gcc libgl1-mesa-dev \
    && pip install -r requirements.txt \
    && apt-get remove -y gcc \
    && apt-get autoremove -y \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_APP=app.py
COPY . .
EXPOSE 5000
CMD ["flask", "run"]
