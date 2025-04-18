import os
import sys
import django
import paho.mqtt.client as mqtt
from iot.models import Lectura  # Importas el modelo Lectura

# Asegúrate de que el directorio principal de tu proyecto esté en el sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)) + "/..")

# Configura correctamente DJANGO_SETTINGS_MODULE
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

# Inicializa Django
django.setup()

# Configura las credenciales y parámetros de la conexión MQTT
class MqttClient:
    def __init__(self, broker_host='localhost', broker_port=1883, topic='iot/lectura'):
        self.client = mqtt.Client()
        self.broker_host = broker_host
        self.broker_port = broker_port
        self.topic = topic

    def on_connect(self, client, userdata, flags, rc):
        print(f"Conectado con el código {rc}")
        # Una vez conectado, se suscribe al tema
        self.client.subscribe(self.topic)

    def on_message(self, client, userdata, message):
        # Este callback se ejecutará cuando un mensaje sea recibido
        print(f"Mensaje recibido: {message.payload.decode()}")
        
        # Aquí se puede agregar el código para guardar la lectura en la base de datos
        tipo_lectura = message.payload.decode().split(":")[0]  # Ejemplo de cómo obtener tipo
        valor_lectura = float(message.payload.decode().split(":")[1])  # Ejemplo de cómo obtener el valor
        
        # Crear una nueva instancia de Lectura y guardarla
        lectura = Lectura(tipo=tipo_lectura, valor=valor_lectura)
        lectura.save()

    def connect(self):
        self.client.on_connect = self.on_connect
        self.client.on_message = self.on_message

        # Conectar al broker MQTT
        self.client.connect(self.broker_host, self.broker_port, 60)

    def listen(self):
        # Mantiene la conexión abierta y procesa los mensajes
        self.client.loop_forever()
