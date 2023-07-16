const express = require('express')

const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/Users')

router.post('/', [body('username','Enter a valid username').isLength({min : 5}),
body('email','Enter a valid email').isEmail(),
body('password','Enter a valid password').isLength({min : 8 })
]

,async (req, res) => {
    
    const errors= validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }
    
 
    try {    //check for unique emails
        let user= await User.findOne({email: req.body.email});
        if (user)
        {
            return res.status(400).json({error: "Sorry a user with the same email already exists"})
        }
    
        //check for unique username
        user= await User.findOne({username: req.body.username})
    
        if (user)
        {
            return res.status(400).json({error: "Sorry a user with the same username already exists"})
        }
    
    
    
        
        user= await User.create({username: req.body.username,
                     password: req.body.password,
                     email: req.body.email})
                    //  .then(user => res.json(user)).catch(err=>{console.log(err)
                    // res.json({error:'Please enter a unique values for email and username',message: err.message})});
    
                res.json(user)
      }
   catch(error) {
    
    console.error(error.message);
    res.status(500).send("Some error occurred");

                }
})

module.exports= router;