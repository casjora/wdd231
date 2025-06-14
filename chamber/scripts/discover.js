document.addEventListener('DOMContentLoaded', () => {
    // 1. Handle Visitor Last Visit Message
    const visitorMessageContainer = document.getElementById('visitor-message');
    const lastVisit = localStorage.getItem('lastVisitDate');
    const now = Date.now();

    if (!lastVisit) {
        visitorMessageContainer.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = parseInt(lastVisit, 10);
        const timeDiff = now - lastVisitDate;
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        if (daysDiff < 1) {
            visitorMessageContainer.textContent = "Back so soon! Awesome!";
        } else {
            const dayText = daysDiff === 1 ? "day" : "days";
            visitorMessageContainer.textContent = `You last visited ${daysDiff} ${dayText} ago.`;
        }
    }

    // Store the current visit date
    localStorage.setItem('lastVisitDate', now.toString());


    // 2. Fetch and Display Discover Cards
    const discoverContainer = document.getElementById('discover-cards');
    const discoverDataURL = 'data/discover.json';

    async function fetchDiscoverData() {
        try {
            const response = await fetch(discoverDataURL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            displayDiscoverCards(data.places);
        } catch (error) {
            console.error('Error fetching discover data:', error);
            discoverContainer.innerHTML = '<p>Sorry, attractions could not be loaded at this time.</p>';
        }
    }

    function displayDiscoverCards(places) {
        discoverContainer.innerHTML = ''; // Clear previous content
        places.forEach(place => {
            const card = document.createElement('div');
            card.className = 'discover-card';

            card.innerHTML = `
                <figure>
                    <img src="${place.image}" alt="${place.name}" loading="lazy" width="300" height="200">
                </figure>
                <div class="discover-card-content">
                    <h2>${place.name}</h2>
                    <address>${place.address}</address>
                    <p>${place.description}</p>
                    <a href="#" class="learn-more-btn">Learn More</a>
                </div>
            `;
            discoverContainer.appendChild(card);
        });
    }

    fetchDiscoverData();
});