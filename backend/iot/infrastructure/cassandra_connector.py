# iot/cassandra_connector.py
from cassandra.cluster import Cluster

def get_session():
    try:
        print("Intentando conectar a Cassandra...")
        cluster = Cluster(['cassandra'], port=9042)
        session = cluster.connect('sensores_app')
        print("Conexión exitosa a Cassandra!")
        return session
    except Exception as e:
        print("Error al conectar con Cassandra:", e)
        raise