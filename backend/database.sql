DROP TABLE IF EXISTS greetings;

CREATE TABLE greetings(
id    INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
text  TEXT NOT NULL

);



INSERT INTO greetings (text) VALUES ('Hej där!');
INSERT INTO greetings (text) VALUES ('Hur mår du?');
INSERT INTO greetings (text) VALUES ('Mår du bra');
INSERT INTO greetings (text) VALUES ('eller något sånt');
