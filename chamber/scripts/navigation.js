const mainnav =document.querySelector('#animateme');
const hammbutton=document.querySelector('#menu');

hammbutton.addEventListener('click',()=>{
    mainnav.classList.toggle('show');
    hammbutton.classList.toggle('show');
})