document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    const localStorageKey = 'subsTotalCount'; // Use a consistent key
    // Make sure 'subsCount' matches the actual ID in your HTML span
    const countDisplayElement = document.getElementById('subscount');
    const formElement = document.querySelector('.wf1'); // Select form using class

    // --- Function to Display Current Count ---
    function displayCurrentCount() {
        // Check if the display element was found
        if (!countDisplayElement) {
            console.error("Display element with ID 'subsCount' not found in HTML.");
            return; // Stop if element doesn't exist
        }

        let countToShow = 0; // Default count

        // Check if localStorage is supported
        if (typeof(Storage) !== "undefined") {
            // Get the count, default to 0 if not found
            countToShow = localStorage.getItem(localStorageKey) || 0;
            console.log(`Retrieved count from localStorage: ${countToShow}`);
        } else {
            console.warn("LocalStorage is not supported by this browser.");
        }

        // Update the text content of the span *here*
        countDisplayElement.textContent = `${countToShow}`;
    }

    // --- Function to Handle Form Submission ---
    // Defined inside DOMContentLoaded to access variables like localStorageKey
    function handleSubmit(event) {
        console.log("Form submit event triggered.");

        // Optional: Add validation logic here
        // if (validationFails) {
        //    event.preventDefault(); // Stop submission
        //    return;
        // }

        // Check if localStorage is supported before updating
        if (typeof(Storage) !== "undefined") {
            // Get current count, parse as Integer, default to 0
            let currentCount = parseInt(localStorage.getItem(localStorageKey) || 0);

            // Increment count
            currentCount++;

            // Store updated count
            localStorage.setItem(localStorageKey, currentCount);
            console.log(`Incremented count. New count stored: ${currentCount}`);

            // Optional: Update display immediately
            if (countDisplayElement) {
                countDisplayElement.textContent = `${currentCount}`;
            }
        } else {
            console.warn("LocalStorage not supported. Count not incremented.");
        }
        // Allow the form to submit to thankyou.html by default
        // If you wanted JS-only handling, call event.preventDefault() earlier
    }

    // --- Initial Setup ---
    // 1. Display the initial count when the page loads
    displayCurrentCount();

    // 2. Add the submit event listener to the form
    // Check if the form element was found before adding listener
    if (formElement) {
        formElement.addEventListener('submit', handleSubmit);
        console.log("Submit event listener added to form.");
    } else {
        console.error("Form element with class 'wf1' not found in HTML.");
    }

}); // End of DOMContentLoaded listener
