import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'


const Addnotes = () => {
    const contextApi = useContext(NoteContext)
    const { addNote } = contextApi

    const [note, setNote] = useState({ title: '', description: '', tag: '' })

    const noteHandleClick = (e) => {
        e.preventDefault() // dubara page reload na krde form submit ky bd
        addNote(note)
        setNote({ title: '', description: '', tag: '' })
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="row my-3 d-flex justify-content-center align-items-center">
                <div className='col-12 col-md-4'>

                    <h2>Add Note</h2>
                    <form className='my-3'>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name='title'
                                onChange={onChange}
                                value={note.title}
                                aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                onChange={onChange}
                                value={note.description}
                                name='description' />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tag" className="form-label">Tag</label>
                            <input
                                type="text"
                                className="form-control"
                                id="tag"
                                onChange={onChange}
                                value={note.tag}
                                name='tag' />
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={noteHandleClick}>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Addnotes