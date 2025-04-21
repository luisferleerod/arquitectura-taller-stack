from django.db import models

class Dispositivo(models.Model):
    nombre = models.CharField(max_length=100)
    tipo = models.CharField(max_length=50)
    ubicacion = models.CharField(max_length=100)
    
    def __str__(self):
        return self.nombre

class Lectura(models.Model):
    SENSOR_CHOICES = [
        ('temperatura', 'Temperatura'),
        ('humedad', 'Humedad'),
        ('oxigeno', 'Oxígeno'),
    ]

    tipo = models.CharField(max_length=20, choices=SENSOR_CHOICES, default='temperatura')  # Default value added
    valor = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)
    dispositivo = models.ForeignKey(Dispositivo, related_name='lecturas', on_delete=models.CASCADE)  # Relación con Dispositivo

    def __str__(self):
        return f"{self.tipo} - {self.valor} @ {self.timestamp}"
