const express = require('express');
const TestRoute = express.Router();


//home
TestRoute.get("/", (req, res)=>{
    res.send({
        message: "hello world!",
    });
})



module.exports = TestRoute;