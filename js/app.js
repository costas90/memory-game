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

let iconNum = 0;
const cardGrid = document.querySelector('.card-grid ul')

for (let i=1; i <= 16; i++) {
  const li = document.createElement('li');
  const cardDiv = document.createElement('div')
  const icon = document.createElement('img');

  li.classList.add('card');

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
  li.appendChild(cardDiv);
  cardDiv.appendChild(icon);
}
