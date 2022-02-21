# Curso de Docker de Platzi

Notas del curso de Docker de Platzi.

## Instalar Docker

[Guía de instalación para Linux](https://docs.docker.com/engine/install/ubuntu/)

### Version

```bash
docker --version
sudo docker info
```

## Primeros pasos: hola mundo

```sh
docker run hello-world
```

`docker run` crea y corre un contenedor.

## Algunos comandos

### Ver contenedores corriendo

```sh
docker ps
```

### Ver todos los contenedores vivos

```sh
docker ps -a
```

### Ver detalles de un contenedro

```bash
docker inspect CONTAINDER_ID
```

### Asignar un nombre a un contenedor

```sh
docker run --name NAME IMAGE
```

```sh
docker rename CONTAINER_NAME NEW_CONTAINER_NAME
```

No se pueden repetir nombres de los contenedores.

### Borrar contenedores

```bash
docker rm CONTAINER_NAME
docker rm CONTAINER_ID
```

Atajo para borrar todos los contenedores parados

```bash
docker container prune
```

### Modo interactivo

```bash
docker run -it ubuntu
```

- `-i` interactivo
- `-t` abre la terminal

Cuando salimos de bash, el contenedor se cierra.

Podemos correr el contenedor de ubuntu de forma que no se cierre con el siguiente comando:

```bash
docker run --name alwaysup -d ubuntu tail -f /dev/null
```

Podemos ejecutar un comando o un proceso en un contenedor que está corriendo con:

```bash
docker exec -it CONTAINER_NAME COMMAND
```

Ejemplo

```bash
docker exec -it alwaysup bash
ps -aux
```

Para poder parar este contenedor, podemos encontar el process id en el sistema host con:

```bash
docker inspect --format '{{.State.Pid}}' CONTAINER_NAME
docker inspect --format '{{.State.Pid}}' alwaysup
```

Y podemos matar el proceso con

```bash
kill -9 PID
```

O bien con:

```bash
docker stop CONTAINER_NAME
```

### ver logs

```bash
docker logs CONTAINER_NAME
docker logs -f CONTAINER_NAME
docker logs --tail 10 -f CONTAINER_NAME
```

## Exponer un contenedor

```bash
sudo docker run -d --name proxy -p HOST_PORT:CONTAINER_PORT nginx
```

## Persistencia de datos

```bash
docker run -d --name db mongo
docker exec -it db bash
```

### Bind mounts

```bash
docker run -d --name db -v DIRECTORY:/data/db mongo
docker exec -it db bash
mongo
> use platzi
> db.users.insert({"name": "Fredy"})
```

### Volumes

Mostar volumenes creados

```bash
docker volume ls
```

```bash
docker run -d --name db --mount src=dbdata,dst=/data/db mongo
docker exec -it db bash
```

### Copiar archivos loca - Contenedor

```bash
docker cp LOCAL_FILE_DIR CONTAINER_NAME:CONTAINER_FILE_DIR
docker cp CONTAINER_NAME:CONTAINER_FILE_DIR LOCAL_FILE_DIR
```

## Imagenes

```bash
docker images
```

Para crear una imagen creamos un archivo llamado `Dockerfile`.

```docker
FROM ubuntu:latest

RUN touch /usr/src/hola-platzi.txt
```

- Con `FROM` indicamos la imagen base.

- Con `RUN` añadimos instrucciones que se correrán durante la construcción de la imagen

- Con `COPY ["HOST_DIR", "CONTAINER_DIR"]` podemos copiar archivos a la imagen.
- Con `WORKDIR CONTAINER_DIR` cambiamos el directorio de trabajo
- Con `EXPOSE PORT` exponemos un puerto del contenedor.
- Con `CMD ["COMANDS"]` indicamos el comando que se ejecutará cuando se inicie el contenedor.

Para construir la imagen ejecutamos:

```bash
docker build -t ubuntu:platzi .
```

### Prepara una imagen para publicar en dockerhub

```bash
docker tag ubuntu:platzi USER_DOCKERHUB/ubuntu:platzy
```

### Publicar imagen

```bash
docker login
docker push USER_DOCKERHUB/ubuntu:platzi
```

### Historia de una imagen

```bash
docker history ubuntu:platzi
```

## Redes docker

```bash
docker network ls
```

### Crear una red

```bash
docker network create --attachable plazinet
```

### Conectando un contenedor a una red

```bash
docker run -d --name db mongo
docker network connect platzinet db
docker network connect NET_NAME CONTAINER_NAME
```

## Docker Compose

Forma declartiva de describir los servicios de una proyecto por medio de contenedores

docker-compose.yml

```yaml
version: "3.8"

services:
  app:
    image: platziapp
    environment:
      MONGO_URL: "mongodb://db:27017/test"
    depends_on:
      - db
    ports:
      - "3000:3000"

  db:
    image: mongo
```

### Iniciar el docker-compose

En el directorio que donde se encuntra docker-compose.yml ejcecutamos

```bash
docker-compose up -d
docker-compose ps
```

### Algunos comandos de docker-compose

#### Ver Logs

```bash
docker-compose logs
docker-compose logs app
```

#### Ejecutar un comando

```bash
docker-compose exec app bash
```

#### Parar los servicios

```bash
docker-compose down
```

#### Crecimiento horizontal

```bash
docker-compuse up -d --scale app=2
```

## Administrando en ambiente de Docker

### Limpieza

Cada comando `images`, `volume`, `container`, `network`, tiene una la opción `prune` para limpiar. Se puede usar tambien para limpiar todo:

```bash
docker system prune
```

### Reproducir esenarios

```bash
docker run -d --name app --memory 1g platziapp
docker stats
```

## Entrypoint

```dockerfile
FROM ubuntu:trusty
ENTRYPOINT [ "/bin/ping", "-c", "3" ]
CMD [ "localhost" ]
```

```bash
docker buils -t ping .
docker run --name pinger ping HOSTNAME
```

## Docker in docker

```bash
docker run --rm -it -v /var/run/docker.sock:/var/run/docker.sock docker:latest
```
