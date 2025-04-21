# arquitectura-taller-stack
Maria Andrea Mendez, Juan David Castillo, Luis Fernando Lee

# Inicialización: 
- Como no se logro hacer un dockercompose para inicializar la base de dato con las tablas correspondientes, se propuso lo siguiente:
- Para ejecutar, posicionese en la carpeta arquitectura-taller-stack y ejecute el siguiente comando
docker-compose down
docker compose up -d cassandra

#(si se estanca, espere unos segundos y luego opima ctrl + c y luego docker-compose start cassandra_db)

- utilice el siguiente comando para verificar el estado de la base de datos
docker-compose ps
- espere unos segundos hasta que el estado de la base de datos sea healthy

- copie el documento local al docker
docker cp ./cassandra/init-db.cql cassandra_db:/tmp/init-db.cql
- luego ejecute:
docker exec -it cassandra_db cqlsh -f /tmp/init-db.cql

- posteriormente ejecute :
docker-compose up -d --build

- Finalmente despues de unos segundos en el buscador coloque http://localhost:3000/ y espere a que le salgan los tres contenedores iniciales
- (En caso de ir al apartado de lecturas y no ver mediciones aun ya habiendo visto los sensores en la web, ejecute este comando:
docker exec -it django_backend python iot/mqtt_client.py)

- Con eso ya puede hacer crud de sensores, y ver los valores que sacan los sensores