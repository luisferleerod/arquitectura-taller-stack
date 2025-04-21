# iot/views.py
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from iot.domain.models import Dispositivo, Lectura
import json
from django.views.decorators.http import require_http_methods
from uuid import uuid4

def lista_dispositivos(request):
    dispositivos = Dispositivo.objects.all().values('id', 'nombre', 'tipo', 'estado')
    return JsonResponse(list(dispositivos), safe=False)

def lista_lecturas(request):
    lecturas = Lectura.objects.all().values('id', 'dispositivo__nombre', 'valor', 'timestamp')
    return JsonResponse(list(lecturas), safe=False)

from django.http import JsonResponse
from iot.infrastructure.cassandra_connector import get_session
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

@csrf_exempt
def eliminar_dispositivo(request, dispositivo_id):
    if request.method == 'DELETE':
        session = get_session()
        query = f"DELETE FROM iot_dispositivo WHERE id = {dispositivo_id}"
        try:
            session.execute(query)
            return JsonResponse({'mensaje': 'Dispositivo eliminado correctamente'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Método no permitido'}, status=405)

@csrf_exempt
@require_http_methods(["POST"])
def agregar_dispositivo(request):
    try:
        print("BODY:", request.body)  
        data = json.loads(request.body)
        print("JSON DATA:", data) 

        nuevo_id = uuid4()
        nombre = data.get('nombre')
        tipo = data.get('tipo')
        estado = data.get('estado')

        session = get_session()
        query = f"""
            INSERT INTO iot_dispositivo (id, nombre, tipo, estado)
            VALUES ({nuevo_id}, '{nombre}', '{tipo}', '{estado}')
        """
        print("QUERY:", query)  
        session.execute(query)

        return JsonResponse({'mensaje': 'Dispositivo agregado correctamente', 'id': str(nuevo_id)}, status=201)

    except Exception as e:
        print("ERROR:", str(e))  
        return JsonResponse({'error': str(e)}, status=500)

    
@csrf_exempt
def actualizar_dispositivo(request, id):
    if request.method == 'PUT':
        session = get_session()
        data = json.loads(request.body)

        nombre = data.get('nombre')
        tipo = data.get('tipo')
        estado = data.get('estado')

        session.execute(
            """
            UPDATE iot_dispositivo
            SET nombre = %s, tipo = %s, estado = %s
            WHERE id = %s
            """,
            (nombre, tipo, estado, id)
        )

        return JsonResponse({'mensaje': 'Dispositivo actualizado correctamente'})
    
    return JsonResponse({'error': 'Método no permitido'}, status=405)

from django.http import JsonResponse
from iot.infrastructure.cassandra_connector import get_session
from datetime import datetime

def lista_lecturas(request):
    session = get_session()
    rows = session.execute("SELECT dispositivo_id, valor, timestamp FROM iot_lectura")
    lecturas = [
        {
            "dispositivo_id": str(row.dispositivo_id),
            "valor": float(row.valor),
            "timestamp": row.timestamp.isoformat()  # Convertir a string para JSON
        } for row in rows
    ]
    return JsonResponse(lecturas, safe=False)