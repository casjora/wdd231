const spotlightContainer = document.querySelector('#business-cards');

async function fetchMembers(){
    try{
        const response = await fetch('data/members.json');
        if (!response.ok) throw new Error('Failed to load JSON file');
        const data = await response.json();
        return data.members;
        
    } catch (error){
        console.error('Error fetching members: ',error);
    return[];    
}
}

function getRandomSpotlights (members,count=2){
    const eligible = members.filter(member => ['2','3'].includes(member.membership_l));
    if (eligible.lenght <= count) return eligible;
    const selected = [];
    while (selected.length < count){
        const random = eligible[Math.floor(Math.random()*eligible.length)];
        if (!selected.includes(random)) selected.push(random);

    }
    return selected;
}

function createSpotlightCard(member) {
    const card = document.createElement('div');
    card.classList.add('spotlight-card');
        const membershipLevel = document.createElement('p');
        let levelText = "Member"; // Default for 1 or other
        if (member.membership_l === "2") levelText = "Silver Member";
        if (member.membership_l === "3") levelText = "Gold Member";
        membershipLevel.textContent = `Membership: ${levelText}`;
        membershipLevel.classList.add(`membership-${member.membership_l}`);
    card.innerHTML = `
    <h3>${member.name}</h3>
    <img src="${member.image}" alt = "logo of ${member.name} loading = "lazy">
    <p><span>Phone:</span> ${member.phone_num}</p>
    <p><span>Address:</span> ${member.address}</p>
    <p><span>Website:</span> <a href="${member.url}" target = "_blanl"> ${member.url}</a></p>
    <p class="membership-level"><span>Level: </span>${levelText}</p>
    `;
    return card;
}

async function displaySpotlights(){
    const members = await fetchMembers();
    const spotlights = getRandomSpotlights(members,2);
    spotlightContainer.innerHTML = '';
    spotlights.forEach(member => {
        spotlightContainer.appendChild(createSpotlightCard(member));

    });
}

displaySpotlights();