//
//
// CARD FUNCTIONS
//
//

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

function revealCard(el) {
  el.firstChild.classList.remove('hide');
  el.firstChild.classList.add('revealed');
  el.classList.add('flip');
}

function saveCardRevealed(el) {
  cardsRevealed.push(el.firstChild.getAttribute('src'));
  cardsSelected.push(el.firstChild);
  cardsSelected[0].setAttribute('style', 'background: #6aa5da');
}

function markPaired() {
  const revealedCards = document.querySelectorAll('.revealed');
  for (let card of revealedCards) {
    card.classList.remove('revealed');
    card.classList.add('paired');
  }
}

function hideRevealedCards() {
  const revealedCards = document.querySelectorAll('.revealed');
  for (let card of revealedCards) {
    card.classList.remove('revealed');
    card.classList.add('hide');
    card.parentElement.classList.remove('flip', 'wrongMove');
  }
}

function wrongMove() {
  cardsSelected[0].removeAttribute('style', 'background: #6aa5da');
  const revealedCards = document.querySelectorAll('.revealed');
  for (let card of revealedCards) {
    card.parentElement.classList.add('wrongMove');
  }
}

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

function movesCount() {
  const movesNum = document.querySelector('.moves');
  movesNum.textContent = `${moves} Moves`;

  switch (moves) {
    case 10:
      stars[2].classList.remove('fa-star');
      stars[2].classList.add('fa-star-o');
      starsCount = 2;
      break;
    case 15:
      stars[1].classList.remove('fa-star');
      stars[1].classList.add('fa-star-o');
      starsCount = 1;
      break;
    case 20:
      stars[0].classList.remove('fa-star');
      stars[0].classList.add('fa-star-o');
      starsCount = 0;
  }
}

function checkWin() {
  const pairedCards = document.querySelectorAll('.paired');
  if (pairedCards.length === cards.length) {
    clearInterval(interval);
    setTimeout(showModal, 1000);
  }
}
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

function timer() {
  const timer = document.querySelector('.timer');
  seconds +=1;
  timer.textContent = `${minutes}:${seconds}`;
  if (seconds == 60) {
    seconds = 0;
    minutes += 1;
  }
}
