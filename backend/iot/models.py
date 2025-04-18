# iot/models.py
from django.db import models

class Dispositivo(models.Model):
    nombre = models.CharField(max_length=100)
    tipo = models.CharField(max_length=100)  # sensor, actuador, etc.
    ubicacion = models.CharField(max_length=100)
    estado = models.BooleanField(default=True)  # True: activo, False: inactivo

    def __str__(self):
        return self.nombre

class Lectura(models.Model):
    dispositivo = models.ForeignKey(Dispositivo, related_name='lecturas', on_delete=models.CASCADE)
    valor = models.FloatField()  # Temperatura, humedad, voltaje, etc.
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Lectura de {self.dispositivo.nombre} en {self.timestamp}"
