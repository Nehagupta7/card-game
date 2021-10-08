const timer = document.querySelector("#timer");
const score = document.querySelector("#score");
const replatButton = document.querySelector("#replay-btn");
const gameOver = document.querySelector(".game-over");
const cards = document.querySelectorAll(".card");
const cardContainer = document.querySelector(".card-container");
let startTimer = 100;
let visibleCard = [];
let scores = 0;
// set the interval and won ,replay and game over
const timerStore = setInterval(() => {
  startTimer = startTimer - 1;
  timer.innerText = startTimer;

  if (startTimer == 0) {
    clearInterval(timerStore);
    gameLost();
  } else if (startTimer >= 0 && score.innerHTML == 6) {
    clearInterval(timerStore);
    gameWon();
  }
}, 1000);
cards.forEach((card) => {
  card.addEventListener("click", () => {
    flipCard(card);
    matchedOrUnmatched(card);
  });
});
// match card
const matchedOrUnmatched = (item) => {
  visibleCard.push(item);
  let length = visibleCard.length;
  if (length == 2) {
    if (
      visibleCard[0].querySelector(".front-face img").src ===
      visibleCard[1].querySelector(".front-face img").src
    ) {
      matched();
    } else {
      unmatched();
    }
  }
};

//card matched
const matched = () => {
  console.log("matched");
  visibleCard = [];
  countScore();
};

//card unmatched
const unmatched = () => {
  console.log("no match");
  visibleCard[0].classList.remove("visible");
  visibleCard[1].classList.remove("visible");
  visibleCard = [];
};
//count score
const countScore = () => {
  scores++;
  score.innerHTML = scores;
};
//flip card
const flipCard = (item) => {
  item.classList.add("visible");
};

//game won
const gameLost = () => {
  gameOver.classList.add("visible");
};

//game lost
const gameWon = () => {
  gameOver.classList.add("visible");
  gameOver.querySelector("p").innerHTML = "you won";
};
// replay button
replatButton.addEventListener("click", () => {
  window.location.reload();
});
