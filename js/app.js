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
let interval = null;
let starsCount = 3;
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
// EVENTS
//
//

cardGrid.addEventListener('click', function(event) {
  if (event.target.classList.contains("revealed") || event.target.classList.contains("paired")) {
    return;
  }
  if (event.target.nodeName === 'DIV') {
    revealCard(event.target);
    saveCardRevealed(event.target);
    checkRevealedCards();
    movesCount();
    checkWin();
  }
});

cardGrid.addEventListener('click', function() {
  interval = setInterval(timer, 1000);
}, options);

const restart = document.querySelector('.fa-repeat');
restart.addEventListener('click', function() {
  document.location.reload();
});
