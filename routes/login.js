const express = require('express')

const router = express.Router();
const User = require('../models/Users')

router.get('/', (req, res) => {
    // obj={
    
    // username: "Yash",
    // email: "xyz@gmail.com",
    // password: "asdasdasdd"
    //     }
    
    console.log(req.body);
    const user= User(req.body);
    user.save();
    res.send(req.body);

})

module.exports= router;