DROP TABLE IF EXISTS timetable;

DROP TABLE IF EXISTS stops;

DROP TABLE IF EXISTS stations;

DROP TABLE IF EXISTS routes;

DROP TABLE IF EXISTS zones;

DROP TABLE IF EXISTS staff;

CREATE TABLE
  zones (
    id INTEGER PRIMARY KEY UNIQUE,
    name TEXT NOT NULL,
    price REAL NOT NULL
  );

CREATE TABLE
  routes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    route_from_id INTEGER,
    route_to_id INTEGER,
    route_to_name TEXT,
    route_from_name TEXT,
    price INTEGER,
    zone_id INTEGER,
    FOREIGN KEY (route_from_id) REFERENCES stations (id) FOREIGN KEY (route_to_id) REFERENCES stations (id) FOREIGN KEY (price) REFERENCES zones (id) FOREIGN KEY (route_from_name) REFERENCES stations (name) FOREIGN KEY (route_to_name) REFERENCES stations (name)
  );

CREATE TABLE
  stations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    zone_id INTEGER,
    route_id INTEGER,
    FOREIGN KEY (zone_id) REFERENCES zones (id) FOREIGN KEY (route_id) REFERENCES routes (id)
  );

CREATE TABLE
  stops (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    station_id INTEGER,
    zone_id INTEGER,
    FOREIGN KEY (zone_id) REFERENCES zones (id) FOREIGN KEY (station_id) REFERENCES stations (id)
  );

CREATE TABLE
  timetable (id INTEGER PRIMARY KEY AUTOINCREMENT, time TEXT);

CREATE TABLE
  staff (
    id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    email TEXT NOT NULL,
    image_path TEXT NOT NULL
  );

INSERT INTO
  zones (id, name, price)
VALUES
  (1, 'A', 27),
  (2, 'B', 37),
  (3, 'C', 47);

INSERT INTO
  stations (name, zone_id)
VALUES
  ('göteborg central', 1),
  ('kungälv resecentrum', 2),
  ('älvängen resecentrum', 3);

INSERT INTO
  routes (
    route_to_name,
    route_from_name,
    route_to_id,
    route_from_id,
    zone_id,
    price
  )
SELECT
  'göteborg central',
  'kungälv resecentrum',
  1,
  2,
  id,
  price
FROM
  zones
WHERE
  name = 'A';

INSERT INTO
  routes (
    route_to_name,
    route_from_name,
    route_to_id,
    route_from_id,
    zone_id,
    price
  )
SELECT
  'göteborg central',
  'älvängen resecentrum',
  1,
  3,
  id,
  price
FROM
  zones
WHERE
  name = 'A';

INSERT INTO
  routes (
    route_to_name,
    route_from_name,
    route_to_id,
    route_from_id,
    zone_id,
    price
  )
SELECT
  'kungälv resecentrum',
  'göteborg central',
  2,
  1,
  id,
  price
FROM
  zones
WHERE
  name = 'B';

INSERT INTO
  routes (
    route_to_name,
    route_from_name,
    route_to_id,
    route_from_id,
    zone_id,
    price
  )
SELECT
  'kungälv resecentrum',
  'älvängen resecentrum',
  2,
  3,
  id,
  price
FROM
  zones
WHERE
  name = 'B';

INSERT INTO
  routes (
    route_to_name,
    route_from_name,
    route_to_id,
    route_from_id,
    zone_id,
    price
  )
SELECT
  'älvängen resecentrum',
  'göteborg central',
  3,
  1,
  id,
  price
FROM
  zones
WHERE
  name = 'C';

INSERT INTO
  routes (
    route_to_name,
    route_from_name,
    route_to_id,
    route_from_id,
    zone_id,
    price
  )
SELECT
  'älvängen resecentrum',
  'kungälv resecentrum',
  3,
  2,
  id,
  price
FROM
  zones
WHERE
  name = 'C';

INSERT INTO
  timetable (time)
VALUES
  ('00:00'),
  ('00:30'),
  ('01:00'),
  ('01:30'),
  ('02:00'),
  ('02:30'),
  ('03:00'),
  ('03:30'),
  ('04:00'),
  ('04:30'),
  ('05:00'),
  ('05:30'),
  ('06:00'),
  ('06:30'),
  ('07:00'),
  ('07:30'),
  ('08:00'),
  ('08:30'),
  ('09:00'),
  ('09:30'),
  ('10:00'),
  ('10:30'),
  ('11:00'),
  ('11:30'),
  ('12:00'),
  ('12:30'),
  ('13:00'),
  ('13:30'),
  ('14:00'),
  ('14:30'),
  ('15:00'),
  ('15:30'),
  ('16:00'),
  ('16:30'),
  ('17:00'),
  ('17:30'),
  ('18:00'),
  ('18:30'),
  ('19:00'),
  ('19:30'),
  ('20:00'),
  ('20:30'),
  ('21:00'),
  ('21:30'),
  ('22:00'),
  ('22:30'),
  ('23:00'),
  ('23:30');

INSERT INTO
  stops (name, zone_id)
VALUES
  ('Kongahällagatan', 2),
  ('Västra Parken', 2),
  ('Kexbageriet', 2),
  ('Fars Hatt', 2),
  ('Eriksdal', 1),
  ('Backadalsmotet', 1),
  ('Hjalmar Brantingsplatsen', 1),
  ('Nordstan', 1),
  ('Polhemsplatsen', 1),
  ('Heden', 1),
  ('Berzeliigatan', 1),
  ('Korsvägen', 1),
  ('Liseberg Station', 1),
  ('nol station', 3),
  ('nödinge station', 3),
  ('bohus station', 3),
  ('surte station', 3),
  ('gamlestaden station', 1);

INSERT INTO
  stops (name, station_id, zone_id)
VALUES
  ('göteborg central', 1, 1),
  ('kungälv resecentrum', 2, 2),
  ('älvängen resecentrum', 3, 3);

INSERT INTO
  staff (name, role, email, image_path)
VALUES
  (
    'Emily Johnson',
    'Sales Manager',
    'emily.johnson@litravels.com',
    'staff_IMG/emilyjohnson.jpg'
  ),
  (
    'Michael Williams',
    'Support Specialist',
    'michael.williams@litravels.com',
    'staff_IMG/michaelwilliams.jpg'
  ),
  (
    'Sophia Brown',
    'Accountant',
    'sophia.brown@litravels.com',
    'staff_IMG/sophiabrown.jpg'
  ),
  (
    'James Davis',
    'Research Analyst',
    'james.davis@litravels.com',
    'staff_IMG/jamesdavis.jpg'
  ),
  (
    'Emma Miller',
    'Quality Assurance Engineer',
    'emma.miller@litravels.com',
    'staff_IMG/emmamiller.jpg'
  ),
  (
    'Olivia Wilson',
    'Research Analyst',
    'olivia.wilson@litravels.com',
    'staff_IMG/oliviawilson.jpg'
  );
