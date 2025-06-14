const qasContainer = document.querySelector('.img-container');
const modal = document.getElementById('qa-modal');
const modalContent = document.getElementById('modal-content');
const closeModalBtn = document.getElementById('modal-close-btn');

async function fetchQAs() {
    try {
        const response = await fetch('data/qas.json');
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const qas = await response.json();
        displayQAs(qas);
    } catch (error) {
        console.error('Error fetching QA data:', error);
        qasContainer.innerHTML = '<p>Sorry, we could not load the QA team data at this time.</p>';
    }
}

function displayQAs(qas) {
    qasContainer.innerHTML = ''; // Clear previous content
    qas.forEach(qa => {
        const card = document.createElement('section');
        card.className = 'qaPhoto';
        card.innerHTML = `
            <img src="${qa.pictureLoc}" alt="${qa.qaName}" loading="lazy" width="200" height="200">
            <div class="textBox">
                <h3>${qa.qaName}</h3>
                <p><span class="label">Position:</span> ${qa.position}</p>
                <p><span class="label">Location:</span> ${qa.location}</p>
            </div>
        `;
        
        card.addEventListener('click', () => {
            displayModal(qa);
        });

        qasContainer.appendChild(card);
    });
}

function displayModal(qa) {
    modalContent.innerHTML = `
        <h3>${qa.qaName}</h3>
        <p><span class="label">Position:</span> ${qa.position}</p>
        <p><span class="label">Start Date:</span> ${qa.started}</p>
        <p><span class="label">Accounts:</span> ${qa.accounts.join(', ')}</p>
        <p><span class="label">Fun Fact:</span> ${qa.funFact}</p>
    `;
    modal.showModal();
}

export function initHomePage() {
    fetchQAs();
    
    closeModalBtn.addEventListener('click', () => {
        modal.close();
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.close();
        }
    });
}