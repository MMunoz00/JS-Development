const container = document.querySelector(".container");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;

document.querySelector(".score").textContent = score;

// fetch("./data/cards.json")
//     .then((res) => res.json());
//     .then((data) => {
//         cards = [...data, ...data];
//         shuffleCards();
//         generateCards();
//     });

for (let index = 1; index <= 9; index++) {

    cards.push({"name": index, "image": "images/cardicons/icon" + index + ".png"});
    cards.push({"name": index, "image": "images/cardicons/icon" + index + ".png"});
}

shuffleCards();
generateCards();


// function shuffleCards() {
//     let index = cards.length,
//     rand,
//     temp;
//     while (index !== 0) {
//         rand = Math.floor(Math.random() * index);
//         index -= 1;
//         temp = cards[index];
//         cards[index] = cards[rand];
//         cards[index] = temp;
//     }
// }

function shuffleCards() {
    cards = cards.sort(() => Math.random() - 0.5);
}

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

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetBoard();
    }, 1000);
}

function resetBoard() {
    firstCard = null;
    secondCard = null;
    setTimeout(() => {
        lockBoard = false;
    }, 500);
}

function restart() {
    resetBoard();
    shuffleCards();
    generateCards();
    score = 0;
    document.querySelector(".score").textContent = score;
    container.innerHTML = "";
    location.reload();
}