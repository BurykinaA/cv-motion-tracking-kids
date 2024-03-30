FROM python:3.10-alpine
WORKDIR /code
COPY requirements.txt requirements.txt
RUN apk add --no-cache gcc musl-dev linux-headers \
    && pip install -r requirements.txt \
    && apk del gcc musl-dev linux-headers
ENV FLASK_RUN_HOST=0.0.0.0
COPY . .
EXPOSE 5000
CMD ["flask", "run"]

