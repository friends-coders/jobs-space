"use strict";

// this is DOTENV (read our enviroment) this is for using dotenv library
require("dotenv").config();

// this is for the PORT it is sotred in .env file which is hidden online
const PORT = process.env.PORT || 3030;

// this is for using express library
const express = require("express");

// this will help us to get data from APIs and store them
const superagent = require("superagent");

// this is for using ejs view engaine
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

/////// Employment API //////

server.get("/work", (req, res) => {
  let city = req.query.city;
  let url = `https://jobs.github.com/positions.json?location=${city}`;
  superagent.get(url).then((result) => {
    let resultJSON = result.body;
    let workData = resultJSON.map((value) => {
      return new Work(value);
    });
    res.render("employment/work", {workinfo : workData});
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
  this.company_logo = item.company_logo,
  this.how_to_apply = item.how_to_apply
}

/////// Courses API //////
server.get("/courses", (req, res)=>{
  let couresName = req.query.couresName;
  let url = ``;
  superagent.get(url).then((result) => {
    let resultJSON = result.body;
    let courseData = resultJSON.map((value) => {
      return new Course(value);
    });
    res.render("employment/courses", {courseInfo : courseData});
  });
})























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
