# iot/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DispositivoViewSet, LecturaViewSet

router = DefaultRouter()
router.register(r'dispositivos', DispositivoViewSet)
router.register(r'lecturas', LecturaViewSet)

urlpatterns = [
    path('api/', include(router.urls)),  # Exponer las rutas de la API
]
