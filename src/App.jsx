import './App.css'

import Navbar from './components/Navbar/navbar'
import AddEnquiryForm from './components/AddEnquiryForm/form'
import EnquiryCard from './components/EnquiryCard/EnquiryCard';
import SearchEnquiries from './components/SearchEnquiries/SearchEnquiries'
import FilterEnquiries from './components/FilteredEnquiries/FilteredEnquires';

import { useState } from 'react';

function App() {
  const [customerEnquiries, setCustomerEnquiries] = useState([])

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

  const [searchQuery, setSearchQuery] = useState("");

  const [filterStatus, setFilterStatus] = useState("All")

  const filteredEnquiries = customerEnquiries.filter(function(enquiry) {
    console.log(filterStatus);
    return enquiry.company.toLowerCase().includes(searchQuery.toLocaleLowerCase()) &&
    (filterStatus === 'All' || enquiry.status === filterStatus)
  })

  const enquiryCards = filteredEnquiries.map(function(enquiry) {
    return < EnquiryCard 
    key={enquiry.id}
    enquiry={enquiry}
    className='enquiry-card'
    onUpdateStatus={updatedEnquiryStatus}
    />
  })


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
    <AddEnquiryForm onAddEnquiry={addEnquiry}/>
    <div className='enquiry-cards'>
    {enquiryCards}
    </div>
    </div>
    </>
    )
}

export default App