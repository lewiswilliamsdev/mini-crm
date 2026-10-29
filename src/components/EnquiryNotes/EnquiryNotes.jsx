import './EnquiryNotes.css'

import { faNoteSticky } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function EnquiryNotes (props) {
    return (
        <button 
        className='enquiry-notes-button'
        onClick={props.onClick}
        >
            <FontAwesomeIcon icon={faNoteSticky} />
            View Notes
        </button>
    )
}

export default EnquiryNotes