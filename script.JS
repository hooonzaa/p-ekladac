
var savedCards = JSON.parse(localStorage.getItem("cards")) || [];


function createCard() {

    var englishInput = document.getElementById("válec").value;
    var czechInput = document.getElementById("krychle").value;
    var explanationInput = document.getElementById("pomeranč").value;

    if (!englishInput || !czechInput || !explanationInput) {
        alert("Všechna pole musí být vyplněna!"); 
        return; 
    }

    
    var card = { english: englishInput, czech: czechInput, explanation: explanationInput };

   
    savedCards.push(card);

   
    localStorage.setItem("cards", JSON.stringify(savedCards));

    displayCards();

    document.getElementById("válec").value = "";
    document.getElementById("krychle").value = "";
    document.getElementById("pomeranč").value = "";
}

function removeCard(index) {
    savedCards.splice(index, 1); 
    localStorage.setItem("cards", JSON.stringify(savedCards)); 
    displayCards(); 
}


function displayCards() {
    var cardContainer = document.getElementById("cardContainer");
    cardContainer.innerHTML = "";

    savedCards.forEach(function(card, index) {
        var cardElement = document.createElement("div");
        cardElement.classList.add("flip-card");

        var innerElement = document.createElement("div");
        innerElement.classList.add("flip-card-inner");

        var frontElement = document.createElement("div");
        frontElement.classList.add("flip-card-front");
        frontElement.innerHTML = "<p>" + card.english + "</p>"; 

        var backElement = document.createElement("div");
        backElement.classList.add("flip-card-back");
        backElement.innerHTML = "<h1>" + card.czech + "</h1><p>" + card.explanation + "</p>"; 
        cardElement.addEventListener("click", function() {
            cardElement.classList.toggle("flipped");
        });

     
        var removeButton = document.createElement("button");
        removeButton.innerText = "Remove";
        removeButton.addEventListener("click", function(event) {
            event.stopPropagation();
            removeCard(index);
        });

        backElement.appendChild(removeButton);

        innerElement.appendChild(frontElement);
        innerElement.appendChild(backElement);

        cardElement.appendChild(innerElement);

        cardContainer.appendChild(cardElement);
      
    });
}

displayCards();
