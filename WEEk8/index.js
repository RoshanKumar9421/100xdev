const express = require('express');
const mongoose=require('mongoose');
const JWT=require('jsonwebtoken');

const app = express();

app.post("user/signup", function(req, res){
     res.json({
        message:"signup endpoin"
     })
});

app.post("user/signin", function(req,res){
    res.json({
        message:"signin endpoint"
    })
});

app.get("/user/purchases", function(req, res){
    res.json({
        message:"signup endpoint"
    })
});

app.post("/course/purchase", function(req, res){
    res.json({
        message:"vni"
    })
});

app.get("/courses", function(req, res){
    res.json({
        message:"von"
    })
})

app.listen(3000);