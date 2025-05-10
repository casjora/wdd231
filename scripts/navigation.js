const mainnav =document.querySelector('.navigation');
const hammbutton=document.querySelector('#menu');

hammbutton.addEventListener('click',()=>{
    mainnav.classList.toggle('show');
    hammbutton.classList.toggle('show');
})