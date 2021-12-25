'use strict';

// Select elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// Functions helpers

const swapPlayer = () => {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Roll dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `./img/dice-${dice}.png`;

    // Check for 1. If true, switch to next player
    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      swapPlayer();
    }
  }
});

// Hold score
btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to active player's score
    scores[activePlayer] += currentScore;

    // Display updated active player's score and current score
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if active player's score is >= 100. Finish game if true.
    if (scores[activePlayer] >= 10) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
      playing = false;

      // Switch player
    } else {
      swapPlayer();
    }
  }
});
