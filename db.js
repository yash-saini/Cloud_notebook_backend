
const mongoose=require('mongoose')
const mongURL= "mongodb://localhost:27017/Notes"
mongoose.connect(mongURL)

const connect_To_Mongoose=async ()=>
{
    //const check=await fetch(mongURL)
    console.log("Inside function")
    //const data=await check.json()

}
module.exports=connect_To_Mongoose