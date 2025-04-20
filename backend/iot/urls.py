from django.urls import path
from .views import lista_dispositivos

urlpatterns = [
    path('lista-dispositivos/', lista_dispositivos),
]
