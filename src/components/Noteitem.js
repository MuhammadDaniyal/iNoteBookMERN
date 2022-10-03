import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'

const Noteitem = (props) => {
    const contextApi = useContext(NoteContext)
    const { deleteNote } = contextApi
    const { note, updateNoteProps } = props; // as a props jo arha ussa fecth krrhy idhr  
    return (
        <>
            <div className='col-md-3'>
                <div className="card my-3" >
                    <div className="card-body">
                        <h5 className="card-title"> Title: {note.title}</h5>
                        <p className="card-text"> Description : <br /> {note.description}</p>
                        <div className="d-flex justify-content-end">
                            <i 
                                className="fa-regular fa-trash-alt mx-2"
                                // arrowFunc keoka argument derhy deleteNote ko - is particular note ki id dedo
                                onClick={()=>{deleteNote(note)}} ></i>  
                            <i className="fa-regular fa-pen-to-square mx-2" 
                                onClick={()=>{updateNoteProps(note)}} ></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Noteitem