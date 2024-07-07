const Gameboard = (function () {
    const board = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];

    const getSquare = (row, col) => {
        return board[row][col];
    };
    const setSquare = (row, col, value) => {
        board[row][col] = value;
    };

    return {
        getSquare,
        setSquare,
    };
})();

class Player {
    constructor(name, symbol) {
        this.name = name;
        this.symbol = symbol;
    }
}

const user = new Player("User", "X");
const enemy = new Player("Enemy", "O");

const GameManager = (function () {
    let gameSquares = document.querySelectorAll(".game-btn");
    let currentPlayer;
    const gameBoard = document.getElementById("game-board");
    const gameOverModal = document.getElementById("game-over-modal");
    const gameOverMessage = document.getElementById("game-over-message");
    const replayBtn = document.getElementById("replay-btn");
    const restartBtn = document.getElementById("restart-btn");

    const init = () => {
        currentPlayer = user;
        console.log("Game started. Current board:");
        updateBoard();
        addEventListeners();
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === user ? enemy : user;
    };

    const makeMove = (row, col) => {
        if (Gameboard.getSquare(row, col) === null) {
            Gameboard.setSquare(row, col, currentPlayer.symbol);
            updateBoard();
            if (checkWin()) {
                showGameOverModal(`${currentPlayer.name} wins!`);
                return;
            }
            if (checkDraw()) {
                showGameOverModal("It's a draw!");
                return;
            }
            switchPlayer();
        } else {
            console.log("Invalid move. Try again.");
        }
    };

    const showGameOverModal = (message) => {
        gameOverMessage.textContent = message;
        gameBoard.classList.add("blur");
        gameOverModal.classList.add("modal-open");
    };

    const hideGameOverModal = () => {
        gameBoard.classList.remove("blur");
        gameOverModal.classList.remove("modal-open");
    };

    const replayGame = () => {
        resetBoard();
        hideGameOverModal();
        updateBoard();
    };

    const restartGame = () => {
        resetBoard();
        hideGameOverModal();
        init();
    };

    const resetBoard = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                Gameboard.setSquare(i, j, null);
            }
        }
    };

    const addEventListeners = () => {
        replayBtn.addEventListener("click", replayGame);
        restartBtn.addEventListener("click", restartGame);
    };

    const checkWin = () => {
        const winningHashes = new Set([
            "111000000",
            "000111000",
            "000000111", // Rows ^^
            "100100100",
            "010010010",
            "001001001", // Columns ^^
            "100010001",
            "001010100", // Diagonals ^^
        ]);

        let boardHash = "";
        for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
            for (let colIndex = 0; colIndex < 3; colIndex++) {
                const squareContent = Gameboard.getSquare(rowIndex, colIndex);
                if (squareContent === currentPlayer.symbol) {
                    boardHash += "1";
                } else {
                    boardHash += "0";
                }
            }
        }

        for (const winHash of winningHashes) {
            if ((parseInt(boardHash, 2) & parseInt(winHash, 2)) === parseInt(winHash, 2)) {
                return true;
            }
        }

        return false;
    };

    const checkDraw = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (Gameboard.getSquare(i, j) === null) {
                    return false;
                }
            }
        }
        return true;
    };

    const updateBoard = () => {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                gameSquares[row * 3 + col].textContent = Gameboard.getSquare(row, col);
            }
        }
    };

    gameSquares.forEach((square) => {
        square.addEventListener("click", () => {
            const [row, col] = square.id.split("-");
            makeMove(parseInt(row), parseInt(col));
        });
    });

    return { init, makeMove };
})();

// Initialize the game
GameManager.init();
