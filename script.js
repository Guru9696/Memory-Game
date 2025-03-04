// Game setup

const memoryGameLink = document.getElementById('memoryGameLink');
const ticTacToeLink = document.getElementById('ticTacToeLink');
const rockPaperScissorsLink = document.getElementById('rockPaperScissorsLink');
const numberGuessLink = document.getElementById('numberGuessLink');

const memoryGame = document.getElementById('memoryGame');
const ticTacToe = document.getElementById('ticTacToe');
const rockPaperScissors = document.getElementById('rockPaperScissors');
const numberGuess = document.getElementById('numberGuess');

// Hide all games initially
function hideAllGames() {
  memoryGame.style.display = 'none';
  ticTacToe.style.display = 'none';
  rockPaperScissors.style.display = 'none';
  numberGuess.style.display = 'none';
}

// Show selected game
memoryGameLink.addEventListener('click', () => {
  hideAllGames();
  memoryGame.style.display = 'block';
  startMemoryGame();
});

ticTacToeLink.addEventListener('click', () => {
  hideAllGames();
  ticTacToe.style.display = 'block';
  startTicTacToe();
});

rockPaperScissorsLink.addEventListener('click', () => {
  hideAllGames();
  rockPaperScissors.style.display = 'block';
  startRockPaperScissors();
});

numberGuessLink.addEventListener('click', () => {
  hideAllGames();
  numberGuess.style.display = 'block';
  startNumberGuessing();
});

// Memory Game
let flippedCards = [];
let matchedCards = 0;
let moveCount = 0;

function startMemoryGame() {
  // Generate cards for memory game
  const gameBoard = document.getElementById('memoryBoard');
  gameBoard.innerHTML = '';
  
  const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const shuffledValues = shuffle([...cardValues, ...cardValues]);

  shuffledValues.forEach(value => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-value', value);
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });

  moveCount = 0;
  matchedCards = 0;
  updateMoveCount();
}

// Shuffle function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Flip cards
function flipCard() {
  if (flippedCards.length === 2 || this.classList.contains('flipped') || this.classList.contains('matched')) return;

  this.classList.add('flipped');
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    checkMatch();
    moveCount++;
    updateMoveCount();
  }
}

// Check match
function checkMatch() {
  const [firstCard, secondCard] = flippedCards;
  if (firstCard.getAttribute('data-value') === secondCard.getAttribute('data-value')) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedCards++;
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
    }, 1000);
  }
  flippedCards = [];
  if (matchedCards === 8) {
    alert(`You won the memory game! Total moves: ${moveCount}`);
  }
}

function updateMoveCount() {
  document.querySelector('#memoryGame span').textContent = `Moves: ${moveCount}`;
}

// Tic-Tac-Toe Game

let ticTacToeBoard = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

function startTicTacToe() {
  const cells = document.querySelectorAll('.tic-tac-toe-cell');
  cells.forEach(cell => cell.textContent = '');
  ticTacToeBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;

  cells.forEach(cell => {
    cell.addEventListener('click', handleTicTacToeMove);
  });

  document.getElementById('resetTicTacToe').addEventListener('click', startTicTacToe);
}

function handleTicTacToeMove(event) {
  const index = event.target.getAttribute('data-index');
  if (ticTacToeBoard[index] || !gameActive) return;
  ticTacToeBoard[index] = currentPlayer;
  event.target.textContent = currentPlayer;
  checkTicTacToeWinner();
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkTicTacToeWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (ticTacToeBoard[a] && ticTacToeBoard[a] === ticTacToeBoard[b] && ticTacToeBoard[a] === ticTacToeBoard[c]) {
      gameActive = false;
      alert(`${ticTacToeBoard[a]} wins!`);
      return;
    }
  }

  if (!ticTacToeBoard.includes('')) {
    gameActive = false;
    alert('It\'s a draw!');
  }
}

// Rock Paper Scissors Game

function startRockPaperScissors() {
  document.querySelector('#rock').addEventListener('click', () => playRPS('Rock'));
  document.querySelector('#paper').addEventListener('click', () => playRPS('Paper'));
  document.querySelector('#scissors').addEventListener('click', () => playRPS('Scissors'));
}

function playRPS(playerChoice) {
  const choices = ['Rock', 'Paper', 'Scissors'];
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];
  
  let result = '';

  if (playerChoice === computerChoice) {
    result = 'It\'s a tie!';
  } else if ((playerChoice === 'Rock' && computerChoice === 'Scissors') || (playerChoice === 'Paper' && computerChoice === 'Rock') || (playerChoice === 'Scissors' && computerChoice === 'Paper')) {
    result = 'You win!';
  } else {
    result = 'You lose!';
  }

  document.getElementById('rpsResult').textContent = `You chose: ${playerChoice}. Computer chose: ${computerChoice}. ${result}`;
}

// Number Guessing Game

let secretNumber = Math.floor(Math.random() * 100) + 1;

function startNumberGuessing() {
  document.getElementById('submitGuess').addEventListener('click', () => {
    const guess = parseInt(document.getElementById('guessInput').value, 10);
    const resultDiv = document.getElementById('guessResult');
    
    if (guess === secretNumber) {
      resultDiv.textContent = 'Congratulations! You guessed the right number!';
    } else if (guess < secretNumber) {
      resultDiv.textContent = 'Too low, try again!';
    } else {
      resultDiv.textContent = 'Too high, try again!';
    }
  });
}
