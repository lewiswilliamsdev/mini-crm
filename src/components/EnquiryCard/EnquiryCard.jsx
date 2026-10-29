import './EnquiryCard.css';

import DeleteEnquiry from '../DeleteEnquiry/DeleteEnquiry';
import EditEnquiry from '../EditEnquiry/EditEnquiry';
import EnquiryNotes from '../EnquiryNotes/EnquiryNotes'

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

                <div className="enquiry-buttons">

                    < DeleteEnquiry 
                        onClick={() => {
                            props.onDelete(props.enquiry.id)
                        }}
                    />
    
                    <EditEnquiry
                        onClick={() => {
                            props.onEdit(props.enquiry);
                        }}
                    />

                    <EnquiryNotes 
                        onClick={() => {
                            props.onNoteOpen(props.enquiry.id)
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default EnquiryCard