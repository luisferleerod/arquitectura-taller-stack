FROM python:3.10-slim
WORKDIR /app
COPY . /app/
RUN pip install --upgrade pip \
    && pip install -r requirements.txt \
    && pip install gunicorn

# Copiamos el script
COPY wait-for-cassandra.py /app/

# Entrypoint: espera a Cassandra y luego arranca Gunicorn
ENTRYPOINT ["python", "/app/wait-for-cassandra.py"]
EXPOSE 8000
