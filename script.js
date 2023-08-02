const gameContainer = document.getElementById("game");
const startBtn = document.querySelector("#start");
let firstCard = null;
let secondCard = null;
let flippedCards = 0;
let noClicking = false;
let startGame = false;
let cardFlips = 0;
let playerScore = 0;

if (!startGame) {
  gameContainer.style.visibility = "hidden";
}

startBtn.addEventListener("click", function () {
  gameContainer.style.visibility = "visible";
  document.querySelector("#flips").innerHTML = `Flips: ${cardFlips}`;
  document.querySelector("#score").innerHTML = `Score: ${playerScore}`;
});

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

function getRandomColors() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}

function applyColorsToCards() {
  let colors = [];
  let randomNumberOfCards = Math.floor(Math.random() * 20) + 1;
  if (randomNumberOfCards % 2 === 0) {
    randomNumberOfCards = randomNumberOfCards;
  } else {
    randomNumberOfCards -= 1;
  }
  for (let i = 0; i < randomNumberOfCards; i++) {
    let color = getRandomColors();
    colors.push(color, color);
  }
  return colors;
}

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(applyColorsToCards());

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if (noClicking) {
    return;
  }

  if (event.target.classList.contains("flipped")) {
    return;
  }

  let currentCard = event.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (!firstCard || !secondCard) {
    currentCard.classList.add("flipped");
    firstCard = firstCard || currentCard;
    cardFlips++;
    document.querySelector("#flips").innerHTML = `Flips: ${cardFlips}`;
    if (currentCard === firstCard) {
      secondCard = null;
    } else {
      secondCard = currentCard;
    }
  }

  if (firstCard && secondCard) {
    noClicking = true;
    let color1 = firstCard.className;
    let color2 = secondCard.className;

    if (color1 === color2) {
      flippedCards += 2;
      firstCard.removeEventListener("click", handleCardClick);
      secondCard.removeEventListener("click", handleCardClick);
      firstCard = null;
      secondCard = null;
      noClicking = false;
      playerScore++;
      document.querySelector("#score").innerHTML = `Score: ${playerScore}`;
    } else {
      setTimeout(function () {
        firstCard.style.backgroundColor = "";
        secondCard.style.backgroundColor = "";
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        firstCard = null;
        secondCard = null;
        noClicking = false;
      }, 1000);
    }
  }

  if (flippedCards === shuffledColors.length) {
    alert("You Win!");
    gameContainer.style.visibility = "hidden";
    document.querySelector("#flips").innerHTML = "";
    document.querySelector("#score").innerHTML = "";
    document.querySelector("h1").innerHTML = "";
    startBtn.style.visibility = "hidden";
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
