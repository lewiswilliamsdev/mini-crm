import './EnquiryActivity.css'

import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function EnquiryActivity(props) {
    return (
        <button
        className='enquiry-activity-button'
        onClick={props.onClick}
        >
            <FontAwesomeIcon icon={faClockRotateLeft} />
            Activity
        </button>
    )
}

export default EnquiryActivity