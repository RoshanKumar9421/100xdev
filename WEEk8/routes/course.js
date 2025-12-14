const {Router} = require("express");

const courseRouter = Router();

courseRouter.post("/purchase", function(req, res){
    res.json({
        message:"vni"
    })
});

courseRouter.get("/preview", function(req, res){
    res.json({
        message:"von"
    })
});

module.exports={
    courseRouter:courseRouter
}
