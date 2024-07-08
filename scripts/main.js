// ESCREVA SUA LÓGICA AQUI
const boardCells = document.getElementsByClassName('board-cell');

function main() {
  //alert("Bem vindo ao jogo da velha!");
}

function selectCell() {
  // Itera sobre cada elemento 'board-cell'.
  console.log('chamou funçao')
  for (let cell of boardCells) {
    cell.addEventListener('click', () => {
      console.log(cell);
      console.log('clicou')
    });
  }
}

window.onload = () => {
  selectCell();
};