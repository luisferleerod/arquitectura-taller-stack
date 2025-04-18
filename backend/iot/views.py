# iot/views.py
from django.http import JsonResponse
from .models import Dispositivo, Lectura

def lista_dispositivos(request):
    dispositivos = Dispositivo.objects.all().values('id', 'nombre', 'tipo', 'ubicacion', 'estado')
    return JsonResponse(list(dispositivos), safe=False)

def lista_lecturas(request):
    lecturas = Lectura.objects.all().values('id', 'dispositivo__nombre', 'valor', 'timestamp')
    return JsonResponse(list(lecturas), safe=False)
