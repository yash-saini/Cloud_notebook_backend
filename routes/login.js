const express = require('express')

const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/Users')
const bcrypt = require('bcryptjs')

const jwt =require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser')

const JWT_SECRET = 'Yashisagoodboy'

// ROUTE 1
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
    
    
        const salt= await bcrypt.genSalt(10);
        const secPassword =await  bcrypt.hash(req.body.password,salt);
        user= await User.create({username: req.body.username,
                     password:secPassword ,
                     email: req.body.email})
                    //  .then(user => res.json(user)).catch(err=>{console.log(err)
                    // res.json({error:'Please enter a unique values for email and username',message: err.message})});
    
               // res.json(user)
                const data ={user :{id:user.id}}

                const authtoken=jwt.sign(data,JWT_SECRET);
                console.log(authtoken);
                res.json({authtoken})

      }
   catch(error) {
    
    console.error(error.message);
    res.status(500).send("Some error occurred");

                }
})

// ROUTE 2
router.post('/auth', [
body('email','Enter a valid email').isEmail(),
body('password','Enter a valid password').isLength({min : 8 })
], async(req,res)=> {
    const errors= validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password}= req.body;
    try{
        let user = await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({error:"Wrong credentials"});
           
        }
        const matchpass= await bcrypt.compare(password,user.password);
        if(!matchpass)
        {
            return res.status(400).json({error:"Wrong credentials"});

        }
        const data={user:{id:user.id}}
        const authtoken=jwt.sign(data,JWT_SECRET);
        res.json({authtoken});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error occurred");
    
    }
})

//ROUTE 3 : GETTING LOGGED IN DETAILS

router.post('/getuser' , fetchuser,async(req,res)=> {
       
        try{
            let userID=req.user.id;
            const user = await User.findById(userID).select("-password");
            res.send(user);
        }
        catch(error){
            console.error(error.message);
            res.status(500).send("Internal server error occurred");
        
        }
    })
    

module.exports= router;