//
//  CARD FUNCTIONS
//
//     This file contains all the functions required for the game to run
//

// Shuffle the cards Array
function shuffle (array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// Flip and reveal the card on click
function revealCard(el) {
  el.firstChild.classList.remove('hide');
  el.firstChild.classList.add('revealed');
  el.classList.add('flip');
}

// Save revealed cards in an array
function saveCardRevealed(el) {
  cardsRevealed.push(el.firstChild.getAttribute('src'));
  cardsSelected.push(el.firstChild);
  cardsSelected[0].setAttribute('style', 'background: #6aa5da');
}

// If the 2 revealed cards match, mark them as paired
function markPaired() {
  const revealedCards = document.querySelectorAll('.revealed');
  for (let card of revealedCards) {
    card.classList.remove('revealed');
    card.classList.add('paired');
  }
}

// if the 2 revealed cards dont match, hide them
function hideRevealedCards() {
  const revealedCards = document.querySelectorAll('.revealed');
  for (let card of revealedCards) {
    card.classList.remove('revealed');
    card.classList.add('hide');
    card.parentElement.classList.remove('flip', 'wrongMove');
  }
}

// Change the color of the revealed cards to red
function wrongMove() {
  cardsSelected[0].removeAttribute('style', 'background: #6aa5da');
  const revealedCards = document.querySelectorAll('.revealed');
  for (let card of revealedCards) {
    card.parentElement.classList.add('wrongMove');
  }
}

// Check if the revealed cards match
function checkRevealedCards() {
  if (cardsRevealed.length == 2) {
    if (cardsRevealed[0] == cardsRevealed[1]) {
      markPaired();
      moves +=1;
    } else {
      wrongMove();
      setTimeout(hideRevealedCards, 400);
      moves +=1;
    }
    cardsRevealed.length = 0;
    cardsSelected.length = 0;
  }
}

// Count the user's moves and change the star rating
function movesCount() {
  const movesNum = document.querySelector('.moves');
  movesNum.textContent = `${moves} Moves`;

  switch (moves) {
    case 15:
      stars[2].classList.remove('fa-star');
      stars[2].classList.add('fa-star-o');
      starsCount = 2;
      break;
    case 20:
      stars[1].classList.remove('fa-star');
      stars[1].classList.add('fa-star-o');
      starsCount = 1;
  }
}

// Check if all the cards are flipped
function checkWin() {
  const pairedCards = document.querySelectorAll('.paired');
  if (pairedCards.length === cards.length) {
    clearInterval(interval);
    setTimeout(showModal, 1000);
  }
}

// Show the Modal, with the number of moves, time, and stars.
// Also, allow the user to restart the game
function showModal() {
  let message = (minutes === 0) ? `${seconds} seconds` : `${minutes}:${seconds} minutes`;

  const body = document.querySelector('body');
  body.innerHTML = `<section class ="myModal">
    <h1>Congratulations! You Won!</h1>
    <p>With ${moves} Moves and ${starsCount} Stars in ${message}.</p>
    <button>Play Again!</button>
  </section>`

  const button = document.querySelector('button');
  button.addEventListener('click', function() {
    document.location.reload();
  })
}

// Count up the timer seconds and minutes
function timer() {
  const timer = document.querySelector('.timer');
  seconds +=1;
  timer.textContent = `${minutes}:${seconds}`;
  if (seconds == 60) {
    seconds = 0;
    minutes += 1;
  }
}
