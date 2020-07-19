"use strict";

// this is DOTENV (read our enviroment) this is for using dotenv library
require("dotenv").config();

// this is for the PORT it is sotred in .env file which is hidden online
const PORT = process.env.PORT || 3030;

// this is for using express library
const express = require("express");
//THESE TWO PACKAGES ARE FOR THE HIREME
const multer = require('multer');
const path = require('path');
// this will help us to get data from APIs and store them
const superagent = require("superagent");

// this is for using ejs view engine
const ejs = require("ejs");

// this is for using REST and READ
const methodOverride = require("method-override");

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




///////////////HireME Start\\\\\\\\\\\\\\\\\\\\\\\\\\
// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});


// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('myImage');

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

server.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.render('basics/Hireme', {
        msg: err
      });
    } else {
      if (req.file == undefined) {
        res.render('basics/Hireme', {
          msg: 'Error: No File Selected!'
        });
      } else {
        res.render('basics/Hireme', {
          msg: 'File Uploaded!',
          file: `uploads/${req.file.filename}`
        });
      }
    }
  });
});

///////////////HireME End\\\\\\\\\\\\\\\\\\\\\\\\\\





//////////////////////// ROUTES //////////////////////////////
/////// Home //////
server.get("/", (req, res) => {
  // res.render("basics/Hireme");
  res.status(200).render("/public/index");
});
server.get("/hire", (req, res) => {
  res.render("basics/Hireme");

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
    amount[i] = temp + i;
  }
  for (let i = 0; i <= 23; i++) {
    let temp = 9;
    category[i] = temp + i;
  }
}
function quizzes(req, res) {
  helper();
  console.log('category :' + category);
  console.log('amount :' + amount);
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












///////////////Sign up Start\\\\\\\\\\\\\\\\\\\\\\\
server.get('/register', (req, res) => {
  res.render('basics/signup')
});

server.post('/signedup', addToDB);
function addToDB(req, res) {
  console.log('firstHELLO');
  let { FullName, password, selectGender, selectEducation, major, Email, linkedin, github, Bio } = req.body;

  let sql = `INSERT INTO users(fullName,password ,gender,education,major,email,linkedIn,github,bio)
VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9);` ;
  let values = [FullName, password, selectGender, selectEducation, major, Email, linkedin, github, Bio];
  console.log('SecondHELLO');
  console.log(values);

  client.query(sql, values)
    .then((result) => {
      console.log(result);
      res.redirect('/');
      console.log('ENDDDDDD');
      // console.log(result)
      // res.redirect('Hireme.ejs')
    });

};

///////////////Sign up End\\\\\\\\\\\\\\\\\\\\\\\



///////////////Sign ININ Start\\\\\\\\\\\\\\\\\\\\\\\
server.get('/signIn', (req, res) => {
  res.render('basics/signIn');
});

server.post('/signing', retrieveFromDB);

function retrieveFromDB(req, res) {
  let { Email, password } = req.body;

  let sql = `SELECT EXISTS(SELECT * FROM users WHERE Email=$1 AND password=$2);`;
  let values = [Email, password];
  console.log(values);
   client.query(sql, values)
    .then((result) => {
      if (result.rows[0].exists) {
        let SQL = `SELECT * FROM users WHERE Email=$1 AND password=$2;`;
        console.log('EXISTS')
        let tempObj = [];
        localStorage.setItem('currentUser', 'obj');

        return client.query(SQL, values)
          .then((result) => {
            let obj = JSON.stringify(result.rows[0]);
            return obj;
            // tempObj.push(obj);
            // console.log(result.rows[0]);
            // localStorage.setItem('currentUser', 'obj');

          });
        console.log(tempObj);

        // console.log(result.rows[0].exists);

      } else {
        console.log('DOES NOT EXIST');
        console.log(result.rows[0].exists);

      }
      // console.log(result.rows);

    })
    .catch((error) => {
      console.log('error');
    })

};

///////////////Sign up End\\\\\\\\\\\\\\\\\\\\\\\

///////////////Hire me Start\\\\\\\\\\\\\\\\\\\\\\\
server.post('/publish', publishPerson);

function publishPerson(req, res) {
  console.log('THIS IS FROM INSIDE publishPerson')
  let { pic, fullname, specialistIn, bio, linkedIn, github, instagram } = req.body;
  console.log({ pic, fullname, specialistIn, bio, linkedIn, github, instagram })
  let query = ` INSERT INTO  clients (pic , fullname , specialistIn ,bio,linkedIn,github,instagram)
VALUES ($1,$2,$3,$4,$5,$6,$7);` ;
  let values = [pic, fullname, specialistIn, bio, linkedIn, github, instagram];
  client.query(query, values)
    .then(result => {
      console.log(result.rows)
      // res.redirect('Hireme.ejs')
    })
  // let id = req.params.id;
  // // let SQL = `UPDATE tasks SET title=$1,description=$2,contact=$3, status=$4, category=$5 WHERE id=$6;`;
  // let { image_url, title, author, description, bookshelf, isbn } = req.body;
  // let SQL = `UPDATE books SET image_url=$1, title=$2, author=$3, description=$4, bookshelf=$5, isbn=$6 WHERE id=$7 ;`;
  // let safeValues = [image_url, title, author, description, bookshelf, isbn ,id];
  // client.query(SQL,safeValues)
  // .then(()=>{
  //     res.redirect(`/books/${id}`)
  // })
}

///////////////Hire me End\\\\\\\\\\\\\\\\\\\\\\\




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
client.connect(() => {

  server.listen(PORT, () => {
    console.log(`do not kill me please ${PORT}`);
  });

})
// });


