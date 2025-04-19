# iot/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('dispositivos/', views.lista_dispositivos, name='lista_dispositivos'),
    path('lecturas/', views.lista_lecturas, name='lista_lecturas'),
]
