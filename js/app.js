// Array of cards
let cardsArray = ['fa fa-diamond', 'fa fa-paper-plane-o',
                  'fa fa-anchor','fa fa-bolt',
                  'fa fa-cube', 'fa fa-leaf',
                  'fa fa-bicycle', 'fa fa-bomb',
                  'fa fa-diamond', 'fa fa-paper-plane-o',
                  'fa fa-anchor', 'fa fa-bolt',
                  'fa fa-cube', 'fa fa-leaf',
                  'fa fa-bicycle', 'fa fa-bomb']

// Array of stars
let starsArray = ['fa fa-star', 'fa fa-star', 'fa fa-star']

// Define variables
const deck = document.querySelector('.deck');
const restart = document.querySelector('.restart');
const moves = document.querySelector('.moves');
const stars = document.querySelector('.stars');

// Array to temporarily store clicked cards in order to compare
let tempArray = [];

// Array to store matched cards
let matchedArray = [];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// Shuffles and deals cards
function dealCards() {
  let cards = shuffle(cardsArray);
  for (let i=0; i<cardsArray.length; i++) {
    let li = document.createElement('li');
    li.className = 'card';
    let icon = document.createElement('i');
    icon.className = cards[i];
    li.appendChild(icon);
    deck.appendChild(li);
  }
}

// Initially sets card clicks and moves to 0
let cardClicks = 0;
let move = 0;

// Adds event listeners, manages card clicks
function clickCard() {
  deck.addEventListener('click', function(event) {
    if (event.target.classList.contains('card')) {
      cardClicks++;
      if (cardClicks === 1 || cardClicks === 2) {
        clickedCard();
      } else {
          resetTurn();
      }
    }
  })
}

// Reveals clicked cards, counts moves, deletes stars
function clickedCard() {
  if (event.target.classList.contains('card')) {
    event.target.classList.add('open', 'show', 'temp');
    tempArray.push(event.target);
    if (tempArray.length == 2) {
      if (tempArray[0] != tempArray[1]) {
        move++;
        moves.innerHTML = move;
        checkMatch();
        if (move === 15) {
          stars.children[2].classList.add('hide');
        } else if (move === 19) {
          stars.children[1].classList.add('hide');
        }
      } else {
          tempArray.splice(1);
      }
    }
  }
}

// Checks if cards are a match
function checkMatch() {
  let cardOne = tempArray[0].innerHTML;
  let cardTwo = tempArray[1].innerHTML;
  if (cardOne == cardTwo) {
    tempArray[0].classList.add('match');
    tempArray[0].classList.remove('temp');
    tempArray[1].classList.add('match');
    tempArray[1].classList.remove('temp');
    matchedArray.push(cardOne, cardTwo);
    tempArray = [];
    cardClicks = 0;
  } else {
      let timeout;
      timeoutFunction();
  }
}

// Resets unmatched cards after a moment
function timeoutFunction() {
  timeout = setTimeout(function() {
    document.querySelector('.temp').classList.remove('open', 'show', 'temp');
    document.querySelector('.temp').classList.remove('open', 'show', 'temp');
    tempArray = [];
    cardClicks = 0;
  }, 1000);
}

// Resets unmatched cards after third card is clicked
function resetTurn() {
  try {
    clearTimeout(timeout);
    document.querySelector('.temp').classList.remove('open', 'show', 'temp');
    document.querySelector('.temp').classList.remove('open', 'show', 'temp');
  }
  catch(err) {
  }
  tempArray = [];
  tempArray.push(event.target);
  cardClicks = 1;
  clickedCard();
}

// Restarts game if repeat icon is clicked
function restartGame() {
  restart.addEventListener('click', function(event) {
    try {
      document.querySelector('.hide').classList.remove('hide');
      document.querySelector('.hide').classList.remove('hide');
      for (i=0; i<cardsArray.length; i++) {
        document.querySelector('.open').classList.remove('open', 'show', 'match', 'temp');
      }
    }
    catch(err) {
    }
    tempArray = [];
    matchedArray = [];
    cardClicks = 0;
    move = 0;
    moves.innerHTML = move;
    while (deck.firstChild) {
      deck.removeChild(deck.firstChild);
    }
    dealCards();
  })
}

// Adds stars
function addStar() {
  for (let i=0; i<starsArray.length; i++) {
    let li = document.createElement('li');
    li.className = 'star';
    let icon = document.createElement('i');
    icon.className = starsArray[i];
    li.appendChild(icon);
    stars.appendChild(li);
  }
}

// Initializes functions to start game
dealCards();
clickCard();
restartGame();
addStar();

/*
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
