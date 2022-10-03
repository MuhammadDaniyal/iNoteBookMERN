import React, { useState } from 'react'
import NoteContext from './NoteContext'

const NoteState = (props) => {
    const host = 'http://localhost:8000'
    const notesInital = []
    const [notes, setNotes] = useState(notesInital)

    // get all Note
    const getNote = async () =>{
        // API Calls
        const url = `${host}/api/notes/fetchallnotes`
        const response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        // console.log(json);
        setNotes(json)  
    }

    // Add a Note
    const addNote = async ({title, description, tag}) =>{ // object destructuring of note 
        // API Calls
        const url = `${host}/api/notes/addnote`
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header - as a json bhejdya body backend ma
        });
        // yhn tk database ma data add hogya front hand sy

        const json = await response.json(); // parses JSON response into native JavaScript objects

        setNotes(notes.concat(json)) // concat return an array , push update an array
    }
    
    
    // Edit a Note
    const editNote = async (_id, title, description, tag) =>{
        // API Calls
        const url = `${host}/api/notes/updatenote/${_id}`
        const response = await fetch(url, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
        });
        const json = response.json(); // parses JSON response into native JavaScript objects

        // creating deep copy of notes - for current updation in frontend side
        const newNote = JSON.parse(JSON.stringify(notes))
        // Logic to edit an client
        for (let index = 0; index < newNote.length; index++) {
            const element = newNote[index];
            // const newNotes ={}
            if (element._id === _id) {
                element.title = title
                element.description = description
                element.tag = tag
                break;
            }
        }
        setNotes(newNote)
    }
    
    // Delete a Note
    const deleteNote = async ({_id}) =>{
        // API Calls
        const url = `${host}/api/notes/deletenote/${_id}`
        const response = await fetch(url, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        // const json = await response.json();
        
        const newNotes = notes.filter((note)=>{ // note means specific note from notes
            return note._id !== _id
        })
        setNotes(newNotes)
    }

    return (
        <>
            {/* jo bh chez dusra component ko provide krni usy value ma daldo - means export in value object for using different components*/}
            <NoteContext.Provider value={{notes, addNote, editNote, deleteNote, getNote}}>
                {props.children}
            </NoteContext.Provider>
        </>
    )
}

export default NoteState