const mongoose = require('mongoose')
const DB = 'mongodb://localhost:27017/inotebook'

mongoose.connect(DB)
.then(()=> console.log('connection successfull..'))
.catch((err)=> console.log('connection not successfull..'))