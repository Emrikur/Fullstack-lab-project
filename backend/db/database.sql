DROP TABLE IF EXISTS greeting;

CREATE TABLE greeting(
id    INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
text  TEXT NOT NULL

);



INSERT INTO greeting (text) VALUES ('Hej där!');
INSERT INTO greeting (text) VALUES ('Hur mår du?');
INSERT INTO greeting (text) VALUES ('Mår du bra');
INSERT INTO greeting (text) VALUES ('eller något sånt');
