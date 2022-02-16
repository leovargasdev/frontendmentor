// const fs = require('fs')
// const data = fs.readJsonFile('./data.json')

const formattedName = {
  'Work': 'work',
  'Play': 'play',
  'Study': 'study',
  'Exercise': 'exercise',
  'Social': 'social',
  'Self Care': 'self-care',
}

fetch("./data.json")
.then(response => {
   return response.json();
})
.then(data => {
  console.log(data)
  for(let period = 0; period <= 5; period += 1){
    const cardboard = document.createElement('div');

    const {title: periodName, timeframes } = data[period]
    const periodNameFormatted = formattedName[periodName]


    cardboard.classList.add("cardboard");
  
    cardboard.innerHTML = `
        <div class="background ${periodNameFormatted}">
          <img src="images/icon-${periodNameFormatted}.svg" alt="">
        </div>
        <div class="cardboard-info">
          <div class="cardboard-tag">
            <strong>${periodName}</strong>
            <img src="images/icon-ellipsis.svg" alt="">
          </div>
          <h2>${timeframes.weekly.current}hrs</h2>
          <small>Last Week - 8hrs</small>
        </div>`;
  
    document.getElementById('container').appendChild(cardboard);
  }
});

function changeActivePeriod(period) {
  console.log(period)
}