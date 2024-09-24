//let player = [
//  { name: Goddowell, symbol: X },
//  { name: Faith, symbol: O },
//];

// script.js

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", () => {
  // Step 1: Set Up the Players
  const players = [
    { name: "Goddowell", symbol: "X" },
    { name: "Marvelous", symbol: "O" },
  ];

  let currentPlayerIndex = 0; // Index to track the current player
  let board = Array(9).fill(null); // Initialize the board
  let gameActive = true; // Flag to check if the game is active

  // Display player names and symbols in the HTML
  document.getElementById("p1-name").innerText = players[0].name;
  document.getElementById("p2-name").innerText = players[1].name;
  document.getElementById("p1-symbol").innerText = players[0].symbol;
  document.getElementById("p2-symbol").innerText = players[1].symbol;

  // Step 2: Play!
  const squares = document.querySelectorAll(".square");

  squares.forEach((square, index) => {
    square.addEventListener("click", () => handleSquareClick(index));
  });

  function handleSquareClick(index) {
    if (board[index] || !gameActive) {
      // Square already filled or game over
      return;
    }

    // Place the current player's symbol in the board array
    board[index] = players[currentPlayerIndex].symbol;
    // Update the UI
    squares[index].innerText = players[currentPlayerIndex].symbol;

    // Check for a winner or a draw
    if (checkWinner()) {
      alert(`${players[currentPlayerIndex].name} wins!`);
      gameActive = false;
      return;
    }

    if (board.every((cell) => cell)) {
      alert("It's a Tie, Nobody Won");
      gameActive = false;
      return;
    }

    // Switch to the next player
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  }

  function checkWinner() {
    const winConditions = [
      // Rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonals
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winConditions.some((condition) => {
      const [a, b, c] = condition;
      return board[a] && board[a] === board[b] && board[a] === board[c];
    });
  }

  // Optional: Add a Reset Button
  const resetButton = document.createElement("button");
  resetButton.innerText = "Reset Game";
  resetButton.style.display = "block";
  resetButton.style.margin = "20px auto";
  document.body.appendChild(resetButton);

  resetButton.addEventListener("click", resetGame);

  function resetGame() {
    board = Array(9).fill(null);
    gameActive = true;
    currentPlayerIndex = 0;
    squares.forEach((square) => {
      square.innerText = "";
    });
  }
});
