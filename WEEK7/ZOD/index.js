const express = require("express");
const mongoose = require("mongoose");
const jwt= require("jsonwebtoken");
const bcrypt= require("bcryptjs");
const {UserModel, TodoModel} = require("./db");
const JWT_SECRET="roshankumar";
const {z} = require("zod");
const { email } = require("zod/v4");

const app = express();
app.use(express.json());

mongoose.connect("");


app.post("/signup", async function(req, res){

    const requireBody = z.object({
        email:z.string().min(3).max(100).email(),
        name:z.string().min(3).max(100),
        password:z.string().min(3).max(100)
    })

    const parseDataSuccess= requireBody.safeParse(req.body);

    if(!parseDataSuccess.success){
        res.json({
            message:"Incorrect Format",
            error: parseDataSuccess.error
        })
        return
    }

    const email = req.body.email;
    const password=req.body.password;
    const name= req.body.name;

    let errorThrown = false;
    try{
        const hashedPassword= await bcrypt.hash(password,5)

        await UserModel.create({
            email:email,
            password:hashedPassword,
            name:name
        });
    } catch(e){
        res.json({
            "message":"User already exist!"
        });
        errorThrown=true
    }

    if(!errorThrown){
        res.json({
            "message":"You are signed up!"
        });
    }

});

app.post("/signin", async function(req, res){
  
    const username= req.body.username;
    const password= req.body.password;

});

app.get("/todo", function(req, res){

});

app.get("/todos", function(req, res){

})

app.listen(3000); //audbubcuivrfryivfyurbbcroshan k hsuiuhbhvbobuyrytyy