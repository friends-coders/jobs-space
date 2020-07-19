DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users
(
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255),
    password VARCHAR(255),
    email VARCHAR(255),
);

INSERT INTO users (user_name, password, email) VALUES('ali', '0000', 'ali@ali.com');


DROP TABLE IF EXISTS detials;
CREATE TABLE IF NOT EXISTS detials
(
    user_name VARCHAR(255),
    img_url VARCHAR(255),
    gender VARCHAR(255),
    education VARCHAR(255),
    major VARCHAR(255),
    bio VARCHAR(255),
    github VARCHAR(255),
    twitar VARCHAR(255),
    linkedIn VARCHAR(255)
);

INSERT INTO detials (user_name, gender, img_url, education, major, bio, github, twitar, linkedIn) VALUES('ali', 'male', 'images/test-img.jpg', 'enginer', 'doctor', 'small noob', 'ali.github.com', 'ali.twiter.com', 'ali.linkedin.com');

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

INSERT INTO detials (user_name, img_url, education, major, email, github, twitar, linkedIn, descr) VALUES('ali', 'images/test-img.jpg', 'enginer', 'doctor', 'ali@ali.com', 'ali.github.com', 'ali.twiter.com', 'ali.linkedin.com', 'noooob in gaming');