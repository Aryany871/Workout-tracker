const Workout = require("../models/Workouts");
const mongoose = require("mongoose");

//GET all workouts
const getWorkouts = async (req,res)=>{
    
    try{
        const workouts = await Workout.find().sort({createdAt:-1});
        res.status(200).json(workouts);
    }
    catch(err){
        res.status(404).json({error: err.message});
    }
}

//GET a specific workout
const getWorkout = async (req,res)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return  res.status(404).json({error: "No such workout"});
    }

    const workout = await Workout.findById(req.params.id);
    if(!workout){
        return res.status(404).json({error: "No such workout"});
    }

    res.status(200).json(workout);
}

//CREATE a new workout
const createWorkout = async (req,res)=>{
    const {title, reps, load} = req.body;
    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(!load){
        emptyFields.push('load')
    }

    if(emptyFields.length>0){
        res.status(400).json({error: "Please fill in all fields", emptyFields})
    }

    //add doc to db
    try{
        const workout = await Workout.create({title, reps, load});
        res.status(200).json(workout);
    }catch(err){
        res.status(400).json({error: err.message});
    }
}

//DELETE a specific workout
const deleteWorkout = async (req,res)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return  res.status(404).json({error: "No such workout"});
    }

    const workout = await Workout.findByIdAndDelete(req.params.id);
    if(!workout){
        return res.status(404).json({error: "No such workout"});
    }
    res.status(200).json(workout);
}

//UPDATE a specific workout
const updateWorkout = async (req,res)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return  res.status(404).json({error: "No such workout"});
    }

    const workout = await Workout.findByIdAndUpdate(req.params.id,{
    ...req.body 
    });
    
    if(!workout){
        return res.status(404).json({error: "No such workout"});
    }

    res.status(200).json(workout);
    
}

module.exports = {getWorkouts,getWorkout,createWorkout,deleteWorkout,updateWorkout};