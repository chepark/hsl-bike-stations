CREATE TABLE journey_raw (
id serial primary key, 
departure_time timestamp, 
return_time timestamp, 
departure_station_id integer NOT NULL,
departure_station_name varchar(50) NOT NULL,
return_station_id integer NOT NULL,
return_station_name varchar(50) NOT NULL,
distance integer, 
duration integer
);

CREATE TABLE station_raw (
id serial PRIMARY KEY,
station_id INTEGER, 
name_fi VARCHAR(50),
name_sw VARCHAR(50),
name_en VARCHAR(50), 
address_fi VARCHAR(300),
address_sw VARCHAR(300),
city_fi VARCHAR(50),
city_sw VARCHAR(50),
operator VARCHAR(50),
capacity INTEGER,
longitude DECIMAL(10,6), 
latitude DECIMAL(10,6)
);

-- change distance data type from integer to decimal(10,2). It is because there are values with floating point in the csv file (2021-05.csv).
ALTER TABLE journey_raw ALTER COLUMN distance TYPE numeric(10, 2);

-- load csv files into journey table. (2021-05.csv, 2021-06.csv, 2021-07.csv)
\copy journey_raw(departure_time, return_time, departure_station_id, departure_station_name, return_station_id, return_station_name, distance, duration) FROM '/tmp/2021-05.csv' WITH DELIMITER ',' CSV HEADER;

\copy station_raw(id, station_id, name_fi, name_sw, name_en, address_fi, address_sw, city_fi, city_sw, operator, capacity, longitude, latitude) FROM '/tmp/stations.csv' WITH DELIMITER ',' CSV HEADER;

-- drop id column from station_raw
ALTER TABLE station_raw drop column id; 

-- Delete unecessary data
DELETE FROM journey_raw
WHERE (distance < 10) OR (duration < 10); 

-- check if all stations in journey_raw have matching data in station_raw. 
SELECT DISTINCT departure_station_id, departure_station_name FROM journey_raw
WHERE NOT EXISTS (SELECT 1 FROM station_raw WHERE station_raw.station_id = journey_raw.departure_station_id);

SELECT DISTINCT return_station_id, return_station_name FROM journey_raw
WHERE NOT EXISTS (SELECT 1 FROM station_raw WHERE station_raw.station_id = journey_raw.return_station_id);


-- Add missing bike stations in journey_raw table into station table. 
INSERT INTO station_raw (station_id, name_en) 
SELECT DISTINCT departure_station_id, departure_station_name FROM journey_raw
WHERE NOT EXISTS (SELECT 1 FROM station_raw WHERE station_raw.station_id = journey_raw.departure_station_id);

INSERT INTO station_raw (station_id, name_en) 
SELECT DISTINCT departure_station_id, departure_station_name FROM journey_raw
WHERE NOT EXISTS (SELECT 1 FROM station_raw WHERE station_raw.station_id = journey_raw.departure_station_id);

-- create station table
CREATE TABLE station (
id INTEGER,
name VARCHAR(50) NOT NULL, 
address VARCHAR(300), 
longitude DECIMAL(10,6), 
latitude DECIMAL(10,6)
);

-- insert data to station, copying from station_raw
INSERT INTO station (id, name, address, longitude, latitude) SELECT station_id, name_en, address_fi, longitude, latitude FROM station_raw;

-- add primary key to the station.id
ALTER TABLE station
ADD PRIMARY KEY (id);

-- create journey table 
CREATE TABLE journey (
id serial primary key,
started_at TIMESTAMP NOT NULL,
ended_at TIMESTAMP NOT NULL, 
duration_sec integer NOT NULL
);

INSERT INTO journey (id, started_at, ended_at, duration_sec) SELECT id, departure_time, return_time, duration from journey_raw;

-- create route table
CREATE TABLE route (
id serial PRIMARY KEY,
journey_id INTEGER NOT NULL,
starting_station INTEGER NOT NULL,
ending_station INTEGER NOT NULL,
distance_meter INTEGER NOT NULL
);

-- there is a row with emtpy distance value
ALTER TABLE route
ALTER COLUMN distance_meter DROP NOT NULL;

INSERT INTO route (journey_id, starting_station, ending_station, distance_meter) SELECT id, departure_station_id, return_station_id, distance from journey_raw;

-- add FK constraints to journey_id, starting_station, ending_station in route table.
ALTER TABLE route
ADD CONSTRAINT starting_station_fkey
FOREIGN KEY (starting_station)
REFERENCES station(id)
ON DELETE SET NULL;

ALTER TABLE route
ADD CONSTRAINT ending_station_fkey
FOREIGN KEY (ending_station)
REFERENCES station(id)
ON DELETE SET NULL;

ALTER TABLE route
ADD CONSTRAINT journey_id_fkey
FOREIGN KEY (journey_id)
REFERENCES journey(id)
ON DELETE CASCADE;

-- Create a new column in journey as a foreign key. 
ALTER TABLE journey
ADD route_id integer;

-- insert route_id data in journey table. 
UPDATE journey SET route_id = route.id FROM route WHERE route.journey_id = journey.id;

-- add foreign key constraint
ALTER TABLE journey
ADD CONSTRAINT route_id_fkey
FOREIGN KEY (route_id)
REFERENCES route(id)
ON DELETE CASCADE;

-- get the station name which has the id of 332 in station table
SELECT name FROM station WHERE id = 332;