import os
import sys
import django
import paho.mqtt.client as mqtt
import json
from datetime import datetime

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # /app
sys.path.append(BASE_DIR)

# Configura correctamente DJANGO_SETTINGS_MODULE
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

# Inicializa Django
django.setup()

# Importa el modelo
from iot.models import Lectura

# Configuración del broker MQTT
MQTT_BROKER = "mqtt"  # Nombre del servicio en Docker Compose
MQTT_PORT = 1883
MQTT_TOPICS = [
    "sensors/humidity",  # Topic de humedad
    "sensors/oxygen",    # Topic de oxígeno
    "sensors/temperature"  # Topic de temperatura
]

# Función que se ejecuta cuando se recibe un mensaje
def on_message(client, userdata, msg):
    print(f"Mensaje recibido en el topic {msg.topic}: {msg.payload}")
    try:
        payload = json.loads(msg.payload.decode())
        print(f"Payload decodificado: {payload}")

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
            lectura = Lectura(tipo=sensor_type, valor=value, timestamp=datetime.now())
            lectura.save()
            print(f"Saved new {sensor_type} reading: {value}")
        else:
            print("Valor no encontrado en el payload")

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
