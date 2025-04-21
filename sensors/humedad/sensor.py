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

def generate_humidity():
    return round(random.uniform(30.0, 90.0), 2)

def main():
    client = setup_mqtt()
    while True:
        humidity = generate_humidity()
        msg = json.dumps({"humidity": humidity})
        client.publish("sensors/humidity", msg)
        print(f"Published data: {msg}")
        time.sleep(5)

if __name__ == "__main__":
    main()