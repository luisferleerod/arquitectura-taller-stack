import paho.mqtt.client as mqtt
import time
import random
import json

client = mqtt.Client()
client.connect("mosquitto", 1883, 60)

while True:
    payload = {
        "sensor": "temperatura",
        "value": round(random.uniform(20.0, 30.0), 2)
    }
    client.publish("sensors/temperatura", json.dumps(payload))
    print("Enviado:", payload)
    time.sleep(5)
