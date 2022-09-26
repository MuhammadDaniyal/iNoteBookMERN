const express = require('express');
const router = express.Router()
const { body, validationResult } = require('express-validator');
const fetchauthuser = require('../middleware/fetchauthuser');
const Note = require('../models/noteSchema')

// ROUTE:1 - get user all notes GET '/api/auth/fetchallnotes'  login required
router.get('/fetchallnotes', fetchauthuser, async (req, res) => {
    try {
        // user- authentic token user ki id save krenga as a foriegn key UserSchema sy
        const userNotes = await Note.find({ user: req.user._id })
        res.json(userNotes)
        // res.send('notes file')
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error')
    }
})

// ROUTE:1 - add user note GET '/api/auth/addnote'  login required
router.post('/addnote', fetchauthuser, [
    body('title').isLength({ min: 3 }),
    body('description').isLength({ min: 5 }),
], async (req, res) => {
    // validation - if there are error so return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, tag } = req.body;
    try {
        // console.log(req.user);
        const userNote = new Note({
            user: req.user._id, // authentic token user ki id save krenga as a foriegn key UserSchema sy
            title,
            description,
            tag,
        })
        const savedNotes = await userNote.save()
        res.json(savedNotes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error')
    }
})

// ROUTE:3 - update user note GET '/api/auth/updatenote/:id'  login required
router.put('/updatenote/:id', fetchauthuser, async (req, res) => {
    const { title, description, tag } = req.body
    try {
        // create new updated note object
        const newNote = {}
        if (title || description || tag) {
            newNote.title = title,
                newNote.description = description,
                newNote.tag = tag
        }
        // find the note to be updated and updated
        const currentNote = await Note.findById(req.params.id)
        if (!currentNote) { // id note does not exists 
            return res.status(404).send('note Not found ')

        } else if (currentNote.user.toString() !== req.user._id) { // currentNote.user or req.user ki id ki value same hogi to chlega mtlb yeh note usi user ka jisko update krrha ya nh 
            return res.status(401).send('access denied')

        } else { // authentic user wohi user jiska yeh note hy - 
            // updated in database
            const updatedNote = await Note.findByIdAndUpdate(currentNote._id, { // currentNote._id === req.params.id 
                $set: newNote
            }, { new: true })
            res.send(updatedNote)
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error')
    }
})

// ROUTE:4 - delete user note GET '/api/note/delete/:id'  login required
router.delete('/deletenote/:id', fetchauthuser, async (req, res) => {
    try {
        // find the note to be deleted and delete it
        const currentNote = await Note.findById(req.params.id)
        console.log(currentNote);
        if (!currentNote) { // id note does not exists 
            return res.status(404).send('note Not found ')

        } else if (currentNote.user.toString() !== req.user._id) { // currentNote.user or req.user ki id ki value same hogi to chlega mtlb yeh note usi user ka jisko delete krrha ya nh 
            return res.status(401).send('access denied')

        } else { // authentic user wohi user jiska yeh note hy - 
            // updated in database
            const deleteNote = await Note.findByIdAndDelete(currentNote._id, { new: true })
            res.send({ "success": "Note Deleted", deleteNote })
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error')
    }
})

module.exports = router;