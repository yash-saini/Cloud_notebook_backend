const connector=require("./db")
connector()

const express = require('express')
const app = express()
const port = 5000

app.use(express.json()) //middleware
//Routes which are present
app.use('/login', require('./routes/login'))
app.use('/usernotes', require('./routes/usernotes'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})