const express = require('express')
const app = express()
const cors = require('cors')
const bcrypt = require('bcryptjs');
require('./db/connect')
const port = process.env.PORT || 8000

app.use(express.json())
app.use(cors()) // direct browser sy api call marni hoto error fix krna cors policy ka

// we links the router files to make our route easy
// Express Router Middleware Setup - api create on auth file 
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get('/',(req, res)=>{
    res.send('app home')
})

app.listen(port,()=>{
    console.log(`server listen at ${port}`);
})