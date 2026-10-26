import './EditEnquiry.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

function EditEnquiry (props) {
    return (
        <button
            onClick= {props.onClick}
            className='enquiry-edit-button'>
            <FontAwesomeIcon icon={faPenToSquare} />
            Edit
        </button>
    )
}

export default EditEnquiry