import './EnquiryActivityModal.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function EnquiryActivityModal(props) {
    return (
        <div className="enquiry-activity-overlay">
            <div className="enquiry-activity-content">
                <div className="enquiry-activity-heading">
                    <h2>Activity History</h2>
                    <p>{props.enquiry.company}</p>
                </div>
                <div className="enquiry-activity-list">
                    <h3>Activity List</h3>
                    {props.enquiry.activityHistory.length === 0 && (
                        <p>No activity history</p>
                    )}
                        {props.enquiry.activityHistory.length >= 1 && (
                            <ul>
                            {props.enquiry.activityHistory.map(function(activity) {
                                return <li
                                    className="activity-container"
                                    key={activity.id}
                                >
                                    <div className="activity-heading">
                                        <h4>Status Changed</h4>
                                        <time dateTime={activity.createdAt}>
                                            {new Date(activity.createdAt).toLocaleString("en-GB")}
                                        </time>
                                    </div>
                                    <div className="activity-details">
                                        <p>{activity.oldValue}</p>
                                        <FontAwesomeIcon icon={faArrowRight} />
                                        <p>{activity.newValue}</p>
                                    </div>
                                </li>
                            })
                            }
                            </ul>
                        )}
                </div>
                <button
                    className='activity-close-button'
                    onClick={() => {
                        props.onClose()
                    }}
                >
                    Close
                </button>
            </div>
        </div>
    )
}

export default EnquiryActivityModal