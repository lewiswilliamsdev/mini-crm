import './EnquiryNotesModal.css'

import { useState } from 'react'

function EnquiryNotesModal(props) {

    const [addNotesOpen, setAddNotesOpen] = useState(false)
    const [newNoteContent, setNewNoteContent] = useState("")
    const [noteError, setNoteError] = useState("")

    function handleSaveNote(event) {
        event.preventDefault();

        if (newNoteContent.trim() === "") {
        setNoteError("Please enter a note before saving.");
        return;
    }
    }

    return (
        <div className='notes-modal-overlay'>
            <div className="notes-modal-content">
                <h2>{props.enquiry.company}</h2>
                {props.enquiry.notes.length === 0 && (
                    <p>No notes added yet</p>
                )}
                {props.enquiry.notes.length >= 1 && (
                    props.enquiry.notes.map(function(note) {
                        return <p
                        key={note.id}
                        >
                            {note.content}
                        </p>
                    })
                )}
                <button 
                className='close-notes-modal-button'
                onClick={() => {
                    props.onClose()
                }}
                >
                    Exit
                </button>
                <button 
                    className='add-notes-button'
                    onClick={() => {
                        setAddNotesOpen(!addNotesOpen)
                    }}
                >
                    Add a new note
                </button>
                {addNotesOpen === true &&
                <div className="add-note-form">
                    <form
                    onSubmit={() => {
                            handleSaveNote()
                        }}
                    >
                        <textarea 
                        value={newNoteContent}
                        onChange={ (event) => {
                            setNewNoteContent(event.target.value)
                        }}
                        />
                        <button 
                        type='submit'
                        >
                            Save Note
                        </button>
                        </form>
                </div>
                }
            </div>
        </div>
    )
}

export default EnquiryNotesModal