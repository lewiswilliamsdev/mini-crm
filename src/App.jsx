import './App.css'

import Navbar from './components/Navbar/navbar'
import AddEnquiryForm from './components/AddEnquiryForm/form'
import EnquiryCard from './components/EnquiryCard/EnquiryCard';
import SearchEnquiries from './components/SearchEnquiries/SearchEnquiries'
import FilterEnquiries from './components/FilteredEnquiries/FilteredEnquires';
import DeleteConfirmation from './components/DeleteConfirmation/DeleteConfirmation'
import SortEnquiries from './components/SortEnquiries/SortEnquiries'
import EnquiryNotesModal from './components/EnquiryNotesModal/EnquiryNotesModal'

import { useState, useEffect } from 'react';

function App() {

  const  savedEnquiries = localStorage.getItem("customerEnquiries");

  let initialEnquiries;
  
  if (savedEnquiries === null) {
    initialEnquiries = []
  } else {
    const parsedEnquiries = JSON.parse(savedEnquiries);

    initialEnquiries = parsedEnquiries.map(function(enquiry) {
      if (Array.isArray(enquiry.notes)) {
        return enquiry;
      } else {
        return {
          ...enquiry,
          notes: []
        }
      }
    })
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
    notes: []
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

  const [sortOrder, setSortOrder] = useState("default")

  const alphabeticallySortedEnquiries = [...filteredEnquiries].sort((a, b) => {
    return a.company.localeCompare(b.company)
  })

  const reverseAlphabeticallySortedEnquiries = [...filteredEnquiries].sort((a, b) => {
    return b.company.localeCompare(a.company)
  })

  let sortedEnquiries = filteredEnquiries

  if (sortOrder === "a-z") {
    sortedEnquiries = alphabeticallySortedEnquiries;
  } else if (sortOrder === "z-a") {
    sortedEnquiries = reverseAlphabeticallySortedEnquiries;
  }

  const [enquiryToEdit, setEnquiryToEdit] = useState(null);
  const [enquiryNotesOpen, setEnquiryNotesOpen] = useState(null)

  const selectedEnquiry = customerEnquiries.find(function(enquiry){
    return enquiry.id === enquiryNotesOpen
  })

  const enquiryCards = sortedEnquiries.map(function(enquiry) {
    return < EnquiryCard 
    key={enquiry.id}
    enquiry={enquiry}
    className='enquiry-card'
    onUpdateStatus={updatedEnquiryStatus}
    onDelete={setEnquiryPendingDeletion}
    onEdit={setEnquiryToEdit}
    onNoteOpen={setEnquiryNotesOpen}
    />
  })

  useEffect(() => {
    localStorage.setItem("customerEnquiries", JSON.stringify(customerEnquiries));
  }, [customerEnquiries]);

  function updateEnquiry(enquiryId, updatedFormData) {
    setCustomerEnquiries(previousEnquiries => {
      return previousEnquiries.map(function(enquiry) {
        if (enquiry.id === enquiryId) {
          return {
            ...enquiry,
            company: updatedFormData.companyName,
            contact: updatedFormData.contactName,
            email: updatedFormData.contactEmail,
            phone: updatedFormData.contactPhone
          }
        } else {
          return enquiry
        }
      });
    });
  }

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
    <div className='filter-sort-options'>
    <FilterEnquiries
    onClick={setFilterStatus}
    filterStatus={filterStatus}
    />
    <SortEnquiries
    sortOrder={sortOrder}
    onChange={setSortOrder}
    />
    </div>
    <div className='enquiries-container'>
    <AddEnquiryForm 
    key={enquiryToEdit !== null ? enquiryToEdit.id : "new"}
    onAddEnquiry={addEnquiry} 
    enquiryToEdit={enquiryToEdit}
    onUpdateEnquiry={updateEnquiry}
    onFinishEditing={setEnquiryToEdit}
    />
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
    {enquiryNotesOpen !== null && selectedEnquiry !== undefined && (
      <EnquiryNotesModal
        onClose={() => {
          setEnquiryNotesOpen(null)
        }
        }
        enquiry={selectedEnquiry}
      />
    )}
    </>
    )
}

export default App