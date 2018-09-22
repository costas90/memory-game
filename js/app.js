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

//
//
// CREATE 16 CARDS
//
//

const cards = [];
const cardsRevealed = [];
const stars = document.querySelectorAll('.stars li i');
const cardGrid = document.querySelector('.card-grid ul');
const fragment = document.createDocumentFragment();
const gameFinished = false;
let moves = 0;
let seconds = 0;
let minutes = 0;
let options = { once : true, capture : true};

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
  img.classList.add('hide');
  img.classList.add('card-icon');

  img.src = cards[i];

  fragment.appendChild(li);
  li.appendChild(div);
  div.appendChild(img);
};

cardGrid.appendChild(fragment);

const hiddenCards = document.querySelectorAll('.card');

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

function revealCard(card) {
  console.log(`click on ${card}`);
  console.log(card.querySelector('.hide'));

  let cardClicked = card.querySelector('.card-icon');
  cardClicked.classList.remove('hide');
  cardClicked.classList.add('revealed');
};

function saveCardRevealed(click) {
  cardsRevealed.push(click.getAttribute('src'));
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
  };
};

function checkRevealedCards() {
  if (cardsRevealed.length == 2) {
    if (cardsRevealed[0] == cardsRevealed[1]) {
      markPaired();
      moves +=1;
      console.log(`match`);
    } else {
      setTimeout(hideRevealedCards, 300);
      moves +=1;
      console.log(`hide cards`);
    }
    cardsRevealed.length = 0;
  }
};

function movesCount() {
  const movesNum = document.querySelector('.moves');
  movesNum.textContent = `${moves} Moves`;

  if (moves === 10) {
    stars[2].classList.remove('fa-star');
    stars[2].classList.add('fa-star-o');
  } else if (moves === 15) {
    stars[1].classList.remove('fa-star');
    stars[1].classList.add('fa-star-o');
  } else if (moves === 20) {
    stars[0].classList.remove('fa-star');
    stars[0].classList.add('fa-star-o');
  }
}

function checkWin() {
  const pairedCards = document.querySelectorAll('.paired');
  if (pairedCards.length === cards.length) {
    console.log('Game Won');
    gameFinished = true;
  }
}

function count() {
  const timer = document.querySelector('.timer');
  timer.textContent = `${minutes}:${seconds}`;
  seconds +=1;
  if (seconds == 60) {
    seconds = 0;
    minutes += 1;
  }
  // console.log(`${minutes}:${seconds}`);
}

function timer(count) {
  setInterval(count, 1000);
  console.log(`timer starts`);
}

//
//
// EVENTS
//
//

for (let card of hiddenCards) {
  let cardClicked = card.querySelector('.card-icon');
  card.addEventListener('click', function () {
    if (cardClicked.classList.contains("revealed") || cardClicked.classList.contains("paired")) {
      return;
    }
    revealCard(card);
    saveCardRevealed(cardClicked);
    console.log(cardsRevealed);
    checkRevealedCards();
    movesCount();
    checkWin();
  });
}

cardGrid.addEventListener('click', function() {
  timer(count);
}, options);

const restart = document.querySelector('.fa-repeat');
restart.addEventListener('click', function() {
  document.location.reload();
});
