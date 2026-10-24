import './DeleteConfirmation.css'
function DeleteConfirmation(props) {
    return (
        <div className="delete-confirmation-message">
            <p>
                Are you sure you want to delete this enquiry?
            </p>
            <button
            onClick={props.onCancel}
            >
                Cancel
            </button>
            <button
                onClick={props.onConfirmDelete}
            >
                Confirm Delete
            </button>
        </div>
    )
}

export default DeleteConfirmation