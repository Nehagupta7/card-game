const timer = document.querySelector("#timer");
const score = document.querySelector("#score");
const replatButton = document.querySelector("#replay-btn");
const gameOver = document.querySelector(".game-over");
const cards = document.querySelectorAll(".card");
const cardContainer = document.querySelector(".card-container");
let startTimer = 60;
let visibleCard = [];
let scores = 0;

//suffle card
(function sufflecard() {
  cards.forEach((card) => {
    let random = Math.floor(Math.random() * 12);
    card.style.order = random;
    console.log(random);
  });
})();

// set the interval and won ,replay and game over
const timerStore = setInterval(() => {
  startTimer = startTimer - 1;
  timer.innerText = startTimer;
  timer.classList.remove("big");

  if (startTimer == 0) {
    clearInterval(timerStore);
    gameLost();
  } else if (startTimer >= 0 && score.innerHTML == 6) {
    clearInterval(timerStore);
    gameWon();
  }
  if (startTimer <= 10) {
    setInterval(lastTenTimerCount, 1000);
  }
}, 1000);

//last timer
const lastTenTimerCount = () => {
  timer.classList.add("big");
  timer.style.color = "red";
};

//flip audio
const flipAudio = () => {
  const audio = new Audio("memory game/images/audio/flip.WAV");
  audio.play();
};

//match audio
const matchAudio = () => {
  const audio = new Audio("memory game/images/audio/match.WAV");
  audio.play();
};

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

//when the two cards are matched
const matched = () => {
  visibleCard[0].classList.add("matched");
  visibleCard[1].classList.add("matched");
  visibleCard = [];
  setTimeout(() => {
    matchAudio();
    countScore();
  }, 1000);
};

//when the two cards are not matched
const unmatched = () => {
  setTimeout(() => {
    visibleCard[0].classList.remove("visible");
    visibleCard[1].classList.remove("visible");
    visibleCard = [];
  }, 500);
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
//cards click
cards.forEach((card) => {
  card.addEventListener("click", () => {
    flipAudio();
    flipCard(card);
    matchedOrUnmatched(card);
  });
});
