const container = document.querySelector(".container");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;

// Displays current score of 0 at start of the game
document.querySelector(".score").textContent = score;

// Creates two of each type of card and assigns a name and image to each type
for (let index = 1; index <= 9; index++) {
    cards.push({"name": index, "image": "images/cardicons/icon" + index + ".png"});
    cards.push({"name": index, "image": "images/cardicons/icon" + index + ".png"});
}

// Randomizes the order of the cards and assigns images
shuffleCards();
generateCards();

// Randomizes the cards order by shuffling the index of the list items
function shuffleCards() {
    cards = cards.sort(() => Math.random() - 0.5);
}

// Generates the HTML element that contains each card's class and image
function generateCards() {
    for (let card of cards) {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.setAttribute("data-name", card.name);
        cardElement.innerHTML = `
            <div class = "front">
                <img class = "front-pic" src = ${card.image} />
            </div>
            <div class = "back"></div>
        `;
        container.appendChild(cardElement);
        cardElement.addEventListener("click", flipCard);
    }
}

// Checks if card can be flipped and flips if passes all checks, then checks if card is first
// or second flipped, and determines if two cards flipped is a match
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flipped");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    
    lockBoard = true;
    
    checkMatch();
}

// Checks the name of the cards against each other and unflips the cards if there is no match and subtracts 1 point, 
// or locks the cards facing forward if it is a match and adds 10 points.
function checkMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    if (isMatch) {
        disableCards();
        score+=10;
        document.querySelector(".score").textContent = score;
    }
    
    else {
        unflipCards();
        score-=1;
        document.querySelector(".score").textContent = score;
    }
}

// Locks the cards from being clicked again if currently flipped then resets for user input
function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard();
}

// flips both chosen cards back over after short delay
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetBoard();
    }, 1000);
}

// sets chosen cards to null so user can choose two new cards, with short delay to prevent user from
// spam flipping cards
function resetBoard() {
    firstCard = null;
    secondCard = null;
    setTimeout(() => {
        lockBoard = false;
    }, 500);
}

// resets game to start, and reloads the application
function restart() {
    resetBoard();
    shuffleCards();
    generateCards();
    score = 0;
    document.querySelector(".score").textContent = score;
    container.innerHTML = "";
    location.reload();
}