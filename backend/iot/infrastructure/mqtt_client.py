import os
import sys
import django
import paho.mqtt.client as mqtt
import json
from datetime import datetime
from uuid import uuid4

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(BASE_DIR)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from iot.domain.models import Lectura
from iot.infrastructure.cassandra_connector import get_session

MQTT_BROKER = "mqtt"
MQTT_PORT = 1883
MQTT_TOPICS = [
    "sensors/humidity",
    "sensors/oxygen",
    "sensors/temperature"
]

def get_dispositivo_id(sensor_type):
    session = get_session()
    query = "SELECT id FROM iot_dispositivo WHERE tipo = %s LIMIT 1"
    row = session.execute(query, [sensor_type]).one()
    return row.id if row else None

def on_message(client, userdata, msg):
    print(f"Mensaje recibido en el topic {msg.topic}: {msg.payload}")
    try:
        payload = json.loads(msg.payload.decode())
        print(f"Payload decodificado: {payload}")

        if msg.topic == "sensors/humidity":
            sensor_type = 'Humedad'
            value = payload.get("humidity")
        elif msg.topic == "sensors/oxygen":
            sensor_type = 'Oxigeno'
            value = payload.get("oxygen")
        elif msg.topic == "sensors/temperature":
            sensor_type = 'Temperatura'
            value = payload.get("temperature")
        else:
            print(f"Unknown topic: {msg.topic}")
            return

        if value is not None:
            dispositivo_id = get_dispositivo_id(sensor_type)
            if not dispositivo_id:
                print(f"No se encontró dispositivo para el tipo {sensor_type}")
                return

            session = get_session()
            query = """
                INSERT INTO iot_lectura (dispositivo_id, valor, timestamp)
                VALUES (%s, %s, %s)
            """
            session.execute(query, (dispositivo_id, float(value), datetime.now()))
            print(f"Saved new {sensor_type} reading: {value} for dispositivo_id: {dispositivo_id}")
        else:
            print("Valor no encontrado en el payload")

    except Exception as e:
        print(f"Error processing message: {e}")

def on_connect(client, userdata, flags, rc, reason_code=None):
    print(f"Connected with result code {rc}")
    for topic in MQTT_TOPICS:
        client.subscribe(topic)
        print(f"Subscribed to {topic}")

def setup_mqtt():
    client = mqtt.Client(callback_api_version=mqtt.CallbackAPIVersion.VERSION2)
    client.on_connect = on_connect
    client.on_message = on_message
    client.connect(MQTT_BROKER, MQTT_PORT, 60)
    return client

def main():
    client = setup_mqtt()
    client.loop_forever()

if __name__ == "__main__":
    main()