import os
import sys
import django
import paho.mqtt.client as mqtt
import json
from datetime import datetime
from iot.models import Lectura  # Asegúrate de que el modelo Lectura está importado correctamente

# Asegúrate de que el directorio principal de tu proyecto esté en el sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/..")

# Configura correctamente DJANGO_SETTINGS_MODULE
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")  # Apunta a backend.settings.py

# Inicializa Django
django.setup()

# Configuración del broker MQTT
MQTT_BROKER = "mqtt-broker"  # Nombre del servicio en Docker Compose
MQTT_PORT = 1883
MQTT_TOPICS = [
    "sensors/humidity",  # Topic de humedad
    "sensors/oxygen",    # Topic de oxígeno
    "sensors/temperature"  # Topic de temperatura
]

# Función que se ejecuta cuando se recibe un mensaje
def on_message(client, userdata, msg):
    try:
        payload = json.loads(msg.payload.decode())
        if msg.topic == "sensors/humidity":
            sensor_type = 'humedad'
            value = payload.get("humidity")
        elif msg.topic == "sensors/oxygen":
            sensor_type = 'oxigeno'
            value = payload.get("oxygen")
        elif msg.topic == "sensors/temperature":
            sensor_type = 'temperatura'
            value = payload.get("temperature")
        else:
            print(f"Unknown topic: {msg.topic}")
            return
        
        if value is not None:
            # Guardamos la lectura en Cassandra
            lectura = Lectura(tipo=sensor_type, valor=value, timestamp=datetime.now())
            lectura.save()
            print(f"Saved new {sensor_type} reading: {value}")
    except Exception as e:
        print(f"Error processing message: {e}")

# Función para conectar al broker MQTT
def on_connect(client, userdata, flags, rc):
    print(f"Connected with result code {rc}")
    # Suscribirse a todos los topics definidos
    for topic in MQTT_TOPICS:
        client.subscribe(topic)
        print(f"Subscribed to {topic}")

# Configurar el cliente MQTT
def setup_mqtt():
    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_message = on_message  # Llamar a on_message cuando se reciba un mensaje
    client.connect(MQTT_BROKER, MQTT_PORT, 60)
    return client

# Función principal
def main():
    client = setup_mqtt()
    client.loop_forever()  # Mantener la conexión abierta para recibir mensajes

if __name__ == "__main__":
    main()
