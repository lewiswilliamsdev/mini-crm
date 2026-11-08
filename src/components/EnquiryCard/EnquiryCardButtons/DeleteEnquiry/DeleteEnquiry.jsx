import './DeleteEnquiry.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faTrash } from '@fortawesome/free-solid-svg-icons';

function DeleteEnquiry (props) {
    return (
        <button
            onClick= {props.onClick}
            className='enquiry-delete-button'>
            <FontAwesomeIcon icon={faTrash} />
            Delete
        </button>
    )
}

export default DeleteEnquiry