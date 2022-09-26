const express = require('express')
const app = express()
const bcrypt = require('bcryptjs');
require('./db/connect')
const port = process.env.PORT || 8000

app.use(express.json())

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