const courses =[
    {code: "WDD 130",name:"Web Fundamentals",credits:2,completed:true},
    {code: "WDD 231",name:"Frontend Development I",credits:2,completed:true},
    {code: "WDD 330",name:"Web Frontend II",credits:2,completed:true},
    {code: "CSE 111",name:"Programming with Functions",credits:2,completed:true},
    {code: "CSE 210",name:"Programming Structures",credits:2,completed:true},
    {code: "CSE 121b",name:"JavaScript Language",credits:2,completed:true},
];

const courseList= document.getElementById('course-list');
const totalCredits = document.getElementById('total-credits');

function displayCourses(filter){
    courseList.innerHTML = '';
    let filtered =courses;
    if (filter ==='WDD') filtered = courses.filter(c=> c.code.startsWith('WDD'));
    else if (filter==='CSE') filtered = courses.filter(c => c.code.startsWith('CSE'));

    filtered.forEach(course =>{
        const div = document.createElement('div');
        div.setAttribute("class","courses");
        div.textContent = `${course.code}: ${course.name} (${course.credits}) credits`;
        courseList.appendChild(div);
    });

    const total = filtered.reduce((sum,c)=> sum + c.credits,0);
    totalCredits.textContent = total;
}

document.querySelectorAll('.filters button').forEach(button => {
    button.addEventListener('click',()=>{
        displayCourses(button.dataset.filter);

    });
});

displayCourses('all');