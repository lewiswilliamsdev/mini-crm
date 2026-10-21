import './FilteredEnquiries.css'
function FilterEnquiries(props) {
    console.log()
    return (
        <div className='filter-container'>
        <h3>Enquiry Status</h3>
        <div className="filter-buttons">
            <button 
            className={props.filterStatus === 'All' ? "active-filter" : "filter-button"}
            value={'All'} 
            onClick={ (event) => props.onClick(event.target.value) }>
            All
            </button>

            <button
            className={props.filterStatus === 'Active' ? "active-filter" : "filter-button"}
            value={'Active'}
            onClick={ (event) => props.onClick(event.target.value) }
            >Active
            </button>

            <button
            className={props.filterStatus === 'Successful' ? "active-filter" : "filter-button"}
            value={'Successful'}
            onClick={ (event) => props.onClick(event.target.value) }
            >Successful
            </button>

            <button 
            className={props.filterStatus === 'Unsuccessful' ? "active-filter" : "filter-button"}
            value={'Unsuccessful'} 
            onClick={ (event) => props.onClick(event.target.value) }
            >Unsuccesful
            </button>

        </div>
        <p>Showing {props.filterStatus.toLowerCase()} enquiries</p>
        </div>
    )
}

export default FilterEnquiries