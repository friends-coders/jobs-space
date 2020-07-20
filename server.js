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
const bodyParser = require('body-parser');

// this is for using the postergres for the database
const pg = require("pg");
// const { query } = require("express");


// Application setup
const server = express();
server.use(express.static("./public"));
const client = new pg.Client(process.env.DATABASE_URL);

// middleware
server.set("view engine", "ejs");
server.use(express.urlencoded({ extended: true }));

server.use(bodyParser.json());


server.get("/", (req, res) => {
  // console.log(req.body)
  res.status(200).render("/public/index");
});



/////// Employment API //////

server.get("/work", (req, res) => {
  let city = req.query.city;
  let url = `https://jobs.github.com/positions.json?location=${city}`;

  if(city){
    superagent.get(url).then((result) => {
      let resultJSON = result.body;
      let workData = resultJSON.map((value) => {
        return new Work(value);
      });
      res.render("basics/work", {workinfo : workData});
    });
  }else{
    res.render("basics/work", {workinfo : ""})
  }

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

server.get("/courses", (req, res)=>{
  let couresName = req.query.couresName;
  let url = `https://api.coursera.org/api/courses.v1?q=search&query=${couresName}&fields=photoUrl,description,primaryLanguages,certificates,previewLink,categories`;

    if(couresName){
      superagent.get(url).then((result) => {
        let resultJSON = result.body.elements;
        let courseData = resultJSON.map((value) => {
          return new Course(value);
        });
        res.render("basics/coursat", {courseInfo : courseData});
      });
    }else{
      res.render("basics/coursat", {courseInfo : ''})
    }

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

/////// Quizzes API //////
let questions = [];
server.get("/quizzes", (req, res)=>{
  let quizzeTag = req.query.quizzeTag;
  let key = process.env.QUIZAPI_KEY;

  let url = `https://quizapi.io/api/v1/questions?apiKey=${key}&limit=20&tags=${quizzeTag}`;

  if(quizzeTag){
    superagent.get(url).then((result) => {
      let resultJSON = result.body;
      // console.log(resultJSON);
      let quizzeData = resultJSON.map((value) => {
        return new Quizze(value);
      });
      // res.status(200).json(courseData)
      questions = [];
      for(let i =0; i < 5; i++){
        questions.push(quizzeData.splice((Math.floor(Math.random()*((quizzeData.length-1)-0+1))), 1))
      }
      // console.log(questions)
      res.render("basics/quizzat", {quizzeInfo : questions});
    });
  }else{
    res.render("basics/quizzat", {quizzeInfo : ''});
  }
})

server.post('/results', (req, res)=>{
  // console.log(req.body)
  let trueA = 0;

  questions.forEach((item, idx) =>{
    // console.log(req.body[`answer${idx}`])
    // console.log(item[0].correct_answer)
    if(item[0].correct_answer == req.body[`answer${idx}`]){
      trueA++
    }
  })
  console.log(trueA)
  res.render("basics/results", {trueA : trueA});

})

// constructor for the Work
function Quizze(item) {
  this.question = item.question,
  this.answers = item.answers,
  this.correct_answer = Object.entries(item.correct_answers).filter(item => item.includes("true"))[0][0].split('_').slice(0,2).join('_'),
  this.difficulty = item.difficulty
}

////////////// UpDate HireMe //////////////
// server.put('/upDate/:userDetils.id', (req, res)=>{

// })

// server.get('/prof', (req, res)=>{
//   res.render("basics/profile")
// })

let user;
let pass;
let userIn = {};


server.post('/data', function(req, res){
  // console.log('body: ',  req.body);
  userIn.user = req.body.param;
  user = req.body.param;
  userIn.pass = req.body.param2;
  pass = req.body.param2;
  // console.log(userIn)
});

server.get('/sign', (req, res)=>{
  console.log(userIn)
  res.render("basics/sign")
})



server.post('/signin', (req, res)=>{
  const item = req.body;
  if(item.user_name == userIn.user && item.password == userIn.pass){
    let SQL1 = `SELECT * FROM detials WHERE user_name='${userIn.user}';`
    // let SQL2 = `SELECT * FROM users WHERE user_name='${userIn.user}' AND password='${userIn.pass}';`
    client.query(SQL1).then(result =>{
      userIn.userDetailsA = result.rows[0];
      res.render("basics/profile", { user : userIn});
    })
  }else{
    let SQL1 = `SELECT * FROM users WHERE user_name='${item.user_name}' AND password='${item.password}';`
    client.query(SQL1).then(result =>{
      // console.log(result.rows)
      if(result.rows.length == 0){
        res.render("basics/sign", {statue: false})
      }else{
        userIn.userDetailsA = result.rows[0];
        pass = item.password;
        // console.log(userIn)
        res.render("basics/profile", { user : userIn, statue: true, passw : pass});
      }
    })
  }

})



server.post('/signup', (req, res)=>{
  const item = req.body;
  let SQL = `INSERT INTO users (user_name, password, email) VALUES($1, $2, $3);`;
  let SQL2 = `SELECT * FROM users WHERE user_name=$1 AND email=$3 AND password=$2;`;
  
  const safeValues = [item.user_name, item.password, item.email];

  client.query(SQL2, safeValues).then(data2=>{
    if(data2.rows.length == 0){
      client.query(SQL, safeValues)
      .then( data=>{
        client.query(SQL2, safeValues).then(data3=>{
          userIn.userDetailsB = data3.rows[0];
          // console.log(userIn)
          res.render("basics/profile", { user : userIn});
        })
      })
    }else{
      
      userIn.userDetailsB = data2.rows[0];
      // console.log(userIn)
      res.render("basics/profile", { user : userIn});
    }
   
  })
})

server.post('/update', (req, res)=>{
  let {gender,major,bio,education,gitHub,twitar,linkedIn} = req.body;
  // let SQL1 = `UPDATE users SET user_name=$1,password=$2 WHERE user_name='${user}';`;
  let SQL2 = `UPDATE detials SET user_name=$1,gender=$2,education=$3,major=$4,bio=$5,github=$6,twitar=$7,linkedIn=$8 WHERE user_name='${userIn.user}';`;
  let SQL3 = `SELECT * FROM detials WHERE user_name='${userIn.user}';`;
  let SQL4 = `INSERT INTO detials (user_name, gender, education, major, bio, github, twitar, linkedIn) VALUES($1, $2, $3, $4, $5, $6, $7, $8);`;
  // let safeValues1 = [name, password];
  let safeValues2 = [userIn.user,gender,education,major,bio,gitHub,twitar,linkedIn];


  // client.query(SQL1, safeValues1).then(() => {
    client.query(SQL3).then((resultsss) => {
      // console.log(resultsss.rows)
      if(resultsss.rows.length == 0){
        client.query(SQL4, safeValues2).then(() => {
          client.query(SQL3).then((results) => {
            console.log(results.rows)
            userIn.userDetailsA = results.rows[0];
            res.render("basics/profile", { user : userIn, statue: true, passw : pass});
          })
        })
      }else{
        client.query(SQL2, safeValues2).then(() => {
          client.query(SQL3).then((results) => {
            console.log(results.rows)
            userIn.userDetailsA = results.rows[0];
            res.render("basics/profile", { user : userIn, statue: true, passw : pass});
          })
        }) 
      }
    })
   
  // })
  // console.log(userIn)
})

server.post('/updateHireMe', (req, res)=>{
  let {user_name,education,major,email,twitar,github,linkedIn,descr} = req.body;
  let SQL1 = `SELECT * FROM hireme WHERE user_name='${userIn.user}';`
  let SQL2 = `UPDATE hireme SET user_name=$1,education=$2,major=$3,email=$4,twitar=$5,github=$6,linkedIn=$7,descr=$8 WHERE user_name='${userIn.user}';`
  let SQL3 = `INSERT INTO hireme (user_name, education, major, email, twitar, github, linkedIn, descr) VALUES($1, $2, $3, $4, $5, $6, $7, $8);`
  let safeValues = [user_name,education,major,email,twitar,github,linkedIn,descr];

  client.query(SQL1).then((resultsss) => {
    if(resultsss.rows.length == 0){
      console.log(resultsss.rows);
      client.query(SQL3, safeValues).then(() => { res.render("basics/hireme") })
    }else{
      console.log(resultsss.rows);
      
      client.query(SQL2, safeValues).then(() => { res.render("basics/hireme") }) 
    }
  })
})

server.get('/signOut', (req, res)=>{
  user = '';
  pass = '';
  userIn = {};
  res.render("basics/sign")
})

server.get('/hireMe', (req, res)=>{
  let SQL = `SELECT * FROM hireme;`
  client.query(SQL).then((result) => {
    // console.log(result.rows)
    res.render("basics/hireme", { emplo : result.rows})
  })
})

server.get('/profile', (req, res)=>{
  res.render("basics/profile", { user : userIn, statue: true, passw : pass})
})

////////////// Is User //////////////

// server.get('/isuser', (req, res)=>{
//   if(user != guest){
//     user_obj.isuser = true;
//     user_obj.user_name = user;
//     user_obj.user_name = user;
//     
//   }
// })





//  this is for all faild routes that the user might insert
server.get("*", (req, res) => {
  res.status(404).send("/error.ejs");
});

// this is for problems or fixing issues a message will be shown to the user
server.use((Error, req, res) => {
  res.status(500).send("Sorry, something went wrong");
});

// this is will tell the port to listen to this server I think and make sure the database works fine

client.connect().then(()=>{
  server.listen(PORT, () => {
    console.log(`do not kill me please ${PORT}`);
  });
})


