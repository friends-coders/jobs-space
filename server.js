"use strict";

// this is DOTENV (read our enviroment) this is for using dotenv library
require("dotenv").config();

// this is for the PORT it is sotred in .env file which is hidden online
const PORT = process.env.PORT || 3030;

// this is for using express library
const express = require("express");

// this will help us to get data from APIs and store them
const superagent = require("superagent");

// this is for using ejs view engine
const ejs = require("ejs");

// this is for using REST and READ
const methodOverride = require("method-override");

// this is for using the postergres for the database
const pg = require("pg");
const { query } = require("express");

// Application setup
const server = express();
server.use(express.static("./public"));
const client = new pg.Client(process.env.DATABASE_URL);

// middleware
server.set("view engine", "ejs");
server.use(express.urlencoded({ extended: true }));

//////////////////////// ROUTES //////////////////////////////
/////// Home //////
server.get("/", (req, res) => {
  res.status(200).send("/public/index");
});
/////// Quizzes API  start//////
server.get('/quiz', quizzes);
let amount = [10];
let category = [];
// let category = [9,17,18,19,30];
let type = ['multiple', 'boolean'];
let difficulty = ['easy', 'medium', 'hard'];
function helper() {
  amount = [];
  category = [];
  for (let i = 0; i < 46; i++) {
    let temp = 5;
    amount[i]=temp+i;
  }
  for (let i = 0; i <= 23; i++) {
    let temp = 9;
    category[i] = temp+i;
  }
}
function quizzes(req, res) {
  helper();
  console.log('category :'+category);
  console.log('amount :'+amount);
  let URL = `https://opentdb.com/api.php?amount=${amount[0]}&category=${category[0]}&difficulty=${difficulty[0]}`;
  superagent.get(URL).then((result) => {
    let x = result.body;
    let questions = x.results.map(question => {
      return new Quizzes(question);
    });
    res.send(questions);
  });
}

function Quizzes(obj) {
  this.category = obj.category;
  this.type = obj.type;
  this.difficulty = obj.difficulty;
  this.question = obj.question;
  this.correct_answer = obj.correct_answer;
  this.incorrect_answers = obj.incorrect_answers;

}
/////// Quizzes API  End//////

/////// Employment API //////

server.get("/work", (req, res) => {
  let city = req.query.city;
  let url = `https://jobs.github.com/positions.json?location=${city}`;
  superagent.get(url).then((result) => {
    let resultJSON = result.body;
    let workData = resultJSON.map((value) => {
      return new Work(value);
    });
    res.render("basics/work", { workinfo: workData });
  });
});

// constructor for the Work
function Work(item) {
  this.url = item.url,
    this.created_at = item.created_at,
    this.company = item.company,
    this.title = item.title,
    this.type = item.type,
    this.location = item.location,
    this.description = item.description,
    this.company_logo = item.company_logo ? item.company_logo : `https://image.flaticon.com/icons/svg/3143/3143340.svg`,
    this.how_to_apply = item.how_to_apply
}

/////// Courses API //////
server.get("/courses", (req, res) => {
  let couresName = req.query.couresName;
  let url = `https://api.coursera.org/api/courses.v1?q=search&query=${couresName}&fields=photoUrl,description,primaryLanguages,certificates,previewLink,categories`;
  superagent.get(url).then((result) => {
    let resultJSON = result.body.elements;
    let courseData = resultJSON.map((value) => {
      return new Course(value);
    });
    res.render("basics/courses", { courseInfo: courseData });
  });
})

// constructor for the Work
function Course(item) {
  this.name = item.name,
    this.primaryLanguages = item.primaryLanguages[0],
    this.certificates = item.certificates,
    this.categories = item.categories,
    this.photoUrl = item.photoUrl,
    this.description = item.description,
    this.previewLink = `https://www.coursera.org/programs/talent-beyond-borders-learning-program-wsf3c`
}






















//  this is for all faild routes that the user might insert
server.get("*", (req, res) => {
  res.status(404).send("/error.ejs");
});

// this is for problems or fixing issues a message will be shown to the user
server.use((Error, req, res) => {
  res.status(500).send("Sorry, something went wrong");
});

// this is will tell the port to listen to this server I think and make sure the database works fine
// client.connect().then(() => {
server.listen(PORT, () => {
  console.log(`do not kill me please ${PORT}`);
});
// });
