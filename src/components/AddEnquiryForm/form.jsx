import "./addEnquiryForm.css";
import { useState } from "react";

const initialFormState = {
        companyName: "",
        contactName: "",
        contactEmail: "",
        contactPhone: ""
    };
function AddEnquiryForm(props) {
    const [errorMessage, setErrorMessage] = useState("");

    const [formData, setFormData] = useState(initialFormState);

    function handleSubmit(event) {
        event.preventDefault();

        if (!formData.contactEmail.trim() && !formData.contactPhone.trim()) {
            setErrorMessage("Please provide either an email address or phone number.");
            return;
        }

        setErrorMessage("");

        props.onAddEnquiry(formData);

        setFormData(initialFormState);
    }

    return (
        <form id="add-enquiry-form" onSubmit={handleSubmit}>
            <label htmlFor="company-name-input">Company Name</label>
            <input
                type="text"
                value={formData.companyName}
                onChange={(event) => {
                    setFormData(previousData => ({
                        ...previousData,
                        companyName: event.target.value
                    }));
                }}
                placeholder="e.g Greenfield Gym"
                required
                id="company-name-input"
            />

            <label htmlFor="contact-name-input">Contact Name</label>
            <input
                type="text"
                value={formData.contactName}
                onChange={(event) => {
                    setFormData(previousData => ({
                        ...previousData,
                        contactName: event.target.value
                    }));
                }}
                placeholder="John Smith"
                id="contact-name-input"
            />

            <label htmlFor="contact-email-input">Contact Email</label>
            <input 
            type="email" 
            value={formData.contactEmail} 
            onChange={ (event) => {
                setFormData(previousData => ({
                    ...previousData,
                    contactEmail: event.target.value
                }));
            }}
            placeholder="greenfield@example.com" 
            id="contact-email-input"/>

            <label htmlFor="contact-phone-input">Contact Phone</label>
            <input 
            type="tel" 
            value={formData.contactPhone}
            onChange={ (event) => {
                setFormData(previousData => ({
                    ...previousData,
                    contactPhone: event.target.value
                })) ;
            }}
            placeholder="07345 234256"
            id="contact-phone-input"
            />

            {errorMessage && <p>{errorMessage}</p>}
    
            <button type="submit">Add Enquiry</button>
        </form>
    );
}

export default AddEnquiryForm;
