/* ==================== Model =================== */

class Board {
  constructor() {
    this.isX = true;
    this.plays = 0;
    this.xWins = 0;
    this.oWins = 0;
    this.board = [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ];
  }

  addMove(row, col) {
    this.plays++;
    this.isX ? (this.board[row][col] = "X") : (this.board[row][col] = "O");
  }

  isValidMove(row, col) {
    return this.board[row][col] === " ";
  }

  hasWon(row, col) {
    let player = this.isX ? "X" : "O";
    return (
      this.hasRowOrCol(row, col, player) || this.hasDiagonal(row, col, player)
    );
  }

  hasRowOrCol(row, col, player) {
    var hasRow = true;
    var hasCol = true;
    for (var i = 0; i < 3; i++) {
      if (this.board[row][i] !== player) {
        hasRow = false;
      }
      if (this.board[i][col] !== player) {
        hasCol = false;
      }
    }

    return hasRow || hasCol;
  }

  hasDiagonal(row, col, player) {
    var diagCount = 0;
    if (row === col) {
      for (var i = 0; i < 3; i++) {
        if (this.board[i][i] === player) {
          diagCount++;
        }
      }
    } else {
      for (var i = 0; i < 3; i++) {
        if (this.board[2 - i][i] === player) {
          diagCount++;
        }
      }
    }

    return diagCount === 3;
  }

  reset() {
    this.plays = 0;
    this.board = [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ];
  }
}

/* ================== Controllers and Viewers =============== */

var table = document.getElementById("board");
var squares = document.querySelectorAll("td");
var resetBtn = document.getElementById("reset");
var winCont = document.querySelector(".winner");
var winMsg = document.createElement("h2");
var xWinsCont = document.getElementById("xWins");
var oWinsCont = document.getElementById("oWins");
var firstPlayer, secondPlayer;
const board = new Board();

window.onload = () => {
  firstPlayer = prompt("First Player's Name (x)") || "Player 1";
  secondPlayer = prompt("Second Player's Name (o)") || "Player 2";
  xWinsCont.textContent = `${firstPlayer} <x> wins: `;
  oWinsCont.textContent = `${secondPlayer} <o> wins: `;
};

table.addEventListener("click", (e) => {
  let coords = e.target.id.split("-");
  if (board.isValidMove(coords[0], coords[1])) {
    addMoveToView(coords[0], coords[1], e.target);
    handlePotentialWin(coords[0], coords[1]);
  }
});

resetBtn.addEventListener("click", (e) => {
  if (winCont.hasChildNodes()) {
    winCont.removeChild(winMsg);
    winCont.classList.remove("show");
  }
  squares.forEach((square) => {
    square.textContent = "_";
  });
  board.reset();
});

function addMoveToView(row, col, position) {
  board.addMove(row, col);
  board.isX ? (position.textContent = "X") : (position.textContent = "O");
}

function handlePotentialWin(row, col) {
  if (board.hasWon(row, col)) {
    if (board.isX) {
      board.xWins++;
      winMsg.textContent = `Winner is: X ! ! !`;
      xWinsCont.textContent = `${firstPlayer} (X) wins: ${board.xWins}`;
    } else {
      board.oWins++;
      winMsg.textContent = `Winner is: O ! ! !`;
      oWinsCont.textContent = `${secondPlayer} (O) wins: ${board.oWins}`;
    }
    winCont.classList.add("show");
    winCont.append(winMsg);
  } else if (board.plays === 9) {
    winMsg.textContent = "It's a tie ! ! !";
    winCont.append(winMsg);
    winCont.classList.add("show");
  } else {
    board.isX = !board.isX;
  }
}

/*************** AUDIO *******************/

let music = new Howl({
  src: ['./assets/Lobby_Theme.mp3'],
  autoplay: true,
  loop: true,
  volume: 0.2,
  onplayerror: function() {
    music.once('unlock', function() {
      music.play();
    });
  }
});

var hidden, visibilityChange;
if (typeof document.hidden !== "undefined") {
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}

if (hidden) {
  document.addEventListener(visibilityChange, () => {
    if (document.visibilityState === 'visible') {
      music.play()
      music.fade(0, 0.2, 1000);
    } else {
      music.fade(0.2, 0, 1000);
      music.once('fade', () => {
        music.pause();
      })
    }
  });
}
