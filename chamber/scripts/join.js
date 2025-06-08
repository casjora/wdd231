document.addEventListener('DOMContentLoaded', () => {
    const timestampField = document.getElementById('formLoadTimestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    const learnMoreLinks = document.querySelectorAll('.learn-more');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-button');

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
        }
    }

    function closeModal(modal) {
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // Add click event listeners to "Learn More" links
    learnMoreLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent page from jumping to top
            const modalId = link.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    // Add click event listeners to close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });

    // Close modal if user clicks outside the modal content
    window.addEventListener('click', (event) => {
        modals.forEach(modal => {
            if (event.target == modal) {
                closeModal(modal);
            }
        });
    });
});
