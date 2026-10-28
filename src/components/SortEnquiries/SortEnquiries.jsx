import './SortEnquiries.css'

function SortEnquiries(props) {
    return (
        <select 
            name="sort-enquiries" 
            id="sort-enquiries"
            value={props.sortOrder}
            onChange={ (event) => props.onChange(event.target.value)}
        >
                <option 
                    value="default"
                >
                        Default
                </option>

                <option 
                    value="a-z"
                >
                        A-Z
                </option>

                <option 
                    value="z-a"
                >
                    Z-A
                </option>

        </select>
    )
}

export default SortEnquiries