document.addEventListener('DOMContentLoaded', () => {
    // Get the container where the data will be displayed
    const displayContainer = document.getElementById('formDataDisplay');

    if (displayContainer) {
        // Create a URLSearchParams object from the current URL's query string
        const params = new URLSearchParams(window.location.search);

        // Define the required fields to display
        const fieldsToDisplay = {
            'fname': 'First Name',
            'lname': 'Last Name',
            'email': 'Email',
            'phone': 'Mobile Phone',
            'business': 'Business Name',
            'membership': 'Membership Level',
            'timestamp': 'Submission Time'
        };

        let hasData = false;
        
        // Loop through the fields and display their values
        for (const [key, label] of Object.entries(fieldsToDisplay)) {
            if (params.has(key)) {
                hasData = true;
                const value = params.get(key);
                const p = document.createElement('p');

                // Special formatting for timestamp
                if (key === 'timestamp') {
                    const date = new Date(value);
                    p.innerHTML = `<strong>${label}:</strong> ${date.toLocaleString()}`;
                } 
                // Capitalize membership level
                else if (key === 'membership' && value === 'np') {
                     p.innerHTML = `<strong>${label}:</strong> Non-Profit`;
                }
                else if (key === 'membership') {
                     p.innerHTML = `<strong>${label}:</strong> ${value.charAt(0).toUpperCase() + value.slice(1)}`;
                }
                else {
                    p.innerHTML = `<strong>${label}:</strong> ${value}`;
                }
                
                displayContainer.appendChild(p);
            }
        }
        
        // If no data was found in URL, show a message
        if (!hasData) {
            displayContainer.innerHTML = '<p>No application data found. Please submit the form correctly.</p>';
        }
    }
});
