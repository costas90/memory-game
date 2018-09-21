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

// .
// .
// .
// CREATE 16 CARDS
// .
// .
// .

const cards = [];
const cardsRevealed = [];
const cardGrid = document.querySelector('.card-grid ul');
let iconsI = 0;

for (let i=1; i <= 16; i++) {
  const li = document.createElement('li');
  const div = document.createElement('div')
  const img = document.createElement('img');

  li.classList.add('card');
  img.classList.add('hide');
  img.classList.add('card-icon');

  if (i < 9) {
    img.src = icons[iconsI];
    iconsI += 1;
  } else if (i == 9) {
    iconsI = 0;
    img.src = icons[iconsI];
  } else {
    iconsI += 1;
    img.src = icons[iconsI];
  }

  cardGrid.appendChild(li);
  li.appendChild(div);
  div.appendChild(img);
};

const hiddenCards = document.querySelectorAll('.card');
// Build array with all cards before shuffle
for (card of hiddenCards) {
  const findIcon = card.querySelector('.card-icon');
  cards.push(findIcon.getAttribute('src'));
}

shuffle(cards);

// .
// .
// .
// CARD FUNCTIONS
// .
// .
// .

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
      console.log(`match`);
    } else {
      setTimeout(hideRevealedCards, 300);
      console.log(`hide cards`);
    }
    cardsRevealed.length = 0;
  }
};

// .
// .
// .
// EVENTS
// .
// .
// .

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
  });
}
