## 0. 인프라 요구사항

- Docker
- Docker Compose

## 1. Store

서비스 ‘이음’은 총 다섯 가지의 저장소를 사용합니다.

- PostgreSQL (+ PostGIS)
- MongoDB
- Qdrant
- MINIO
- Redis

위의 데이터베이스는 아래의 Docker-Compose 파일을 통해 한 번에 인스턴스에 적재할 수 있습니다.

```yaml
services:
    qdrant:
        image: qdrant/qdrant
        container_name: qdrant
        ports:
            - "3333:6333"
        volumes:
            - qdrant_data:/qdrant/storage

    mongodb_deploy:
        image: mongo:6.0
        container_name: mongodb
        ports:
            - "3718:27017"
        environment:
            MONGO_INITDB_ROOT_USERNAME: dubanjang
            MONGO_INITDB_ROOT_PASSWORD: dubanjjang!
        volumes:
            - mongo_data:/data/db
            
    redis_deploy:
        image: redis:latest
        container_name: em-redis-deploy
        ports:
            - '${REDIS_PORT_DEPLOY}:6379'
        command: redis-server --requirepass ${REDIS_PASSWORD_DEPLOY}
        volumes:
            - redis_data:/data
            
    postgresql_deploy:
        image: postgis/postgis:latest
        container_name: em-postgresql-deploy
        ports:
            - '${POSTGRES_PORT_DEPLOY}:5432'
        environment:
            POSTGRES_DB: ${POSTGRES_DB_DEPLOY}
            POSTGRES_USER: ${POSTGRES_USER_DEPLOY}
            POSTGRES_PASSWORD: ${POSTGRES_PASSWORD_DEPLOY}
        volumes:
            - postgres_data:/var/lib/postgresql/data

    minio:
        image: minio/minio
        container_name: em-minio
        ports:
            - "11000:9000"
            - "11001:9001"
        volumes:
            - minio_data:/data
        environment:
            MINIO_ROOT_USER: ${MINIO_ROOT_USER}
            MINIO_ROOT_PASSWORD: ${MINIO_ROOT_PASSWORD}
            MINIO_DOMAIN: j12a407.p.ssafy.io
            MINIO_BROWSER_REDIRECT_URL: http://j12a407.p.ssafy.io:11001
        command: server /data --console-address ":9001" --address ":9000"
        restart: always

volumes:
    postgres_data: 
    redis_data: 
    minio_data:
    qdrant_data:
    mongo_data:
    
networks:
  instance-network:
    driver: bridge

```

### PostgreSQL 덤프 파일

정상적인 서비스 동작을 위해 아래의 덤프 파일을 `PostgreSQL` 에 적용하여야 합니다.

### Minio 저장소 파일

서비스에 활용되는 아래의 에셋 파일들을 minio의 `em-bucket` 에 저장해야 합니다.

[DB 덤프파일 / 서비스 에셋](https://www.notion.so/DB-1d021df8444280918390e7707dfaefce?pvs=21)

## 2. Backend

<aside>
💡

챕터 2부터는, GitLab에 게재된 소스 코드를 직접 컴파일하여 빌드하여야 합니다.

</aside>

### Spring 서버 띄우기

1. Git repository 브랜치를 `BE/main` 으로 이동하고, `backend-spring` 디렉토리로 이동합니다.

```bash
git switch BE/main
cd backend-spring
```

1. 디렉토리 내부의 `Dockerfile` 을 기반으로 도커 이미지를 빌드하고 실행합니다.

```bash
docker build -t ${IMAGE_NAME}:latest \
 -t ${IMAGE_NAME}:${BUILD_VERSION} \
 -f Dockerfile
 
docker run -d \
	--name ${CONTAINER_NAME} \
	--network instance-network \
	${IMAGE_NAME}
```

### FastAPI 서버 띄우기

1. Git repository 브랜치를 `AI/main` 으로 이동하고, `backend-fastapi`디렉토리로 이동합니다.

```bash
git switch AI/main
cd backend-fastapi
```

1. 디렉토리 내부의 `Dockerfile` 을 기반으로 도커 이미지를 빌드하고 실행합니다.

```bash
docker build -t ${IMAGE_NAME}:latest \
 -t ${IMAGE_NAME}:${BUILD_VERSION} \
 -f Dockerfile
 
docker run -d \
	--name ${CONTAINER_NAME} \
	--network instance-network \
	${IMAGE_NAME}
```

## 3. React + Nginx 띄우기

1. Git repository 브랜치를 `FE/main` 으로 이동하고, `frontend` 디렉토리로 이동합니다.

```bash
git switch FE/main
cd frontend
```

1. 디렉토리 내부의 `Dockerfile` 을 기반으로 도커 이미지를 빌드하고 실행합니다.

```bash
docker build -t ${IMAGE_NAME}:latest \
 -t ${IMAGE_NAME}:${BUILD_VERSION} \
 -f Dockerfile
 
docker run -d \
	--name ${CONTAINER_NAME} \
	--network instance-network \
	${IMAGE_NAME}
```