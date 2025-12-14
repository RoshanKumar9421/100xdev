const {Router} = require("express");

const courseRouter = Router();

courseRouter.post("/course/purchase", function(req, res){
    res.json({
        message:"vni"
    })
});

courseRouter.get("/courses", function(req, res){
    res.json({
        message:"von"
    })
});

module.exports={

}
