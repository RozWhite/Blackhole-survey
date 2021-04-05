let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//connect to our Book Model
let Survey = require('../models/survey');


/* GET Route for the Book list page - READ operation*/
router.get('/', (req,res,next)=>{
    Survey.find((err, surveyList)=>{
        if (err){
            return console.error(err);
        } else{
            //console.log(BookList);
            res.render('surveys/list', 
            {title: 'Surveys', 
            SurveyList: surveyList,
            displayName: req.user ? req.user.displayName : ''});

        }
    });
});

/* GET Route for displaying Take survey page - CREATE operation*/
router.get('/take/:id', (req,res,next)=>{
    let id = req.params.id;
    Survey.findById(id, (err, surveyToTake)=>{
        if (err){
            console.log(err);
            res.end(err);
        } else {
            res.render('surveys/take', {title: 'Take a Survey', survey: surveyToTake});
        }
    });
});

router.post('/take/:id', (req,res,next)=>{
    res.redirect('/survey-list');
});

/* GET Route for displaying Add page - CREATE operation*/
router.get('/add', (req,res,next)=>{
    res.render('surveys/add', {title: 'Add Survey'});
});
/* POST Route for processing Add page - CREATE operation*/
router.post('/add', (req,res,next)=>{
    let id = req.params.id;
    let name = req.body.name;
    let choices = [];
    let questions = req.body.questions;
    for (let i = 0; i < questions.length; i++){
        choices[i] = req.body["choices" + `${i}`];
    }
    let newSurvey = Survey({
        "name": name,
        "questions": questions,
        "choices": choices
    });

    Survey.create(newSurvey, (err, Survey)=>{
        if (err){
            console.log(err);
            res.end(err);
        }else{
            res.redirect('/survey-list');
        }
    });
});
/* GET Route for displaying the Edit page - Update operation*/
router.get('/edit/:id', (req,res,next)=>{
    let id = req.params.id;
    Survey.findById(id, (err, surveyToEdit) =>{
        if(err){
            console.log(err);
            res.end(err);
        }else {
            //show edit view
            res.render('surveys/edit', {title: "Edit Survey", survey: surveyToEdit});
        }
    });
});
/* POST Route for processing the Edit page - Update operation*/
router.post('/edit/:id', (req,res,next)=>{
    let id = req.params.id;
    let name = req.body.name;
    let choices = [];
    let questions = req.body.questions;
    for (let i = 0; i < questions.length; i++){
        choices[i] = req.body["choices" + `${i}`];
    }
    let updateSurvey = Survey({
        "_id": id,
        "name": name,
        "questions": questions,
        "choices": choices
    });

    Survey.updateOne({_id:id}, updateSurvey, (err)=>{
        if (err){
            console.log(err);
            res.end(err);
        }else{
            res.redirect('/survey-list');
        }
    });
});
/* GET Route to perform Deletion - DELETE operation*/
router.get('/delete/:id', (req,res,next)=>{
    let id = req.params.id;
    Survey.remove({_id:id}, (err) =>{
        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.redirect('/survey-list');
        }
    });
    
});




module.exports = router;