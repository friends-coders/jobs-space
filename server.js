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







///////////////////////////////////////////////// Employment API ////////////////////////////////////////////////////////
let offers = []; // :)
let offerPrm;
let questionsQQ = [];
let serchP;
let picR;

server.get("/work", (req, res) => {
  offers = [];
  // console.log(req.query)
  let field = req.query.field;
  let url = `https://jobs.github.com/positions.json?page=1&search=${field}`;

  if(field){
    superagent.get(url).then((result) => {
      let resultJSON = result.body;
      console.log(result.body)
      let workData = resultJSON.map((value) => {
        return new Work(value);
      });
      offers = workData; // :)
      offerPrm = field;
      res.render("basics/work", {workinfo : workData});
    });
  }else{
    res.render("basics/work", {workinfo : ""})
  }

});



server.get("/work/:idx", (req, res) => {
  // console.log(req.params.idx);
  if(userIn.user != 'guest'){
  let job = req.params.idx;
  
  if(/(java)\W*/g.test(offerPrm)){
    serchP = 'javascript'
    offerPrm = 'JS Coding'
  }else if(/(html)\W*/g.test(offerPrm)){
    serchP = 'html'
    offerPrm = 'HTML'
  }else if(/(linux)\W*/g.test(offerPrm)){
    serchP = 'linux'
    offerPrm = 'Linux'
  }else if(/(php)\W*/g.test(offerPrm)){
    serchP = 'php'
    offerPrm = `PHP`
  }
  // console.log(offerPrm);
  
  let SQL = `SELECT * FROM certificates WHERE user_name='${userIn.user}' AND certificat_name='${offerPrm}' AND result='PASSED';`;
  client.query(SQL).then((result2)=>{
    if(result2.rows.length == 0){
      
      
      let key = process.env.QUIZAPI_KEY;
      
      let url = `https://quizapi.io/api/v1/questions?apiKey=${key}&limit=20&tags=${serchP}`;
      
      superagent.get(url).then((result) => {
        // console.log(result.body)
        let resultJSON = result.body;
      // console.log(resultJSON);
      let quizzeData = resultJSON.map((value) => {
        return new Quizze(value);
      });
      questionsQQ = [];
      for(let i =0; i < 5; i++){
        questionsQQ.push(quizzeData.splice((Math.floor(Math.random()*((quizzeData.length-1)-0+1))), 1))
      }
      res.render("basics/qulfied", {quizzeInfo : questionsQQ, thJobDx : job, stat : true});
    });
  

      
    }else{
      console.log('msh 0! :|')
      res.render('basics/qulfied', { stat : false})
    }
  })
  }else{
    res.redirect('/sign')
  }
})

server.post("/work/:thJobDx", (req, res) => {
  console.log(req.body, 'body hooon')
  console.log(req.params.thJobDx)

  let jN = req.params.thJobDx;

  let trueA = 0;

  questionsQQ.forEach((item, idx) =>{
    // console.log(req.body[`answer${idx}`])
    // console.log(item[0].correct_answer)
    if(item[0].correct_answer == req.body[`answer${idx}`]){
      trueA++
    }


  })

  if(/(java)\W*/g.test(offerPrm)){
    picR = `images/javas.svg`;
  }else if(/(html)\W*/g.test(offerPrm)){
    picR = `images/html.svg`;
  }else if(/(linux)\W*/g.test(offerPrm)){
    picR = `images/linux.svg`;
  }else if(/(php)\W*/g.test(offerPrm)){
    picR = `images/php.svg`;
  }

  let TDa = new Date().toJSON().slice(0,10).replace(/-/g,'/');
  let statu;

  if(trueA >= 4){
    statu = `PASSED`;
    if(userIn.user != 'guest'){ // user & PASSED

    let SQL2 = `SELECT * FROM certificates WHERE user_name='${userIn.user}' AND certificat_name='${offerPrm}';`
    client.query(SQL2).then(result2 =>{
      if(result2.rows.length != 0){ // Updated it IF he has it
        let SQL3 = `UPDATE certificates SET mark=$1,result=$2,date=$3 WHERE user_name='${userIn.user}' AND certificat_name='${offerPrm}';`;
        let safeValues2 = [trueA,statu,TDa]
        client.query(SQL3, safeValues2).then(result3 =>{
          client.query(SQL2).then(result4 =>{
            console.log(result4.rows)
            let results4 = result4.rows[0];
              res.render("basics/qresult", {trueA : trueA, results : results4, thJob : offers[jN]});
          })
        })
      }
      else{ // Create new certi IF he hasnt it
        let SQL = `INSERT INTO certificates (user_name, img_url, certificat_name, mark, result, date) VALUES ($1,$2,$3,$4,$5,$6);`;
        let safeValues = [userIn.user,picR,offerPrm,trueA,statu,TDa]
        client.query(SQL, safeValues).then(result =>{
          client.query(SQL2).then(result4 =>{
            console.log('1st  ',result4.rows)
            // let results4 = result4.rows;
            res.render("basics/qresult", {trueA : trueA, results : result4.rows, thJob : offers[jN]});
          })
        })
      }
    })


  
    }  


    }else{ // user & NOT PASSED
      statu = `FAILL`;
      let failRes = {
        user_name : userIn.user,
        img_url : picR,
        certificat_name : offerPrm,
        mark : trueA,
        result : statu,
        date : TDa,
      }
      if(userIn.user != 'guest'){
        res.render("basics/qresult", {trueA : trueA, results : failRes, thJob : offers[jN]});
      }else{
        res.render("basics/qresult", {trueA : trueA, results : failRes, thJob : offers[jN]});
      }

    }
    



})
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


/////////////////////////////////////////////////// Courses API ///////////////////////////////////////////////////////
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


/////////////////////////////////////////////////////// Quizzes API ///////////////////////////////////////////////////
let questions = [];
let qSRes ='';
let qSResQ;
let qSP;

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
      qSRes = quizzeTag;
      qSResQ = quizzeTag;
      res.render("basics/quizzat", {quizzeInfo : questions, statue : true});
    });
    }else{
    res.render("basics/quizzat", {quizzeInfo : '', statue : true});
  }
})


/////////////////////////////////////////////////// Results //////////////////////////////////////////////////////////////
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

  if(/(java)\W*/g.test(qSRes)){
    qSP = `images/javas.svg`;
    qSRes = 'JS Coding'
  }else if(/(html)\W*/g.test(qSRes)){
    qSP = `images/html.svg`;
    qSRes = 'HTML'
  }else if(/(linux)\W*/g.test(qSRes)){
    qSP = `images/linux.svg`;
    qSRes = 'Linux'
  }else if(/(php)\W*/g.test(qSRes)){
    qSP = `images/php.svg`;
    qSRes = `PHP`
  }

  let TDa = new Date().toJSON().slice(0,10).replace(/-/g,'/');
  let statu;

  if(trueA >= 4){
    statu = `PASSED`;
    if(userIn.user != 'guest'){ // user & PASSED

    let SQL2 = `SELECT * FROM certificates WHERE user_name='${userIn.user}' AND certificat_name='${qSRes}';`
    client.query(SQL2).then(result2 =>{
      if(result2.rows.length != 0){ // Updated it IF he has it
        let SQL3 = `UPDATE certificates SET mark=$1,result=$2,date=$3 WHERE user_name='${userIn.user}' AND certificat_name='${qSRes}';`;
        let safeValues2 = [trueA,statu,TDa]
        client.query(SQL3, safeValues2).then(result3 =>{
          client.query(SQL2).then(result4 =>{
            // console.log(result4.rows)
            let results4 = result4.rows[0];
            getAppointmet(statu).then((result6)=>{     // apointment JOB 4 user & PASSED

              res.render("basics/results", {trueA : trueA, results : results4, appo : result6});
             })
          })
        })
      }
      else{ // Create new certi IF he hasnt it
        let SQL = `INSERT INTO certificates (user_name, img_url, certificat_name, mark, result, date) VALUES ($1,$2,$3,$4,$5,$6);`;
        let safeValues = [userIn.user,qSP,qSRes,trueA,statu,TDa]
        client.query(SQL, safeValues).then(result =>{
          // console.log('1st  ',result.rows)
          client.query(SQL2).then(result4 =>{
            let results4 = result4.rows;
            getAppointmet(statu).then((result6)=>{  
              // console.log(result6)
              res.render("basics/results", {trueA : trueA, results : results4, appo : result6});
             })
          })
        })
      }
    })


  
    }else{ // NOT user & PASSED
      let gResult = {
        user_name : 'guest',
        img_url : qSP,
        certificat_name : qSRes,
        mark : trueA,
        result : statu,
        date : TDa,       
      }
      getAppointmet(statu).then((result6)=>{     // apointment JOB 4 NOT user & PASSED
        // console.log(result6)
        res.render("basics/results", {trueA : trueA, results : gResult, appo : result6});
      })
    }  


    }else{ // user & NOT PASSED
      statu = `FAILL`;
      let failRes = {
        user_name : userIn.user,
        img_url : qSP,
        certificat_name : qSRes,
        mark : trueA,
        result : statu,
        date : TDa,
      }
      if(userIn.user != 'guest'){
      getAppointmet(statu).then((result6)=>{
        res.render("basics/results", {trueA : trueA, results : failRes, appo : result6});
       })
      }else{
      getAppointmet(statu).then((result6)=>{
        res.render("basics/results", {trueA : trueA, results : failRes, appo : result6});
       })
      }

    }
    
})

function getAppointmet(mark){
  if(mark == `PASSED`){
    
    let url = `https://jobs.github.com/positions.json?page=1&search=${qSResQ}`;

    return  superagent.get(url).then((result) => {
      let ques = [];
      for (let i = 0; i < 3; i++) {
        ques.push(result.body.splice((Math.floor(Math.random()*((result.body.length-1)-0+1))), 1)[0]);
      }
      // console.log(ques)
      return ques;
        })
  }else{
    let url = `https://api.coursera.org/api/courses.v1?q=search&query=${qSResQ}&fields=photoUrl,description,primaryLanguages,certificates,previewLink,categories`;

    return  superagent.get(url).then((result) => {
      let cour = [];
      for (let i = 0; i < 3; i++) {
        cour.push(result.body.elements.splice((Math.floor(Math.random()*((result.body.elements.length-1)-0+1))), 1)[0]);
      }
      // console.log(cour)
      return cour;
        })
  }

}

// constructor for the Work
function Quizze(item) {
  this.question = item.question,
  this.answers = item.answers,
  this.correct_answer = Object.entries(item.correct_answers).filter(item => item.includes("true"))[0][0].split('_').slice(0,2).join('_'),
  this.difficulty = item.difficulty
}

//////////////////////////////////////////////////// http req data /////////////////////////////////////////////////////
let user;
let pass;
let userIn = {};


server.post('/data', function(req, res){
  // console.log('body: ',  req.body);
  userIn.user = req.body.param;
  user = req.body.param;
  userIn.pass = req.body.param2;
  pass = req.body.param2;

});


//////////////////////////////////////////////////////// Sign ////////////////////////////////////////////////////////////////
server.get('/sign', (req, res)=>{
  // console.log(userIn)
  if(userIn.user == 'guest'){
    res.render("basics/sign")
  }else{
    
    res.render("basics/profile", { user : userIn, statue: true, passw : pass})
    console.log(userIn)
  }
  // res.render("basics/sign")
})


// sign in ////////////////////////////////////////////////////////////////////
server.post('/signin', (req, res)=>{
  const item = req.body;
  if(item.user_name == userIn.user && item.password == userIn.pass){
    let SQL1 = `SELECT * FROM detials WHERE user_name='${userIn.user}';`
    // let SQL2 = `SELECT * FROM users WHERE user_name='${userIn.user}' AND password='${userIn.pass}';`
    client.query(SQL1).then(result =>{
      userIn.userDetailsA = result.rows[0];
      assignCerti().then((resultz)=>{
        // console.log(userIn)
        res.render("basics/profile", { user : userIn, statue: true, passw : pass});
      })
    })
  }else{
    let SQL2 = `SELECT * FROM users WHERE user_name='${item.user_name}' AND password='${item.password}';`
    client.query(SQL2).then(result =>{
      // console.log(result.rows)
      if(result.rows.length == 0){
        res.render("basics/sign", {statue: false})
      }else{
        userIn.userDetailsA = result.rows[0];
        pass = item.password;
      let SQL3 = `SELECT * FROM detials WHERE user_name='${item.user_name}';`
        client.query(SQL3).then(resultssss =>{
          userIn.userDetailsB = resultssss.rows[0];
          assignCerti().then((resultz)=>{
            // console.log(userIn)
            res.render("basics/profile", { user : userIn, statue: true, passw : pass});
          })
          // console.log(userIn)
        })
        // console.log(userIn)
      }
    })
  }

})


// sign up ////////////////////////////////////////////////////////////////////
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
          userIn.userDetailsA = data3.rows[0];
          // pass = userIn.password;
          console.log(pass)
          res.render("basics/profile", { user : userIn, statue: true, passw : pass});
        })
      })
    }else{
      
      userIn.userDetailsA = data2.rows[0];
      // pass = userIn.password;
      // console.log(pass)
      res.render("basics/profile", { user : userIn, statue: true, passw : pass});
    }
   
  })
})


// sign out ////////////////////////////////////////////////////////////////////
server.get('/signOut', (req, res)=>{
  user = '';
  pass = '';
  userIn = {};
  res.render("basics/sign")
})




////////////////////////////////////////////////////// Profile ///////////////////////////////////////////////////////
server.get('/profile', (req, res)=>{
  if(userIn.user == 'guest'){
  res.redirect("/sign")
  }else{
    // console.log(userIn)
    assignCerti().then(()=>{
      res.render("basics/profile", { user : userIn, statue: true, passw : pass})
    })
  }
  
})


function assignCerti(){
  let SQL = `SELECT * FROM certificates WHERE user_name='${userIn.user}';`
  return client.query(SQL).then((results)=>{
    userIn.uCretri = results.rows;
    // console.log(userIn)
  })
}



////////////////////////////////////////////// update detils info ////////////////////////////////////////////////////////
server.post('/update', (req, res)=>{
  let {gender,major,bio,education,gitHub,twitar,linkedIn} = req.body;
  let SQL2 = `UPDATE detials SET user_name=$1,gender=$2,education=$3,major=$4,bio=$5,github=$6,twitar=$7,linkedIn=$8 WHERE user_name='${userIn.user}';`;
  let SQL3 = `SELECT * FROM detials WHERE user_name='${userIn.user}';`;
  let SQL4 = `INSERT INTO detials (user_name, gender, education, major, bio, github, twitar, linkedIn) VALUES($1, $2, $3, $4, $5, $6, $7, $8);`;
  let safeValues2 = [userIn.user,gender,education,major,bio,gitHub,twitar,linkedIn];


    client.query(SQL3).then((resultsss) => {
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
})





////////////////////////////////////////////////////  hireMe post /////////////////////////////////////////////////////////
server.get('/hireMe', (req, res)=>{
  let SQL = `SELECT * FROM hireme;`
  client.query(SQL).then((result) => {
    // console.log(result.rows)
    let employers = result.rows;
    assignCerti().then((resultz)=>{
      // console.log(result.rows)
      res.render("basics/hireme", { emplo : employers})
    })
  })
})



// update hireMe post /////////////////////////////////////////////////////////// 
server.post('/updateHireMe', (req, res)=>{
  let {user_name,education,major,email,twitar,github,linkedIn,descr} = req.body;
  let SQL1 = `SELECT * FROM hireme WHERE user_name='${userIn.user}';`
  let SQL2 = `UPDATE hireme SET user_name=$1,education=$2,major=$3,email=$4,twitar=$5,github=$6,linkedIn=$7,descr=$8 WHERE user_name='${userIn.user}';`
  let SQL3 = `INSERT INTO hireme (user_name, education, major, email, twitar, github, linkedIn, descr) VALUES($1, $2, $3, $4, $5, $6, $7, $8);`
  let safeValues = [userIn.user,education,major,email,twitar,github,linkedIn,descr];

  client.query(SQL1).then((resultsss) => {
    if(resultsss.rows.length == 0){
      // console.log(resultsss.rows);
      client.query(SQL3, safeValues).then(() => { res.redirect("/hireMe") })
    }else{
      console.log(resultsss.rows);
      
      client.query(SQL2, safeValues).then(() => { res.redirect("/hireMe") }) 
    }
  })
})





////////////////////////////////////////////////// About Us /////////////////////////////////////////////////////////////
server.get('/team',(req,res)=>{
res.render('basics/about-us');
});

server.get("/error", (req, res)=>{
  res.render('basics/error')
})
//////////////////////////////////////////////// defult Routs.. /////////////////////////////////////////////////////////
//  this is for all faild routes that the user might insert
server.get("*", (req, res) => {
  res.status(404).redirect("/error");
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


