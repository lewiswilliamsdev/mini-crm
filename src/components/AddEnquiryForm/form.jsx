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

    const [formData, setFormData] = useState(
        props.enquiryToEdit !== null
        ? {
        companyName: props.enquiryToEdit.company,
        contactName: props.enquiryToEdit.contact,
        contactEmail: props.enquiryToEdit.email,
        contactPhone: props.enquiryToEdit.phone
        }
        : initialFormState
    );

    function handleSubmit(event) {
        event.preventDefault();

        const cleanedFormData = {
            ...formData,
            companyName: formData.companyName.trim(),
            contactName: formData.contactName.trim(),
            contactEmail: formData.contactEmail.trim(),
            contactPhone: formData.contactPhone.trim()
        }

        if (!formData.companyName.trim()) {
            setErrorMessage("Please provide company name")
            return;
        }

        if (!formData.contactName.trim()) {
            setErrorMessage("Please provide contact name")
            return;
        }

        if (!formData.contactEmail.trim() && !formData.contactPhone.trim()) {
            setErrorMessage("Please provide either an email address or phone number.");
            return;
        }

        setErrorMessage("");

        if (props.enquiryToEdit !== null) {
            props.onUpdateEnquiry(props.enquiryToEdit.id, cleanedFormData);
            props.onFinishEditing(null);
        } else {
            props.onAddEnquiry(cleanedFormData);
        }

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
    
            <button 
                type="submit" 
                className={props.enquiryToEdit !== null ? "edit-mode-button" : "add-mode-button"}
            >
                {props.enquiryToEdit !== null ? "Update Enquiry" : "Add Enquiry"}
            </button>

            {props.enquiryToEdit !== null && 
            <button
                type="button"
                className="cancel-edit-button"
                onClick={() => {
                    props.onFinishEditing(null)
                }}
            >
                Cancel Edit
            </button>}
        </form>
    );
}

export default AddEnquiryForm;
