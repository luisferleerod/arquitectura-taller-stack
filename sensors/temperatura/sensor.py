import time
import random
import paho.mqtt.client as mqtt
import json

# Configuración del broker MQTT
MQTT_BROKER = "mqtt-broker"  # Nombre del servicio en Docker Compose
MQTT_PORT = 1883
MQTT_TOPIC = "sensors/temperature"  # Topic donde los datos de temperatura serán publicados

# Generar un valor de temperatura simulado
def generate_temperature():
    return round(random.uniform(15.0, 30.0), 2)

# Función para conectar al broker MQTT
def on_connect(client, userdata, flags, rc):
    print(f"Connected with result code {rc}")

def setup_mqtt():
    client = mqtt.Client()
    client.on_connect = on_connect
    client.connect(MQTT_BROKER, MQTT_PORT, 60)
    return client

# Función principal
def main():
    client = setup_mqtt()

    while True:
        temperature = generate_temperature()
        data_message = {
            "temperature": temperature
        }

        # Publicar los datos en el topic MQTT
        client.publish(MQTT_TOPIC, json.dumps(data_message))

        print(f"Published data: {data_message}")

        time.sleep(5)  # Esperar 5 segundos antes de enviar más datos

if __name__ == "__main__":
    main()
