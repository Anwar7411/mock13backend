const express=require('express');
const cors = require("cors");
const randomWords = require('random-words');
require('dotenv').config();

const { connection } = require('./server');
const { UserModel } = require('./models/User.model');

const app=express();
app.use(express.json())
app.use(cors({
    origin: '*'
}))

app.post("/adduser",async (req,res)=>{
    const userdata=req.body;
    try{
        const laptopadddata=await UserModel.create(userdata);
        res.send("User added Successfully")
    }
    catch(err){
        console.log(err)
        res.send("Error in posting data please try again later!")
    }
})

app.get("/user",async (req,res)=>{
   
    try{
        const userss=await UserModel.find();
        res.send(userss)
    }
    catch(err){
        console.log(err)
        res.send("Error in getting data please try again later!")
    }
})

app.get("/quiz",async (req,res)=>{
    const difficulty=req.query.difficulty;

    if(difficulty=="easy"){
        
        let word=await randomWords();
        res.send(word)
    }else if(difficulty=="medium"){
        let word=await randomWords({exactly: 1,maxLength: 6});
        res.send(word)
    }else if(difficulty=="hard"){
        let word=await randomWords({exactly: 1,maxLength: 8});
        res.send(word)
    }
})


app.listen(8080,async ()=>{
    try{
        await connection;
        console.log("Connected to DataBase")
    }
    catch(err){
        console.log("Error in Connecting DB");
        console.log(err)
    }
    console.log("Listening on port 8080")
})