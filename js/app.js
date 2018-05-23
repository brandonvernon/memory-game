// Array of cards
let cardsArray = ['fa fa-diamond', 'fa fa-paper-plane-o',
                  'fa fa-anchor','fa fa-bolt',
                  'fa fa-cube', 'fa fa-leaf',
                  'fa fa-bicycle', 'fa fa-bomb',
                  'fa fa-diamond', 'fa fa-paper-plane-o',
                  'fa fa-anchor', 'fa fa-bolt',
                  'fa fa-cube', 'fa fa-leaf',
                  'fa fa-bicycle', 'fa fa-bomb']

// Define variables
const deck = document.querySelector('.deck');

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

// Deals the shuffled cards
function dealCards() {
  let cards = shuffle(cardsArray)
  for (let i=0; i<cardsArray.length; i++) {
    let li = document.createElement('li');
    li.className = 'card';
    let icon = document.createElement('i');
    icon.className = cards[i];
    li.appendChild(icon);
    deck.appendChild(li);
  }
}

// Initially sets card clicks to 0
let cardClicks = 0;

// Adds event listeners to each card
function clickCard() {
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('card')) {
      cardClicks++;
      if (cardClicks === 1 || cardClicks === 2) {
        clickedCard();
      }
    }
  })
}

// Reveals clicked cards and adds to temporary array
function clickedCard() {
  if (event.target.classList.contains('card')) {
    event.target.classList.add('open', 'show', 'temp');
    tempArray.push(event.target);
    if (tempArray.length == 2) {
      if (tempArray[0] != tempArray[1]) {
        checkMatch();
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
      setTimeout(function() {
        document.querySelector('.temp').classList.remove('open', 'show', 'temp');
        document.querySelector('.temp').classList.remove('open', 'show', 'temp');
        tempArray = [];
        cardClicks = 0;
      }, 1000);
  }
}

// Initializes functions to start game
dealCards();
clickCard();

/*
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
