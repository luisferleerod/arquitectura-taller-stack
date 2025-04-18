import paho.mqtt.client as mqtt
import time
import random
import json

client = mqtt.Client()
client.connect("mosquitto", 1883, 60)

while True:
    payload = {
        "sensor": "oxigeno",
        "value": round(random.uniform(90.0, 100.0), 2)
    }
    client.publish("sensors/oxigeno", json.dumps(payload))
    print("Enviado:", payload)
    time.sleep(5)
