import time
import random
import json
import paho.mqtt.client as mqtt

# ahora le pedimos explícitamente la v2 del API de callbacks
client = mqtt.Client(callback_api_version=mqtt.CallbackAPIVersion.VERSION2)

def on_connect(client, userdata, flags, rc):
    print(f"Connected with result code {rc}")

client.on_connect = on_connect

def setup_mqtt():
    client.connect("mqtt", 1883, 60)
    return client

def main():
    client = setup_mqtt()
    while True:
        oxygen = round(random.uniform(18.0, 21.0), 2)
        msg = json.dumps({"oxygen": oxygen})
        client.publish("sensors/oxygen", msg)
        print(f"Published data: {msg}")
        time.sleep(5)

if __name__ == "__main__":
    main()
