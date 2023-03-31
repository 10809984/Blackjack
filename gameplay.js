const deckUrl = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
const hitButton = document.querySelector(".hit-button");
const cardsContainer = document.querySelector(".cards");
const main = document.querySelector("main");
const message = document.querySelector(".message");
const tryAgain = document.querySelector(".try-again");
let deckId;
let total = 0;

async function getDeck() {
  const response = await fetch(deckUrl);
  const deckDetails = await response.json();
  deckId = deckDetails.deck_id;
}

getDeck();



hitButton.onclick = async function () {
  const cardUrl = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;
  const response = await fetch(cardUrl);
  const card = await response.json();
  const cardDetails = card.cards[0];
  cardsContainer.innerHTML += `<img src="${cardDetails.image}" alt="${cardDetails.value} of ${cardDetails.suit}">`;
  if (
    cardDetails.value === "QUEEN" ||
    cardDetails.value === "KING" ||
    cardDetails.value === "JACK"
  ) {
    total += 10;
  } else if (cardDetails.value === "ACE" && total + 11 <= 21) {
    total += 11;
  } else if (cardDetails.value === "ACE") {
    total += 1;
  } else {
    total += parseInt(cardDetails.value);
  }
  
  if (total === 21){
   message.style.display = "block";
   document.getElementById('outcome').innerHTML = "You won! Let's see if you can do it again!";
   document.getElementById('hit-button').disabled = true;
  }
 else if (total > 21) {
    document.getElementById('outcome').innerHTML = "You've gone bust";
    message.style.display = "block";
    document.getElementById('hit-button').disabled = true;
  }
  console.log(total);
  return showScore(total);  
};

function showScore(total){
    let score = total;
    document.getElementById("score").innerHTML = "Your score is: " + score;
}

function clearScore(){
    document.getElementById("score").innerHTML = "";
}

tryAgain.onclick = function () {
  document.getElementById('hit-button').disabled = false;  
  total = 0;
  cardsContainer.innerHTML = "";
  message.style.display = "none";
  clearScore();
  getDeck();
};
