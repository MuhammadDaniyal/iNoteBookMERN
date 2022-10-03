require('dotenv').config()
const express = require('express')
const router = express.Router()
const User = require('../models/userSchema')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const fetchauthuser = require('../middleware/fetchauthuser');

// ROUTE:1 - create a user using: POST '/api/auth' doesn't require authentication
router.post('/createuser', [
    body('name').isLength({ min: 3 }),
    body('email', 'enter a valid email').isEmail(), // custom error msg 
    body('password').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    // validation - if there are error so return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { name, email, password, date } = req.body
        // check user already exists email
        const userExist = await User.findOne({ email: email })
        if (userExist) {
            return res.status(400).json({ success, error: 'already User exist, provide unique email' })
        } else {
            // convert into hash password
            const salt = await bcrypt.genSalt(10)
            const passwaordHash = await bcrypt.hash(password, salt)

            // create new user
            const userDoc = new User({ name, email, password: passwaordHash, date })

            // middleware
            const token = await userDoc.generateToken()
            res.json({ success: true, token })

            await userDoc.save()
            // console.log(userDoc)
        }
    } catch (error) {
        // res.status(500).json(error.message)
        res.status(500).json({ success, message: 'server Error Occured' })
    }
})


// ROUTE:2 - Authenticate a user using: POST '/api/auth/login' no login required
router.post('/login', [
    body('email', 'enter a valid email').isEmail(), // custom error msg 
    body('password', 'password can not be blank').exists(), // custom error msg 
], async (req, res) => {
    let success = false;
    const { email, password } = req.body
    // validation - if there are error so return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // check user are exist
        const registeredUser = await User.findOne({ email: email })
        // check password are match with hash password
        const passwordMatch = await bcrypt.compare(password, registeredUser.password)

        if (!registeredUser || !passwordMatch) {
            return res.status(400).json({ success, error: 'Invalid Details credentials' })
        } else {

            // middleware
            const token = await registeredUser.generateToken()

            res.json({ success: true, token })

            // console.log('User login');

            // res.send(registeredUser)
        }


    } catch (error) {
        console.log(error.message)
        res.status(500).json({ success, message: 'internal server Error' })
    }
})


// ROUTE:3 - get user details POST '/api/auth/getuser'  login required

router.get('/getuser', fetchauthuser, async (req, res) => {
    try {
        const userID = req.user
        const authUser = await User.findById({ _id: userID._id }).select('-password')
        res.send(authUser)

    } catch (error) {
        console.log(error.message)
        res.status(500).send('internal server Error')
    }
})

module.exports = router; 