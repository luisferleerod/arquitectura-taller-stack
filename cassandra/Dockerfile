# Usa la imagen oficial de Cassandra
FROM cassandra:latest

# Expon el puerto de Cassandra
EXPOSE 9042

# Copiar el script de inicialización al contenedor
COPY init-db.cql /docker-entrypoint-initdb.d/

# Comando de inicio de Cassandra
CMD ["cassandra", "-f"]
