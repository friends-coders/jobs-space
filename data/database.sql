DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users
(
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255),
    password VARCHAR(255),
    email VARCHAR(255)
);

INSERT INTO users (user_name, password, email) VALUES('ali', '0000', 'ali@ali.com');


DROP TABLE IF EXISTS detials;
CREATE TABLE IF NOT EXISTS detials
(
    user_name VARCHAR(255),
    email VARCHAR(255),
    img_url VARCHAR(255),
    gender VARCHAR(255),
    education VARCHAR(255),
    major VARCHAR(255),
    bio VARCHAR(255),
    github VARCHAR(255),
    twitar VARCHAR(255),
    linkedIn VARCHAR(255)
);

INSERT INTO detials (user_name, email, gender, img_url, education, major, bio, github, twitar, linkedIn) VALUES('ali', 'ali@ali.com', 'male', 'images/test-img.jpg', 'enginer', 'doctor', 'small noob', 'ali.github.com', 'ali.twiter.com', 'ali.linkedin.com');

DROP TABLE IF EXISTS hireme;
CREATE TABLE IF NOT EXISTS hireme
(
    user_name VARCHAR(255),
    img_url VARCHAR(255),
    education VARCHAR(255),
    major VARCHAR(255),
    email VARCHAR(255),
    github VARCHAR(255),
    twitar VARCHAR(255),
    linkedIn VARCHAR(255),
    descr VARCHAR(255)
);

INSERT INTO hireme (user_name, img_url, education, major, email, github, twitar, linkedIn, descr) VALUES('Abd', 'images/test-img.jpg', 'IT', 'web development', 'abd@it.com', 'abd.github.com', 'abd.twiter.com', 'abd.linkedin.com', 'a passionate programmer');

DROP TABLE IF EXISTS certificates;
CREATE TABLE IF NOT EXISTS certificates
(
    user_name VARCHAR(255),
    img_url VARCHAR(255),
    certificat_name VARCHAR(255),
    mark VARCHAR(255),
    result VARCHAR(255),
    date VARCHAR(255)
);

INSERT INTO certificates (user_name, img_url, certificat_name, mark, result, date) VALUES('ali', 'images/javas.svg', 'JS Coding', '4/5', 'PASSED', '21/7/2020');

