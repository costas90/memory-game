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

// Add icons to Cards Array
for (let y = 0; y < 2; y++) {
  for (let x = 0; x < icons.length; x++) {
    cards.push(icons[x]);
  }
}

shuffle(cards);

const t0 = performance.now();

const cardGrid = document.querySelector('.card-grid');
const ul = document.createElement('ul');

// Create HTML Elements for cards from Card Array
for (let i = 0; i < cards.length; i++) {
  const li = document.createElement('li');
  const div = document.createElement('div')
  const img = document.createElement('img');

  li.classList.add('card');
  img.classList.add('hide');
  img.classList.add('card-icon');

  img.src = cards[i];

  ul.appendChild(li);
  li.appendChild(div);
  div.appendChild(img);
};

cardGrid.appendChild(ul);

const t1 = performance.now();
console.log(`Time: ${t1-t0}`);

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
      console.log(`match`);
    } else {
      setTimeout(hideRevealedCards, 300);
      console.log(`hide cards`);
    }
    cardsRevealed.length = 0;
  }
};

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
  });
}
