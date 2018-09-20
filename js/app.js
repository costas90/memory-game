let icons = [
  'img\/Dump_truck.png',
  'img\/Hacksaw.png',
  'img\/Measuring_tape.png',
  'img\/Paint_bucket.png',
  'img\/Rasp.png',
  'img\/Saw.png',
  'img\/Screw_bolts.png',
  'img\/Sliding_scale.png'
]

// .
// .
// .
// CREATE 16 CARDS
// .
// .
// .

let iconsI = 0;
const cardGrid = document.querySelector('.card-grid ul')

for (let i=1; i <= 16; i++) {
  const li = document.createElement('li');
  const div = document.createElement('div')
  const img = document.createElement('img');

  li.classList.add('card');
  img.classList.add('hide');

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
}

// .
// .
// .
// SHOW CARD ON CLICK AND SAVE IN AN ARRAY
// .
// .
// .

const cardsRevealed = [];
const cards = document.querySelectorAll('.card');

function revealCard(card) {
  console.log(`click on ${card}`);
  console.log(card.querySelector('.hide'));

  let cardClicked = card.querySelector('.card div img');
  cardClicked.classList.remove('hide');
  cardClicked.classList.add('revealed');
};

function saveCardRevealed(click) {
  cardsRevealed.push(click.getAttribute('src'));
};

function checkRevealedCards() {
  if (cardsRevealed.length == 2) {
    if (cardsRevealed[0] == cardsRevealed[1]) {
      console.log(`match`);
    }
  }
};

for (let card of cards) {
  let cardClicked = card.querySelector('.card div img');

  card.addEventListener('click', function () {
    revealCard(card);
    saveCardRevealed(cardClicked);
    console.log(cardsRevealed);
    checkRevealedCards();
  });
}
