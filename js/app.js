//select elements
const container = document.querySelector('.container');
const scorePanel = document.querySelector('.score-panel');
const stars = document.querySelector('.stars');
const faFaStar = document.querySelector('.fa fa-star');
const moves = document.querySelector('.moves');
const restart = document.querySelector('.restart');
const faFaRepeat = document.querySelector('.fa fa-repeat');
const deck = document.querySelector('.deck');

// Array of cards
let cardsArray = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor',
'fa fa-bolt', 'fa fa-cube', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bomb',
'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt',
'fa fa-cube', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bomb']

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

// Deals she shuffled cards
function dealCards() {
  let cards = shuffle(cardsArray)
  for (let i=0; i<cardsArray.length; i++) {
    let li = document.createElement('li');
    li.className = "card";
    let icon = document.createElement('i');
    icon.className = cards[i];
    li.appendChild(icon);
    deck.appendChild(li);
  };
}

// Adds event listeners to each card
function clickCard() {
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('card')) {
      console.log('click');
    }
  }, false);
}

dealCards();
clickCard();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
