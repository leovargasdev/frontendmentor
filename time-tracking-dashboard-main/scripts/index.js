let DATA_JSON = null
const getPeriodId = {
  'Work': 'work',
  'Play': 'play',
  'Study': 'study',
  'Exercise': 'exercise',
  'Social': 'social',
  'Self Care': 'self-care',
}

function handleCreatedCardboard({ title, timeframes }) {
  const periodID = getPeriodId[title]
  const { previous, current } = timeframes.weekly;

  const cardboard = document.createElement('div');

  cardboard.classList.add("cardboard");
  cardboard.innerHTML = `
    <div class="background ${periodID}">
      <img src="images/icon-${periodID}.svg" alt="">
    </div>
    <div class="cardboard-info">
      <div class="cardboard-tag">
        <strong>${title}</strong>
        <img src="images/icon-ellipsis.svg" alt="">
      </div>
      <h2 id="${periodID}-current">${current}h</h2>
      <small id="${periodID}-previous">Last Week - ${previous}h</small>
    </div>
  `;

  return cardboard;
}

function handleActiveOptionPeriod(periodName) {
  document.getElementById('calendar-option-daily').classList.remove("active");
  document.getElementById('calendar-option-weekly').classList.remove("active");
  document.getElementById('calendar-option-monthly').classList.remove("active");
  
  const periodElement = document.getElementById('calendar-option-' + periodName)
  periodElement.classList.add("active");
}

function changeCalendarPeriod(periodName) {
  handleActiveOptionPeriod(periodName);

  const maxPeriods = DATA_JSON.length;
  for(let period = 0; period < maxPeriods; period += 1){
    const { title, timeframes } = DATA_JSON[period]
    const periodID = getPeriodId[title]

    const current = document.getElementById(periodID + '-current')
    current.innerHTML = timeframes[periodName].current ? timeframes[periodName].current + 'h' : '-';

    const previous = document.getElementById(periodID + '-previous')
    previous.innerHTML = `Last Week - ${timeframes[periodName].previous}h`;
  }
}

// Inicialização do script
fetch("./data.json").then(response => response.json()).then(data => {
  DATA_JSON = data
  const container = document.getElementById('container')
  for(let period = 0; period < DATA_JSON.length; period += 1){
    const newCardboard = handleCreatedCardboard(DATA_JSON[period])
    container.appendChild(newCardboard);
  }
});