from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Dispositivo, Lectura
from .serializers import DispositivoSerializer, LecturaSerializer

# ViewSet para manejar dispositivos
class DispositivoViewSet(viewsets.ModelViewSet):
    queryset = Dispositivo.objects.all()
    serializer_class = DispositivoSerializer

# ViewSet para manejar lecturas
class LecturaViewSet(viewsets.ModelViewSet):
    queryset = Lectura.objects.all()
    serializer_class = LecturaSerializer