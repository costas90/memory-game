let icons = [
  'img\/Dump_truck.png',
  'img\/Hacksaw.png',
  'img\/Measuring_tape.png',
  'img\/Paint_bucket.png',
  'img\/Rasp.png',
  'img\/Saw.png',
  'img\/Screw_bolts.png',
  'img\/Sliding_scale.png'
];
const cards = [];
const cardsRevealed = [];
const cardsSelected = [];
const stars = document.querySelectorAll('.stars li i');
const cardGrid = document.querySelector('.card-grid ul');
const fragment = document.createDocumentFragment();
let starsCount = 3;
let gameFinished = false;
let moves = 0;
let seconds = 0;
let minutes = 0;
let options = { once : true, capture : true};

//
//
// CREATE 16 CARDS
//
//
// Add icons to Cards Array
for (let y = 0; y < 2; y++) {
  for (let x = 0; x < icons.length; x++) {
    cards.push(icons[x]);
  }
}

shuffle(cards);

// Create HTML Elements for cards from Card Array
for (let i = 0; i < cards.length; i++) {
  const li = document.createElement('li');
  const div = document.createElement('div')
  const img = document.createElement('img');

  li.classList.add('card');
  img.classList.add('hide', 'card-icon');

  img.src = cards[i];

  fragment.appendChild(li);
  li.appendChild(div);
  div.appendChild(img);
};

cardGrid.appendChild(fragment);

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
  let cardClicked = el.querySelector('.card-icon');
  cardClicked.classList.remove('hide');
  cardClicked.classList.add('revealed');
  cardClicked.parentElement.classList.add('flip');
};

function saveCardRevealed(el) {
  let cardClicked = el.querySelector('.card-icon');
  cardsRevealed.push(cardClicked.getAttribute('src'));
  cardsSelected.push(cardClicked);
  cardsSelected[0].setAttribute('style', 'background: #6aa5da');
};

function markPaired() {
  const revealedCards = document.querySelectorAll('.revealed');
  for (let card of revealedCards) {
    card.classList.remove('revealed');
    card.classList.add('paired');
  }
};

function hideRevealedCards() {
  const revealedCards = document.querySelectorAll('.revealed');
  for (let card of revealedCards) {
    card.classList.remove('revealed');
    card.classList.add('hide');
    card.parentElement.classList.remove('flip', 'wrongMove');
  };
};

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
};

function wrongMove() {
  cardsSelected[0].removeAttribute('style', 'background: #6aa5da');
  const revealedCards = document.querySelectorAll('.revealed');
  for (let card of revealedCards) {
    card.parentElement.classList.add('wrongMove');
  }
}

function movesCount() {
  const movesNum = document.querySelector('.moves');
  movesNum.textContent = `${moves} Moves`;

  if (moves === 10) {
    stars[2].classList.remove('fa-star');
    stars[2].classList.add('fa-star-o');
    starsCount = 2;
  } else if (moves === 15) {
    stars[1].classList.remove('fa-star');
    stars[1].classList.add('fa-star-o');
    starsCount = 1;
  } else if (moves === 20) {
    stars[0].classList.remove('fa-star');
    stars[0].classList.add('fa-star-o');
    starsCount = 0;
  }
}

function checkWin() {
  const pairedCards = document.querySelectorAll('.paired');
  if (pairedCards.length === cards.length) {
    gameFinished = true;
    setTimeout(showModal, 1000);
  }
}

function showModal() {
  const body = document.querySelector('body');
  body.innerHTML = `<section class ="myModal">
    <h1>Congratulations! You Won!</h1>
    <p>With ${moves} Moves and ${starsCount} Stars in ${minutes}:${seconds} minutes.</p>
    <button>Play Again!</button>
  </section>`

  const button = document.querySelector('button');
  button.addEventListener('click', function() {
    document.location.reload();
  })
}

let interval = null;

function count() {
  if (gameFinished) {
    clearInterval(interval);
  }
  const timer = document.querySelector('.timer');
  timer.textContent = `${minutes}:${seconds}`;
  seconds +=1;
  if (seconds == 60) {
    seconds = 0;
    minutes += 1;
  }
}

function timer(count) {
  interval = setInterval(count, 1000);
}

//
//
// EVENTS
//
//

cardGrid.addEventListener('click', function(event) {
  if (event.target.classList.contains("revealed") || event.target.classList.contains("paired")) {
    return;
  }
  revealCard(event.target);
  saveCardRevealed(event.target);
  console.log(cardsRevealed);
  checkRevealedCards();
  movesCount();
  checkWin();
});

cardGrid.addEventListener('click', function() {
  timer(count);
}, options);

const restart = document.querySelector('.fa-repeat');
restart.addEventListener('click', function() {
  document.location.reload();
});
