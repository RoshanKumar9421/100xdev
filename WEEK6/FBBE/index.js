const express = require('express')
const jwt = require("jsonwebtoken");


const JWT_SECRET ="roshan1234";


const app=express();
app.use(express.json());

const users = [];

function logger(req, res, next){
    console.log(req.method+"request came");
    next();
}

app.post("/signup", logger,function(req, res){
    const username=req.body.username
    const password=req.body.password
    users.push({
        username:username,
        password:password,
    })

    res.json({
        message:"You are signed in"
    })
})

app.post("/signin",logger, function(req,res){
     const username=req.body.username
    const password=req.body.password

    let founduser=null;

    for(let i=0; i<users.length; i++){
        if(users[i].username==username && users[i].password==password){
            founduser=users[i];
        }
    }

    if(!founduser){
        res.json({
            message:"Credentials incorrect"
        })
        return
    }else{
        const token =jwt.sign({
            username:"roshan"
        }, JWT_SECRET);

        res.json({
            token:token
        })
    }

})

function auth(req, res, next){
    const token = req.headers.token;
    const decodeData=jwt.verify(token, JWT_SECRET);

    if(decodeData.username){
        req.username=decodeData.username;
        next()
    }else{
        res.json({
            message:"you are logged in"
        })
    }
}



app.get("/me",logger,auth, function(req, res){
    

    
        let founduser=null;

        for(let i=0; i<users.length; i++){
            if(users[i].username==req.username){
                founduser=users[i]
            }
        }
        res.json({
            username: founduser.username,
            password:founduser.password
        })
   
})



 app.listen(3000);