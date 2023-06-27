const express = require("express");
const { Mongoose } = require("mongoose");
const app = express();
const mongoose = require("mongoose");
const workoutRouter = require("./routes/workouts");
require("dotenv").config();


//middleware

//to parse incoming requests in json format - returns an object 
app.use(express.json());

//to log request details
app.use((req,res,next)=>{
    console.log(req.path, req.method);
    next();
});

//routes
app.use('/api/workouts', workoutRouter);

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        //listen to server requests
        app.listen(process.env.PORT,()=>{
            console.log("Connected to mongoDB and listening on port",process.env.PORT);
        });
    })
    .catch((err)=>{
        console.log(err);
    })
