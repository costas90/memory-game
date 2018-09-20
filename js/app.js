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

let iconNum = 0;
const cardGrid = document.querySelector('.card-grid ul')

for (let i=1; i <= 16; i++) {
  const li = document.createElement('li');
  const div = document.createElement('div')
  const icon = document.createElement('img');

  li.classList.add('card');
  icon.classList.add('hide');

  if (i < 9) {
    icon.src = icons[iconNum];
    iconNum += 1;
  } else if (i == 9) {
    iconNum = 0;
    icon.src = icons[iconNum];
  } else {
    iconNum += 1;
    icon.src = icons[iconNum];
  }

  cardGrid.appendChild(li);
  li.appendChild(div);
  div.appendChild(icon);
}

// .
// .
// .
// SHOW CARD ON CLICK AND SAVE IN AN ARRAY
// .
// .
// .

const cards = document.querySelectorAll('.card');
const cardsRevealed = [];

let showIcon = function(card) {
  console.log(`click on ${card}`);
  console.log(card.querySelector('.hide'));

  let cardClicked = card.querySelector('.card div img');
  cardClicked.classList.remove('hide');
};

for (let card of cards) {
  card.addEventListener('click', function () {
    showIcon(card);
    cardsRevealed.push(card.querySelector('.card div img').getAttribute('src'));
    console.log(cardsRevealed);
  });

}
