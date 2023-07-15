const express = require('express')

const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/Users')

router.post('/', [    body('username','Enter a valid username').isLength({min : 5}),
body('email','Enter a valid email').isEmail(),
body('password','Enter a valid password').isLength({min : 8 })

]
,(req, res) => {
    
    const errors= validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }
    User.create({username: req.body.username,
                 password: req.body.password,
                 email: req.body.email}).then(user => res.json(user)).catch(err=>{console.log(err)
                res.json({error:'Please enter a unique values for email and username',message: err.message})
                
                
                });


})

module.exports= router;