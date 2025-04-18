import paho.mqtt.client as mqtt
import time
import random
import json

client = mqtt.Client()
client.connect("mosquitto", 1883, 60)

while True:
    payload = {
        "sensor": "humedad",
        "value": round(random.uniform(40.0, 70.0), 2)
    }
    client.publish("sensors/humedad", json.dumps(payload))
    print("Enviado:", payload)
    time.sleep(5)
