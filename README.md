# HSL City Bike

Using the [open data](https://www.hsl.fi/en/hsl/open-data) from Helsinki Region Transport(HSL), the app helps to check bike journeys and stations data from HSL with filters and sorts.

# Live on [here](http://octoxy.ddns.net:50024/)

# Technologies

- Frontend: React, TypeScript, Redux, TailwindCSS, Vite, (Vitest, Jest: currently working on)
- Backend: Node, Express, Typescript, TypeORM
- Database: PostgreSQL, PgAdmin
- Etc: Docker, NginX, Leaflet-OpenStreetMap API

# Software Architecture (in production)

<p align="center">
  <img width="800px" height="auto" src="./public/assets/hsl-flow-prod.jpg">
</p>

In development, Nginx attached to the frontend (on the picture above) does not exist.

# Features

- [x] Responsiveness

## Journeys page

- [x] List the journeys with pagination
- [x] Search journeys by station names
- [x] Filter journeys by setting the range of duration and distance
- [x] Order the list of journeys by columns (departure station, return station, duration and distanace)

## Station page

- [x] List all stations with pagination
- [x] Search a station by station name
- [x] Mark all stations on a map
- [x] Display station id and address on popup on a map when a bike station is clicked.

## Station detail page

Display the following information related to the station

- [x] The average distance of a journey starting from the station
- [x] The average distance of a journey ending at the station
- [x] Top 5 most popular return stations for journeys starting from the station
- [x] Top 5 most popular departure stations for journeys ending at the station

## Add station page

- [x] New bike station can be added through UI and the data is stored in DB.

# Development Process

0. UI and UX design
1. Data normalization
2. Convert CSV to SQL
3. API implementation
4. Frontend Development
5. Frontend testing
6. Dockerizing and Nginx configuation
7. Data backup
8. Deployment:

- server configuration
- data restoration
- running the app,
- setup connection between IP and hostname

# UI design

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FcGs80txWEyb9LjOrglHZXC%2FConvertify-Sketch%252FAdobe%252FGoogle-(Community)%3Fnode-id%3D1%253A2%26t%3DHXk12AmQMAAq5Ud3-1" allowfullscreen></iframe>

# Data modeling

<p align="center">
  <img width="800px" height="auto" src="./public/assets/data_modeling.jpg">
</p>

# Note for Docker (development and production)

It's been hard to find right Docker resources that cover the needs of this project. This is the note for future myself anyone anyone who is looking for Docker configuration reference for the following cases.

- You want to set up Docker for development and production environment.
- Your app is fullstack built with React, Typescript, Node, Express, Postgres, and (TypeORM)
- You want to use Docker named volumes to persist Postgres data
- You have a problem to connect to Postgres DB in Docker container.

  _I implemented the app without docker development environment. After checking the app fully operational, then I moved to set up dockerizing process. Therefore, if you want to start to set up docker dev environment first, the working process written on this section may be different._

## Development:

### Work Process

<p align="center">
  <img width="800px" height="auto" src="./public/assets/docker-dev.jpg">
</p>

- The process #1: PgAdmin desktop is used to backup the normalized data
- The process #3: Nginx reverse proxy config is in `./client/nginx/default.conf`

### Dockerfile and docker-compose-dev.yml configuration

```docker
#### 1. Frontend: /client/Dockerfile.dev ####
# Build image from node
FROM node:20-alpine
# Working directory in Docker
WORKDIR /app
# Copy the package.json from the current location
# and paste to the working directory /app
COPY package.json /app
# Run the npm cli in Docker container
RUN npm install
# Copy source code from the current location
# to the /app dir in Docker
COPY . .
# Expose the port # 5173
EXPOSE 5173
# Start the React development server in Docker
CMD ["npm", "run", "dev"]
```

```docker
#### 2. Backend: /server/Dockerfile ####
# Three stages: base, development and production

# Base stage
# Build imagae from node
FROM node:20-alpine as base
# Create working directory in Docker
WORKDIR /app
# Copy package.json and package-lock.json from the current location
# and paste to the working dir in Docker
COPY package*.json /app
# Expose the port #8000
EXPOSE 8000

# Development stage
# It starts from base stage defined above
FROM base as development
# Set NODE_ENV variable as development
ENV NODE_ENV=development
# Download node_modules
RUN npm install
# Copy source code from the current location
# and paste to the Docker working dir.
COPY . .
# Run the cli to build the client side.
RUN npm run build

# Production stage
# Skip and explain in production chapter below.
# FROM base as production
# ENV NODE_ENV=production
# RUN npm ci --only=production
# COPY --from=development /app/dist ./dist
# CMD ["node","dist/index.js"]

```

```docker
#### 3. nginx: nginx/Dockerfile ####
# Build container from nginx image
FROM nginx
# Copy /nginx/default.conf and paste it to /etc/nginx/conf.d/default.conf in container
COPY ./default.conf /etc/nginx/conf.d/default.conf
```

```yml
#### 4. Root Folder: docker-compose.dev yml ####
version: "3"

x-common-variables: &common-variables
  DB_USERNAME: $DB_USERNAME
  DB_PASSWORD: $DB_PASSWORD
  DB_NAME: $DB_NAME
  DB_PORT: $DB_PORT
  DB_DOCKER_SERVICE_NAME: $DB_DOCKER_SERVICE_NAME

services:
  frontend:
    container_name: hsl-frontend
    build:
      context: ./client
      dockerfile: Dockerfile.dev
    restart: unless-stopped
    volumes:
      - ./client:/app
      - /app/node_modules
    ports:
      - "5173:5173"
    depends_on:
      - backend
    networks:
      - my-network

  backend:
    container_name: hsl-backend
    # target is used to build a specific stage of ./server/Dockerfile
    build:
      context: ./server
      dockerfile: Dockerfile
      target: development
    restart: unless-stopped
    volumes:
      - ./server:/app
      - /app/node_modules
    environment:
      NODE_ENV: development
      DB_USERNAME: $DB_USERNAME
      DB_PASSWORD: $DB_PASSWORD
      DB_NAME: $DB_NAME
      DB_PORT: $DB_PORT
      DB_DOCKER_SERVICE_NAME: $DB_DOCKER_SERVICE_NAME
    ports:
      - "8000:8000"
    depends_on:
      - postgres
    networks:
      - my-network
    # override command in Dockerfile
    command: npm run serve

  postgres:
    image: postgres:latest
    container_name: hsl-postgres
    restart: always
    environment:
      <<: *common-variables
      POSTGRES_DB: $DB_NAME
      POSTGRES_USER: $DB_USERNAME
      POSTGRES_PASSWORD: $DB_PASSWORD
    ports:
      - "5432:5432"
    volumes:
      - hsldata:/var/lib/postgresql/data
    networks:
      - my-network

  nginx:
    container_name: hsl-nginx
    build:
      context: ./nginx
      dockerfile: Dockerfiledocker-compose.yml
    depends_on:
      - frontend
      - backend
    restart: always
    # The app is working in the localhost:8008.
    ports:
      - "8008:80"
    networks:
      - my-network

volumes:
  hsldata:

networks:
  my-network:
```

## Production

## Reference

[English]

- Docker hands-on exercise: https://docs.docker.com/get-started/
- Docker volume vs bind mounts: https://docs.docker.com/storage/
- Docker fullstack for dev and prod: https://gitlab.com/codeching/docker-multicontainer-application-react-nodejs-postgres-nginx-basic
- Docker fullstack for dev: https://github.com/daniil/full-stack-js-docker-tutorial
- Database URL after dockerizing: https://stackoverflow.com/a/33363660

[Korean]

- Docker and Posgres: https://shawn-dev.oopy.io/4a432950-75eb-464a-b8b8-61265123c699
- Docker volume and network: https://tech.cloudmt.co.kr/2022/06/29/%EB%8F%84%EC%BB%A4%EC%99%80-%EC%BB%A8%ED%85%8C%EC%9D%B4%EB%84%88%EC%9D%98-%EC%9D%B4%ED%95%B4-2-3-%EB%B3%BC%EB%A5%A8%EA%B3%BC-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC/
- Docker fullstack app: https://github.com/jaewonhimnae/docker-codes

# Challenges

- **Data normalization**: Handling over 3 millions of rows and working with constraints on the way of learning Postgres was a demanding and slow process.
- **Docker and Nginx** : Every single configuration should be correct in order to make the app up and running. It took time to figure out 1. WHY docker and nginx do not work. and 2. HOW to find WHY. Definitely need to expand my understanding in Linux.
- **Docker volume**: Mounting docker volume to postgres container in MacOS was problematic.

# Future Improvement

- [ ] Handle fallback (404 and 502 pages)
- [ ] Add test code on the server side
- [ ] Implement AddJouney page
- [ ] Integrate Docker to CI CD
- [ ] Deploy with SSL certificate

# Run locally

## Prerequisit:

- [ ] Install Docker Engine, PostgreSQL, PgAdmin, Node in your machine.
      [See how to install Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
- [ ] Copy `.env.example` file in the root directory and rename it as `.env`. Change values in the file.
- [ ] Open the terminal

```
$ cd path-to-the-project-directory
$ docker-compose -f docker-compose-dev.yml up --build
```

- [ ] Connect to posgres local db and restore [the data](TODO: add file url later)
