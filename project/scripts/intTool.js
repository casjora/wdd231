//Footer info
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;

//Hamburger Menu
const mainnav =document.querySelector('.navigation');
const hammbutton=document.querySelector('#menu');

hammbutton.addEventListener('click',()=>{
    mainnav.classList.toggle('show');
    hammbutton.classList.toggle('show');
})

//QA Picture Cards


