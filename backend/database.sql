/* DROP TABLE IF EXISTS greetings; */
/* CREATE TABLE greetings(
id    INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
text  TEXT NOT NULL

); */
/*
INSERT INTO greetings (text) VALUES ('Hej där!');
INSERT INTO greetings (text) VALUES ('Hur mår du?');
INSERT INTO greetings (text) VALUES ('Mår du bra');
INSERT INTO greetings (text) VALUES ('eller något sånt'); */



DROP TABLE IF EXISTS timetable;
DROP TABLE IF EXISTS stops;
DROP TABLE IF EXISTS stations;
DROP TABLE IF EXISTS routes;
DROP TABLE IF EXISTS zones;
DROP TABLE IF EXISTS staff;




CREATE TABLE staff (
    id INTEGER PRIMARY KEY  AUTOINCREMENT UNIQUE,
    name  TEXT NOT NULL,
    role TEXT NOT NULL,
    email TEXT NOT NULL

);
CREATE TABLE zones (
    id INTEGER PRIMARY KEY UNIQUE,
    name  TEXT NOT NULL,
    price REAL NOT NULL

);


CREATE TABLE routes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    route_from_id INTEGER,
    route_to_id INTEGER,
    route_to_name TEXT,
    route_from_name TEXT,
    price INTEGER,
    zone_id INTEGER,
    FOREIGN KEY (route_from_id) REFERENCES stations(id)
    FOREIGN KEY (route_to_id) REFERENCES stations(id)
    FOREIGN KEY (price) REFERENCES zones(id)
    FOREIGN KEY (route_from_name) REFERENCES stations(name)
    FOREIGN KEY (route_to_name) REFERENCES stations(name)


);


CREATE TABLE stations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name  TEXT,
    zone_id INTEGER,
    route_id INTEGER,

    FOREIGN KEY (zone_id) REFERENCES zones(id)
    FOREIGN KEY (route_id) REFERENCES routes(id)
);


CREATE TABLE stops (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name  TEXT NOT NULL,
    station_id INTEGER,
    zone_id INTEGER,
    -- Add stop-specific columns (e.g., name, platform_number, etc.)
    FOREIGN KEY (zone_id) REFERENCES zones(id)
    FOREIGN KEY (station_id) REFERENCES stations(id)
);


CREATE TABLE timetable (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    time TEXT

);


INSERT INTO zones (id, name, price) VALUES(1, 'A', 27);
INSERT INTO zones (id, name, price) VALUES(2, 'B', 37);
INSERT INTO zones (id, name, price) VALUES(3, 'C', 47);
INSERT INTO stations (name, zone_id ) VALUES('göteborg Central', 1);
INSERT INTO stations (name, zone_id ) VALUES('kungälv Resecentrum', 2);
INSERT INTO stations (name, zone_id ) VALUES('älvängen Resecentrum', 3);

INSERT INTO routes (  route_to_name,  route_from_name,  route_to_id,  route_from_id,  zone_id,  price)
SELECT 'göteborg Central','kungälv Resecentrum', 1, 2, id, price FROM zones WHERE name='A' ;

INSERT INTO routes (route_to_name,route_from_name, route_to_id, route_from_id, zone_id, price)
SELECT 'göteborg Central','älvängen Resecentrum', 1, 3, id, price FROM zones WHERE name='A' ;

INSERT INTO routes (route_to_name,route_from_name, route_to_id, route_from_id, zone_id, price)
SELECT 'kungälv Resecentrum','göteborg Central', 2, 1, id, price FROM zones WHERE name='B' ;

INSERT INTO routes (route_to_name,route_from_name, route_to_id, route_from_id, zone_id, price)
SELECT 'kungälv Resecentrum', 'älvängen Resecentrum', 2, 3, id, price FROM zones WHERE name='B';

INSERT INTO routes (route_to_name,route_from_name, route_to_id, route_from_id, zone_id, price)
SELECT 'älvängen Resecentrum','göteborg Central', 3, 1, id, price FROM zones WHERE name='C';

INSERT INTO routes (route_to_name,route_from_name, route_to_id, route_from_id, zone_id, price)
SELECT 'älvängen Resecentrum','kungälv Resecentrum', 3, 2,id, price FROM zones WHERE name='C';





INSERT INTO timetable (time) VALUES ('00:00');
INSERT INTO timetable (time) VALUES ('00:30');
INSERT INTO timetable (time) VALUES ('01:00');
INSERT INTO timetable (time) VALUES ('01:30');
INSERT INTO timetable (time) VALUES ('02:00');
INSERT INTO timetable (time) VALUES ('02:30');
INSERT INTO timetable (time) VALUES ('03:00');
INSERT INTO timetable (time) VALUES ('03:30');
INSERT INTO timetable (time) VALUES ('04:00');
INSERT INTO timetable (time) VALUES ('04:30');
INSERT INTO timetable (time) VALUES ('05:00');
INSERT INTO timetable (time) VALUES ('05:30');
INSERT INTO timetable (time) VALUES ('06:00');
INSERT INTO timetable (time) VALUES ('06:30');
INSERT INTO timetable (time) VALUES ('07:00');
INSERT INTO timetable (time) VALUES ('07:30');
INSERT INTO timetable (time) VALUES ('08:00');
INSERT INTO timetable (time) VALUES ('08:30');
INSERT INTO timetable (time) VALUES ('09:00');
INSERT INTO timetable (time) VALUES ('09:30');
INSERT INTO timetable (time) VALUES ('10:00');
INSERT INTO timetable (time) VALUES ('10:30');
INSERT INTO timetable (time) VALUES ('11:00');
INSERT INTO timetable (time) VALUES ('11:30');
INSERT INTO timetable (time) VALUES ('12:00');
INSERT INTO timetable (time) VALUES ('12:30');
INSERT INTO timetable (time) VALUES ('13:00');
INSERT INTO timetable (time) VALUES ('13:30');
INSERT INTO timetable (time) VALUES ('14:00');
INSERT INTO timetable (time) VALUES ('14:30');
INSERT INTO timetable (time) VALUES ('15:00');
INSERT INTO timetable (time) VALUES ('15:30');
INSERT INTO timetable (time) VALUES ('16:00');
INSERT INTO timetable (time) VALUES ('16:30');
INSERT INTO timetable (time) VALUES ('17:00');
INSERT INTO timetable (time) VALUES ('17:30');
INSERT INTO timetable (time) VALUES ('18:00');
INSERT INTO timetable (time) VALUES ('18:30');
INSERT INTO timetable (time) VALUES ('19:00');
INSERT INTO timetable (time) VALUES ('19:30');
INSERT INTO timetable (time) VALUES ('20:00');
INSERT INTO timetable (time) VALUES ('20:30');
INSERT INTO timetable (time) VALUES ('21:00');
INSERT INTO timetable (time) VALUES ('21:30');
INSERT INTO timetable (time) VALUES ('22:00');
INSERT INTO timetable (time) VALUES ('22:30');
INSERT INTO timetable (time) VALUES ('23:00');
INSERT INTO timetable (time) VALUES ('23:30');

INSERT INTO stops (name, station_id, zone_id) VALUES( 'göteborg central',1, 1);
INSERT INTO stops (name,zone_id) VALUES( 'gamlestaden station', 1);
INSERT INTO stops (name,zone_id) VALUES( 'surte station', 3);
INSERT INTO stops (name,zone_id) VALUES( 'bohus station', 3);
INSERT INTO stops (name ,zone_id) VALUES( 'nödinge station', 3);
INSERT INTO stops (name ,zone_id) VALUES( 'nol station', 3);
INSERT INTO stops (name, station_id,zone_id) VALUES( 'älvängen resecentrum',3, 3);


INSERT INTO staff (name, role, email) VALUES( 'Emily Johnson','Sales Manager', 'emily.johnson@litravels.com');
INSERT INTO staff (name, role, email) VALUES( 'Michael Williams', 'Support Specialist', 'michael.williams@litravels.com');
INSERT INTO staff (name, role, email) VALUES( 'Sophia Brown','Accountant', 'sophia.brown@litravels.com');
INSERT INTO staff (name, role, email) VALUES( 'James Davis','Research Analyst', 'james.davis@litravels.com');
INSERT INTO staff (name, role, email) VALUES( 'Emma Miller','Quality Assurance Engineer', 'emma.miller@litravels.com');
INSERT INTO staff (name, role, email) VALUES( 'Olivia Wilson','Research Analyst', 'olivia.wilson@litravels.com');
