FROM python:3.10.7-slim
WORKDIR /code
COPY requirements.txt requirements.txt
RUN apt-get update && apt-get install -y gcc libgl1-mesa-dev libglib2.0-0\
    && pip install -r requirements.txt \
    && apt-get remove -y gcc \
    && apt-get autoremove -y \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
ENV FLASK_RUN_HOST=0.0.0.0
COPY . .
EXPOSE 5000
CMD ["flask", "run"]
