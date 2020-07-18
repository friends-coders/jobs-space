DROP TABLE IF EXISTS clients;
CREATE TABLE
IF NOT EXISTS clients
(
    id SERIAL PRIMARY KEY,
    pic VARCHAR(255),
    fullname VARCHAR(255),
    specialistIn VARCHAR(255),
    bio VARCHAR(255),
    linkedIn VARCHAR(255),
    github VARCHAR(255),
    instagram VARCHAR(255)
);


INSERT INTO clients (pic,fullname,specialistIn,bio,linkedIn,github,instagram) VALUES('Aman.png','ahmad xd','web','bjkkasawd','https://www.linkedin.com/in/ahmad-abdulatef-121066181',null,null);
