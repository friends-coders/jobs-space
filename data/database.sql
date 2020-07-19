
DROP TABLE IF EXISTS users;
CREATE TABLE
IF NOT EXISTS users
(
    user_id SERIAL,
    img VARCHAR(255),
    fullName VARCHAR(255),
    password VARCHAR(255),
    gender VARCHAR(255),
    education VARCHAR(255),
    major VARCHAR(255),
    email VARCHAR(255),
    linkedIn VARCHAR(255),
    github VARCHAR(255),
    bio VARCHAR(255),
     PRIMARY KEY(user_id,email)
);

INSERT INTO users (img,fullName,password ,gender,education,major,email,linkedIn,github,bio) VALUES('myImage-1595103536839','Ali','ali','male','phd','ML','ali@gmail.com','Linkedin/ali','github/ali','I am Aloosh');


DROP TABLE IF EXISTS hiring;
CREATE TABLE
IF NOT EXISTS hiring
(
    user_id SERIAL PRIMARY KEY,
    img VARCHAR(255),
    fullName VARCHAR(255),
    major VARCHAR(255),
    linkedIn VARCHAR(255),
    github VARCHAR(255),
    description VARCHAR(255)
);
