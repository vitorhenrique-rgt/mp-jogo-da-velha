const gameCells = document.getElementsByClassName('game-cell');
const toggleEvents = document.getElementById('toggle-events');
const gameEvents = document.getElementById('game-events');
const modal = document.getElementById('modal');
const modalStartGame = document.getElementById('start-game');
const modalEndGame = document.getElementById('end-game');
const modalDrawGame = document.getElementById('draw-game');
const startSymbols = document.getElementsByClassName('symbol');

let playerOne;
let playerTwo;

let currentPlayer;
let moveCounter = 0;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function closeModal() {
  modal.style.display = "none";
  modalStartGame.style.display = "none";
  modalEndGame.style.display = "none";
  modalDrawGame.style.display = "none";
}

function symbolSelected(event) {
  playerOne = event.target.innerHTML;
  playerTwo = (playerOne === 'x') ? 'o' : 'x';
  currentPlayer = playerOne;
  closeModal();
}

function startGame() {
  modalStartGame.style.display = "flex";
  for (const symbol of startSymbols) {
    symbol.addEventListener('click', symbolSelected);
  }
  for (let cell of gameCells) {
    cell.addEventListener('click', handleClick);
  }
}

function restartGame() {
  for (let cell of gameCells) {
    cell.innerHTML = '';
    cell.dataset.value = '';
    cell.classList.remove('disabled');
  }
  gameEvents.innerHTML = '';
  moveCounter = 0;
  currentPlayer = undefined;
  closeModal();
  showModal();
}

function drawGame() {
  modalDrawGame.style.display = "flex";
  const btnRestart = modalDrawGame.querySelector('button');
  btnRestart.addEventListener('click', restartGame);
}

function endGame(player) {
  modalEndGame.style.display = "flex";
  const playerSpan = modalEndGame.querySelector('span');
  playerSpan.innerHTML = player;
  const btnRestart = modalEndGame.querySelector('button');
  btnRestart.addEventListener('click', restartGame);
}

function showModal(player, status) {
  modal.style.display = "flex";
  if (player) {
    endGame(player);
  } else if (status) {
    drawGame();
  } else {
    startGame();
  }
}

function checkWinner() {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return gameCells[index].dataset.value === currentPlayer;
    });
  });
}

function changePlayer() {
  currentPlayer = (currentPlayer === playerOne) ? playerTwo : playerOne;
}

function createEvent(position) {
  const event = document.createElement('div');
  event.classList.add('event');
  if (position !== 'draw') {
    event.innerHTML = `<p>${currentPlayer.toUpperCase()} na posição ${position.substring(5, 7).toUpperCase()}</p>`;
    gameEvents.appendChild(event);
  } else {
    event.innerHTML = `<p>EMPATE!</p>`;
    gameEvents.appendChild(event);
  }
}

function addImage(player) {
  const imageCell = document.createElement('img');
  imageCell.src = `../assets/${player}.svg`;
  return imageCell;
}

function addPlay(clickedElement) {
  clickedElement.appendChild(addImage(currentPlayer));
  clickedElement.dataset.value = currentPlayer;
  clickedElement.classList.add('disabled');
}

function handleClick(event) {
  addPlay(event.target);
  createEvent(event.target.id);
  const win = checkWinner();
  if (win) {
    showModal(currentPlayer);
  } else {
    moveCounter += 1;
    if (moveCounter >= 9) {
      showModal(undefined, 'draw');
    } else {
      changePlayer();
    }
  }
}

toggleEvents.addEventListener('click', () => {  
  gameEvents.classList.toggle('show-events');
});

window.onload = () => {
  showModal();
};
