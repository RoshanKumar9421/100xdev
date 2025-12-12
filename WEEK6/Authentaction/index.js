const express =require('express');

const app = express();
app.use(express.json());

const users = []

function generateToken(){
    return Math.random();
}

app.post("/signup", function(req, res){

    const username = req.query.username;
    const password=req.query.password;

    users.push({
        username:username,
        password:password
    })

    res.json({
        message: "you are sign in"
    })


});

app.post("/signin", function(req, res){

     const username=req.query.username;
     const password = req.query.password;

     let founduser=null;

     for(let i=0; i<users.length; i++){
        if(users[i].username==username && users[i].password==password){
            founduser=users[i];
        }
     }

     if(founduser){
        
        const token=generateToken();
         founduser.token=token;

        res.json({
           
            token:token
        })
     }
     else{
        res.status(403).send({
            message:"Invalid username or password"
        })
     }
    

});



app.get("/me", (req, res) => {
    const token = req.headers.authorization;
    const user = users.find(user => user.token === token);
    if (user) {
        res.send({
            username: user.username
        })
    } else {
        res.status(401).send({
            message: "Unauthorized"
        })
    }
})

app.listen(3000); // the server is runing on port 3000