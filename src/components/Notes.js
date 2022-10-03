import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NoteContext from '../context/notes/NoteContext'
import Addnotes from './Addnotes'
import Noteitem from './Noteitem'

const Notes = () => {
  const contextApi = useContext(NoteContext)
  const { notes, getNote, editNote } = contextApi;

  let navigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNote()
    }else{
      navigate('/login')
    }

    // eslint-disable-next-line 
  }, [])

  // useRef hooks means kisi bh dusra element  ko reference deskty ho
  const refEdit = useRef(null)
  const refClose = useRef(null)
  const [note, setNote] = useState({ _id: '', etitle: '', edescription: '', etag: '' })

  const updateNotePropfunc = (currNote) => {
    refEdit.current.click()
    setNote({
      _id: currNote._id,
      etitle: currNote.title,
      edescription: currNote.description,
      etag: currNote.tag
    })
    // setNote({currNote})
  }

  const noteHandleUpdate = (e) => {
    console.log("Updated note", note);
    editNote(note._id, note.etitle, note.edescription, note.etag)
    refClose.current.click()
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Addnotes />
      <button ref={refEdit} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3'>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name='etitle'
                    onChange={onChange}
                    value={note.etitle}
                    aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    onChange={onChange}
                    name='edescription'
                    value={note.edescription} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    onChange={onChange}
                    name='etag'
                    value={note.etag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary"
                onClick={noteHandleUpdate}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <h2>Your Note</h2>
        <div className='container mx-2'>
          {
            (notes.length === 0) && "No Notes to display"
          }
        </div>
        {
          notes.map((currElem) => { // aik user ky kafi notes honga islya sara fetch krna kalya map function 
            return <Noteitem key={currElem._id} updateNoteProps={updateNotePropfunc} note={currElem} /> // or current note jo bh hoga as a props jarha -current note
          })
        }
      </div>
    </>
  )
}

export default Notes