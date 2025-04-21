from django.urls import path
from .views import lista_dispositivos, eliminar_dispositivo, actualizar_dispositivo, agregar_dispositivo

urlpatterns = [
    path('lista-dispositivos/', lista_dispositivos),
     path('eliminar-dispositivo/<uuid:dispositivo_id>/', eliminar_dispositivo, name='eliminar_dispositivo'),
     path('actualizar-dispositivo/<uuid:id>/', actualizar_dispositivo),
    path('agregar-dispositivo/', agregar_dispositivo, name='agregar_dispositivo'),
]
