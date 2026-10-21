import './EnquiryCard.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faTrash } from '@fortawesome/free-solid-svg-icons';

function EnquiryCard(props) {
    return (
        <div className='enquiry-card'>
            <div className='card-main-info'>
            <h3>{props.enquiry.company}</h3>
            <p 
            className={`status ${props.enquiry.status.toLowerCase()}`}>
            {props.enquiry.status}</p>
            </div>
            <div className='card-secondary-info'>
            <p>{props.enquiry.contact}</p>
            <p>{props.enquiry.email}</p>
            <p>{props.enquiry.phone}</p>
            </div>
            <div className='edit-enquiry-options'>
                <select name="enquiry-statuses" 
                id="enquiry-statuses" 
                value={props.enquiry.status}
                onChange={(event) => props.onUpdateStatus(props.enquiry.id, event.target.value)}  >
                    <option value="Active">Active</option>
                    <option value="Successful">Successful</option>
                    <option value="Unsuccessful">Unsuccessful</option>
                </select>
                <button 
                className='enquiry-delete-button'>
                    {<i class="fa-solid fa-trash"></i>}
                    <FontAwesomeIcon icon={faTrash} />
                    Delete
                </button>
            </div>
        </div>
    );
}

export default EnquiryCard