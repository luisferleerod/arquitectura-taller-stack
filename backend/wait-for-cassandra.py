# backend/wait-for-cassandra.py
import os, time, sys
from cassandra.cluster import Cluster, NoHostAvailable

host = os.getenv("CASSANDRA_HOST", "cassandra")
port = int(os.getenv("CASSANDRA_PORT", 9042))

print(f"→ Esperando a Cassandra en {host}:{port} …")
while True:
    try:
        Cluster([host], port=port).connect()
        print("✔ Cassandra lista.")
        break
    except NoHostAvailable:
        time.sleep(5)

# Una vez lista, reemplaza este proceso por gunicorn
os.execvp("gunicorn", ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"])
