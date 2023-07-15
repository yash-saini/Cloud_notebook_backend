const express = require('express')
const router = express.Router();


router.get('/', (req, res) => {
  obj ={ id : 12,
number : 345}
res.json(obj);
})

module.exports= router;