const qas = [
    {
        qaName: "Aba Nigeria",
        location: "San Pedro Sula, Honduras",
        started: "2005, August, 7",
        Position: "QA Team Leader", // Updated Position
        pictureLoc: "images/qa1.jpg",
        account: ["Kelly","Cyracom","iTi"],
        funFact: "Is secretly amazing at salsa dancing and loves hiking near Lake Yojoa."
      },
      {
        qaName: "Maria Garcia",
        location: "Mexico City, Mexico",
        started: "2010, March, 15",
        Position: "QA Team Leader", // Updated Position
        pictureLoc: "images/qa2.jpg",
        account: ["Equiti"],
        funFact: "Collects vintage postcards from every city visited. Has over 300!"
      },
      {
        qaName: "John Smith",
        location: "London, UK",
        started: "2012, November, 22",
        Position: "QA Analyst", // Updated Position
        pictureLoc: "images/qa3.jpg",
        account: ["Cyracom","iTi"],
        funFact: "Can identify over 50 types of tea by smell alone. Favorite is Earl Grey."
      },
      {
        qaName: "Priya Sharma",
        location: "Bangalore, India",
        started: "2018, June, 1",
        Position: "QA Analyst", // Updated Position
        pictureLoc: "images/qa4.jpg",
        account: ["Cyracom"],
        funFact: "Is a regional Chess champion and makes incredibly spicy biryani."
      },
      {
        qaName: "Kenji Tanaka",
        location: "Tokyo, Japan",
        started: "2015, September, 10",
        Position: "QA Analyst", // Updated Position
        pictureLoc: "images/qa5.jpg",
        account: ["Equiti"],
        funFact: "Practices calligraphy and builds intricate Gundam models on weekends."
      },
      {
        qaName: "Fatima Rossi",
        location: "Rome, Italy",
        started: "2019, February, 28",
        Position: "QA Analyst", // Updated Position
        pictureLoc: "images/qa6.jpg",
        account: ["Kelly"],
        funFact: "Speaks conversational Italian and makes the best homemade pasta carbonara."
      },
      {
        qaName: "David Miller",
        location: "Sydney, Australia",
        started: "2011, July, 4",
        Position: "QA Analyst", // Updated Position
        pictureLoc: "images/qa7.jpg",
        account: ["Kelly","Equiti"],
        funFact: "Once surfed with dolphins at Byron Bay (and has photos to prove it!)."
      },
      {
        qaName: "Sofia Petrova",
        location: "Kyiv, Ukraine",
        started: "2021, January, 19",
        Position: "QA Analyst", // Updated Position
        pictureLoc: "images/qa8.jpg",
        account: ["Equiti"],
        funFact: "Expert baker known locally for her intricate Pysanky egg designs."
      },
      {
        qaName: "Ahmed Hassan",
        location: "Cairo, Egypt",
        started: "2016, May, 5",
        Position: "QA Analyst", // Updated Position
        pictureLoc: "images/qa9.jpg",
        account: ["Equiti"],
        funFact: "Fascinated by ancient history; volunteers at the Egyptian Museum on Saturdays."
      },
      {
        qaName: "Isabelle Dubois",
        location: "Paris, France",
        started: "2013, October, 31",
        Position: "QA Analyst", // Updated Position
        pictureLoc: "images/qa10.jpg",
        account: ["Kelly"],
        funFact: "Has a small but growing collection of vintage French comic books (bandes dessinées)."
      }
    ];

createQAcard();

function createQAcard(){
    qas.forEach(qa =>{
        let card = document.createElement("section");
        card.setAttribute("class","qaPhoto");
        let img = document.createElement("img");
        let name = document.createElement("h3");
        let textBox = document.createElement("div");
        textBox.setAttribute("class","textBox");
        let location = document.createElement("p");
        let startDate = document.createElement("p");
        let position = document.createElement("p");
        
        let funF = document.createElement("p");

        name.textContent =qa.qaName;
        location.innerHTML = `<span class="label">Location:</span> ${qa.location}`;
        startDate.innerHTML = `<span class="label">Start Date:</span> ${qa.started}`;
        position.innerHTML = `<span class="label">Position:</span> ${qa.Position}`;
        img.setAttribute("src",qa.pictureLoc);
        img.setAttribute("alt",qa.qaName);
        img.setAttribute("loading","lazy");
        funF.innerHTML = `<span class="label">Fun Fact:</span> ${qa.funFact}`;

        card.appendChild(img);
        card.appendChild(textBox);
        textBox.appendChild(name);
        textBox.appendChild(location);
        textBox.appendChild(startDate);
        textBox.appendChild(position);
        textBox.appendChild(funF);

        document.querySelector(".img-container").appendChild(card);
    })
}
