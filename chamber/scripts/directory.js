document.addEventListener('DOMContentLoaded', getMemberData);

const membersDisplay = document.getElementById('cards');
const gridViewBtn = document.getElementById('grid-view');
const listViewBtn = document.getElementById('list-view');

const membersData ="data/members.json";

let membersList =[];


async function getMemberData() {
    try{
  const response = await fetch(membersData);
  if (!response.ok){
    throw new Error(`HTTP Error! status: ${response.status}`)
  }
  

  const data = await response.json(); 
  membersList = data.members;
  displayMembers(membersList);
  } catch (error){
    console.error("Error fetching member info:",error);

    if (membersDisplay){
        membersDisplay.innerHTML = "<p>Sorry, member data failed to load. Try again later.</p>";
    }
  }
}

function displayMembers(members){
    if (!membersDisplay){
        console.error("member display area cards not working");
        return;
    }

    membersDisplay.innerHTML=""; //Cleans prior content

    members.forEach(member => {
        const memberElement = document.createElement('section');
        memberElement.classList.add('member-card');//main class for stylesheet

        const image = document.createElement('img');
        image.src = member.image;
        image.alt = `${member.name} Logo`;
        image.loading = "lazy";
        
        const name=document.createElement('h3');
        name.textContent= member.name;

        const address = document.createElement('p');
        address.textContent = member.address;

        const phone = document.createElement ('p');
        phone.textContent = `Phone: ${member.phone_num}`;

        const website = document.createElement ('a');
        website.href = member.url;

        website.textContent = "Visit Website";
        website.target = "_blank"; //TO open in new tab

        const membershipLevel = document.createElement('p');
        let levelText = "Member"; // Default for 1 or other
        if (member.membership_l === "2") levelText = "Silver Member";
        if (member.membership_l === "3") levelText = "Gold Member";
        membershipLevel.textContent = `Membership: ${levelText}`;
        membershipLevel.classList.add(`membership-${member.membership_l}`); // For potential level-specific styling

        const joiningDate = document.createElement('p');
        joiningDate.textContent = `Member since: ${member.join_date}`;

        memberElement.appendChild(image);
        memberElement.appendChild(name);
        memberElement.appendChild(address);
        memberElement.appendChild(phone);
        memberElement.appendChild(website);
        memberElement.appendChild(membershipLevel);
        memberElement.appendChild(joiningDate);
        
        membersDisplay.appendChild(memberElement);
    });
}

// Event Listeners for view toggle
gridViewBtn.addEventListener('click', () => {
    membersDisplay.classList.add('grid-view');
    membersDisplay.classList.remove('list-view');
    gridViewBtn.classList.add('active-view');
    listViewBtn.classList.remove('active-view');
});

listViewBtn.addEventListener('click', () => {
    membersDisplay.classList.add('list-view');
    membersDisplay.classList.remove('grid-view');
    listViewBtn.classList.add('active-view');
    gridViewBtn.classList.remove('active-view');
});


// Initial data load when the script runs
getMemberData();