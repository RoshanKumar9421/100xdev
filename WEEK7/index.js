

const express = require("express");
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "MaiNahiBataunga"
const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://yadavroshankumar8271_db_user:<RYJ06lnLFcSfRnaB>@cluster0.a2o3vtc.mongodb.net/todo-apps123")                 

const app = express()

app.use(express.json())                         

app.post("/signup", async function(req, res){
    const email = req.body.email;               
    const password = req.body.password;
    const name = req.body.name;
    
    await UserModel.create({                    
        email: email,
        password: password,
        name: name
    })

    res.json({
        message: "you are logged in! "
    })
    
});

app.post("/signin", async function(req, res){
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({              
        email: email,
        password: password
    })

    if(user){                                          
        const token = jwt.sign({
            id: user._id.toString()                     
        }, JWT_SECRET);
        res.json({
            token: token
        });
    }
    else{
        res.status(403).json({
            message: "Incorrect Credentials"
        })
    }
});



app.post("/todo", auth, async function(req, res){          
    const userId = req.userId;                       
    const title = req.body.title                  
    await TodoModel.create({                        
        title,                                     
        userId,
        done
    })
    res.json({
        message: "Todo created!"
    })
});

app.get("/todos", auth, async function(req, res){           
    const userId = req.userId;                              
    
    const todos = await TodoModel.find({                    
        userId
    })
    
    res.json({
        todo                                                
    })

});

function auth(req, res, next){                              
    const token = req.headers.token

    const decodedData = jwt.verify(token, JWT_SECRET)

    if(decodedData){
        req.userId = decodedData.id;                         
        next();
    }
    else{
        req.status(403).json({
            message: "Incorrect Credentials !"
        })
    }
}


app.listen(3000);