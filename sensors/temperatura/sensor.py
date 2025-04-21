import time
import random
import json
import paho.mqtt.client as mqtt

client = mqtt.Client(callback_api_version=mqtt.CallbackAPIVersion.VERSION2)

def on_connect(client, userdata, flags, rc):
    print(f"Connected with result code {rc}")

client.on_connect = on_connect

def setup_mqtt():
    client.connect("mqtt", 1883, 60)
    return client

def generate_temperature():
    return round(random.uniform(15.0, 30.0), 2)

def main():
    client = setup_mqtt()
    while True:
        temperature = generate_temperature()
        msg = json.dumps({"temperature": temperature})
        client.publish("sensors/temperature", msg)
        print(f"Published data: {msg}")
        time.sleep(5)

if __name__ == "__main__":
    main()