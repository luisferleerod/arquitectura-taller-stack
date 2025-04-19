# iot/admin.py
from django.contrib import admin
from .models import Dispositivo, Lectura

admin.site.register(Dispositivo)
admin.site.register(Lectura)
