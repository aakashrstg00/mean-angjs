const express = require('express');
const router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://rastogi:rastogi@ds163016.mlab.com:63016/mytasklist_rastogi',['tasks']);

router.get('/tasks',(req,res,next)=>{
    db.tasks.find().sort({isDone:1, _id:-1},(err,tasks)=>{
        if(err){
            next(err);
        }
        else{
            res.json(tasks);
        }
    });
});

router.get('/task/:id',(req,res,next)=>{
    db.tasks.findOne({_id:mongojs.ObjectId(req.params.id)},(err,task)=>{
        if(err){
            res.send(err);
        }
        else{
            res.json(task);
        }
    });
});

// delete task
router.delete('/task/:id',(req,res,next)=>{
    db.tasks.remove({_id:mongojs.ObjectId(req.params.id)},(err,task)=>{
        if(err){
            res.send(err);
        }
        else{
            res.json(task);
        }
    });
});

// update task
router.put('/task/:id',(req,res,next)=>{
    var task = req.body;
    var updTask = {};

    if(task.title){
        updTask.title = task.title;
        if(task.isDone.toString()){
            updTask.isDone = task.isDone;
        }
        else{
            updTask = null;
        }
    }

    if(!updTask){
        res.status(400);
        res.json({
            error:"bad data"
        });
    }
    else{
        console.log(updTask,req.params.id);
        db.tasks.update({_id:mongojs.ObjectId(req.params.id)},updTask,{},(err,task)=>{
            if(err){
                res.send(err);
            }
            else{
                res.json(task);
                console.log(task);
            }
        });
    }
});

router.post('/task',(req,res,next)=>{
    var task = req.body;
    console.log(task);
    if(task.title && task.isDone.toString()){
        db.tasks.save(task,(err,task)=>{
            if(err){
                res.send(err);
            }
            else{
                res.json(task);
            }
        });
    }
    else{
        res.status(400);
        res.json({
            error:"bad data"
        });
    }
});

module.exports = router;