# iot/serializers.py

from rest_framework import serializers
from .models import Dispositivo, Lectura

class DispositivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dispositivo
        fields = ['id', 'nombre', 'tipo', 'ubicacion', 'estado']

class LecturaSerializer(serializers.ModelSerializer):
    dispositivo = DispositivoSerializer()  # Incluye detalles del dispositivo

    class Meta:
        model = Lectura
        fields = ['id', 'dispositivo', 'valor', 'fecha']
