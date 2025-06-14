const localStorageKey = 'subsTotalCount';
const countDisplayElement = document.getElementById('subscount');
const formElement = document.querySelector('.wf1');

function displayCurrentCount() {
    if (!countDisplayElement) return;

    let countToShow = 0;
    if (typeof(Storage) !== "undefined") {
        countToShow = localStorage.getItem(localStorageKey) || 0;
    }
    countDisplayElement.textContent = `${countToShow}`;
}

function handleSubmit(event) {
    if (typeof(Storage) !== "undefined") {
        let currentCount = parseInt(localStorage.getItem(localStorageKey) || 0);
        currentCount++;
        localStorage.setItem(localStorageKey, currentCount);
        if (countDisplayElement) {
            countDisplayElement.textContent = `${currentCount}`;
        }
    }
}

export function initJoinPage() {
    displayCurrentCount();
    if (formElement) {
        formElement.addEventListener('submit', handleSubmit);
    }
}