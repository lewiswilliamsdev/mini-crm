import './EnquiryNotesModal.css'

import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

    function EnquiryNotesModal(props) {
    
        const [addNotesOpen, setAddNotesOpen] = useState(false);
        const [newNoteContent, setNewNoteContent] = useState("");
        const [noteError, setNoteError] = useState("");
        const [noteBeingEdited, setNoteBeingEdited] = useState(null);
    
        function handleSaveNote(event) {
            event.preventDefault();
    
            if (newNoteContent.trim() === "") {
            setNoteError("Please enter a note before saving.");
            return;
            }

            if (noteBeingEdited === null) {
                props.onSaveNote(props.enquiry.id, newNoteContent.trim());
            } else {
                props.onUpdateNote(props.enquiry.id, noteBeingEdited, newNoteContent.trim());
            }
    
            setNewNoteContent("");
            setAddNotesOpen(false);
            setNoteBeingEdited(null);
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
                        return <div className="note-container" 
                        key={note.id}
                        >
                            <p>
                                {note.content}
                            </p>
                            <button
                                className='edit-note-button'
                                onClick={() => {
                                    setNoteBeingEdited(note.id)
                                    setNewNoteContent(note.content)
                                    setAddNotesOpen(true)
                                }}
                            >
                                <FontAwesomeIcon icon={faPenToSquare} />
                                Edit
                            </button>
                            <button
                                className='delete-note-button'
                                onClick={() => props.onDelete(props.enquiry.id, note.id)}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                                Delete
                            </button>
                        </div>
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
                    className={addNotesOpen ? "add-notes-button cancel-note" : "add-notes-button"}
                    onClick={() => {
                        setAddNotesOpen(!addNotesOpen)
                        setNoteBeingEdited(null)
                        setNewNoteContent("")
                        setNoteError("")
                    }}
                >
                    {addNotesOpen === false &&
                    <p>Add a new note</p>
                    }
                    {addNotesOpen === true &&
                    <p
                    >Cancel Note</p>
                    }
                </button>
                {addNotesOpen === true &&
                <div className="add-note-form">
                    <form
                    onSubmit={handleSaveNote}
                    >
                        <textarea 
                        value={newNoteContent}
                        onChange={ (event) => {
                            setNewNoteContent(event.target.value)
                            setNoteError("")
                        }}
                        />
                        <button 
                        type='submit'
                        >
                            {noteBeingEdited === null ? "Save note" : "Save changes"}
                        </button>
                    </form>

                    {noteError && <p>{noteError}</p>}
                </div>
                }
            </div>
        </div>
    )
}

export default EnquiryNotesModal