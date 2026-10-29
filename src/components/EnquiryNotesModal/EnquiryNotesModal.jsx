import './EnquiryNotesModal.css'

function EnquiryNotesModal(props) {
    return (
        <div>
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
            props.onClose()}
        }
        >
            Close
        </button>
        </div>
    )
}

export default EnquiryNotesModal