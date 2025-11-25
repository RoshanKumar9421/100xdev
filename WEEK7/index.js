const express = require("express");
const {UserModel, TodoModel}=require("./db");
const jwt= require("jsonwebtoken");
const mongoose = require("mongoose")
const JWT_SECRET="roshankumar@123"


mongoose.connect("cluster0.olt0t7f.mongodb.net/todo-roshan123")
const app = express();
app.use(express.json());

app.post("/signup",  async function(req, res){
    const username= req.body.username;
    const password = req.body.password;
    const name= req.body.name;
    
    await User.create({
        email:email,
        password:password,
        name:name
     })

     res.json({
        message:"You are logged inf"
     })
});

app.post("/signin", async function(req, res){

    const email =req.body.username;
    const password=req.body.password;

    const user= await UserModel.findOne({
        email:email,
        password:password
    })

    console.log(user);

    if(user){
        const token = jwt.sign({
            id:user._id
        }, JWT_SECRET);
        res.json({

        });
    } else{
        res.status(403).json({
            message:"incorrect credentials"
        })
    }

});

app.post("/todo", function(req, res){

});

app.post("/todos", function(req, res){

});

app.listen(3000);