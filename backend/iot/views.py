# iot/views.py
from django.http import JsonResponse
from .models import Dispositivo, Lectura

def lista_dispositivos(request):
    dispositivos = Dispositivo.objects.all().values('id', 'nombre', 'tipo', 'estado')
    return JsonResponse(list(dispositivos), safe=False)

def lista_lecturas(request):
    lecturas = Lectura.objects.all().values('id', 'dispositivo__nombre', 'valor', 'timestamp')
    return JsonResponse(list(lecturas), safe=False)

from django.http import JsonResponse
from .cassandra_connector import get_session  # ✅ Import correcto

def lista_dispositivos(request):
    session = get_session()
    rows = session.execute("SELECT id, nombre, tipo, estado FROM iot_dispositivo")
    dispositivos = [
        {
            "id": str(row.id),
            "nombre": row.nombre,
            "tipo": row.tipo,
            "estado": row.estado
        } for row in rows
    ]
    return JsonResponse(dispositivos, safe=False)
