import './SearchEnquiries.css'
function SearchEnquiries(props) {

    return (
        <div className="search-enquiries">
            <input 
            type="search" 
            placeholder="Search by company name..."
            value={props.searchQuery}
            onChange={ (event) => props.onSearchChange(event.target.value) }
            />
        </div>
    )
}

export default SearchEnquiries