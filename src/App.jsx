import './App.css'

import Navbar from './components/Navbar/navbar'
import AddEnquiryForm from './components/AddEnquiryForm/form'
import EnquiryCard from './components/EnquiryCard/EnquiryCard';
import SearchEnquiries from './components/SearchEnquiries/SearchEnquiries'
import FilterEnquiries from './components/FilteredEnquiries/FilteredEnquires';
import DeleteConfirmation from './components/DeleteConfirmation/DeleteConfirmation'

import { useState, useEffect } from 'react';

function App() {

  const  savedEnquiries = localStorage.getItem("customerEnquiries");

  let initialEnquiries;
  
  if (savedEnquiries === null) {
    initialEnquiries = []
  } else {
    initialEnquiries = JSON.parse(savedEnquiries)
  }

  const [customerEnquiries, setCustomerEnquiries] = useState(initialEnquiries)

  function addEnquiry(formData) {

  const newEnquiry = {
    id: crypto.randomUUID(),
    company: formData.companyName,
    contact: formData.contactName,
    email: formData.contactEmail,
    phone: formData.contactPhone,
    status: "Active",
  }

  setCustomerEnquiries(previousEnquiries => [
    newEnquiry,
    ...previousEnquiries
  ])
  }

  function updatedEnquiryStatus(enquiryId, newStatus) {
    setCustomerEnquiries(previousEnquiries => {
      const matchingEnquiries = previousEnquiries.map(function(enquiry){
        if (enquiry.id === enquiryId) {
          const updatedEnquiry = {
            ...enquiry,
            status: newStatus
          }
          return updatedEnquiry;
        }

        return enquiry;
      })

      return matchingEnquiries;
    })
  }

  const [enquiryPendingDeletion, setEnquiryPendingDeletion] = useState(null)

  function deleteEnquiry(enquiryId) {
    const updatedCustomerEnquiries = customerEnquiries.filter(function(enquiry) {
    return enquiry.id !== enquiryId
  })

  setCustomerEnquiries (updatedCustomerEnquiries)
}

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All")

  const filteredEnquiries = customerEnquiries.filter(function(enquiry) {
    return enquiry.company.toLowerCase().includes(searchQuery.toLocaleLowerCase()) &&
    (filterStatus === 'All' || enquiry.status === filterStatus)
  })

  const enquiryCards = filteredEnquiries.map(function(enquiry) {
    return < EnquiryCard 
    key={enquiry.id}
    enquiry={enquiry}
    className='enquiry-card'
    onUpdateStatus={updatedEnquiryStatus}
    onDelete={setEnquiryPendingDeletion}
    onEdit={setEnquiryToEdit}
    />
  })

  useEffect(() => {
    localStorage.setItem("customerEnquiries", JSON.stringify(customerEnquiries));
  }, [customerEnquiries]);

  const [enquiryToEdit, setEnquiryToEdit] = useState(null);

    return (
    <>
    <Navbar title= "Sarahs CRM" />
    <SearchEnquiries
    searchQuery={searchQuery}
    onSearchChange={setSearchQuery}
    />
    {customerEnquiries.length === 0 && (
    <p className='search-message'>No enquiries added yet.</p>
    )}
    {customerEnquiries.length >= 1 && filteredEnquiries.length === 0 && (
      <p className='search-message'>No enquiries found matching your search.</p>
    )}
    <FilterEnquiries
    onClick={setFilterStatus}
    filterStatus={filterStatus}
    />
    <div className='enquiries-container'>
    <AddEnquiryForm 
    onAddEnquiry={addEnquiry} 
    enquiryToEdit={enquiryToEdit}/>
    <div className='enquiry-cards'>
    {enquiryCards}
    </div>
    </div>
    {enquiryPendingDeletion !== null && 
    <DeleteConfirmation 
    onCancel={() => setEnquiryPendingDeletion(null)} 
    onConfirmDelete={() => {
      deleteEnquiry(enquiryPendingDeletion);
      setEnquiryPendingDeletion(null);
    }
    }
    />
    }
    </>
    )
}

export default App