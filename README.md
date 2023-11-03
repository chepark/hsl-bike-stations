# dingding - The project is under the production process.

Using the [open data](https://www.hsl.fi/en/hsl/open-data) from Helsinki Region Transport(HSL), the app helps to see bike journeys and stations with filters and sorts.

# Features

## Data

[x]Import data from the CSV files to a relational database after normalization

## Journeys page

[x]List the journeys with pagination
[x]Search journeys by station names
[x]Filter journeys by setting the range of duration and distance
[x]Order the list of journeys by columns (departure station, return station, duration and distanace)

## Station page

[x]List all stations with pagination
[x]Search a station by station name
[x]Mark all stations on a map
[x]Display station id and address on popup when a user click a bike station on a map.

## Station detail page

[x]Display detail information related to the station

1. The average distance of a journey starting from the station
2. The average distance of a journey ending at the station
3. Top 5 most popular return stations for journeys starting from the station
4. Top 5 most popular departure stations for journeys ending at the station

Add station page

Single station view
Recommended
Station name
Station address
Total number of journeys starting from the station
Total number of journeys ending at the station

Ability to filter all the calculations per month

# Technologies

- Frontend: React, TypeScript, Redux, TailwindCSS, Vite,
- Backend: Node, Express, Typescript, TypeORM
- Database: Postgres,
- Etc: Docker

Dataset: server/src/db/raw-data

# 1. Design UI

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FcGs80txWEyb9LjOrglHZXC%2FConvertify-Sketch%252FAdobe%252FGoogle-(Community)%3Fnode-id%3D1%253A2%26t%3DHXk12AmQMAAq5Ud3-1" allowfullscreen></iframe>

# 2. Relational database structure

<p align="center">
  <img width="800px" height="auto" src="./public/assets/data_diagram.jpg">
</p>

# 3. Run locally

## 3-1 Frontend

```sh
$ cd client
$ docker build --tag hsl-client .
$ docker run -dp 127.0.0.1:5173:5173 hsl-client
```

<!-- Things to Add according to Solita Blog -->

Prerequisites: Should the reviewer install something on their computer before they can compile and run the project? Does the project only work on Windows or Linux? List all steps that need to be done before trying to run the project. If versions are important, remember to mention those as well.
Configurations: Do you have to configure for example database connections locally? Provide clear instructions on what needs to be changed and where. In case you have an .env file which you, of course, should not add to GitHub, you can send that file to the reviewers by other means.
How to run the project? Do you have to install some packages or compile the code? If you have separate services for example for backend and frontend, remember to write instructions for all needed services.
Tests: If your project has tests, include instructions on how to run them.
Description of the project: What is the purpose of the project and what features it has?
Technology choices: List chosen technologies. It’s also nice to know why you chose those technologies.
TODO: If some things are missing or not working, you can list them in README.
