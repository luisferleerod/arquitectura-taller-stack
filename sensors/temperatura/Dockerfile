FROM python:3.9-slim

WORKDIR /app
COPY sensor.py .

RUN pip install paho-mqtt

CMD ["python", "sensor.py"]
