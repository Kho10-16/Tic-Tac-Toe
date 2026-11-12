const Gameboard = (function () {
    const board = Array(9).fill("");

    const getBoard = () => [...board];

    const placeMark = (index, mark) => {
        if (index < 0 || index > 8) return false;
        if (board[index] !== "") return false;
        board[index] = mark;
        return true;
    };

    const reset = () => {
        board.fill("");
    };

    return { getBoard, placeMark, reset };
})();

function createPlayer(name, mark) {
    return { name, mark };
}

const GameController = (function () {
    const players = [
        createPlayer("Player 1", "X"),
        createPlayer("Player 2", "O")
    ];
    let activePlayer = players[0];
    let gameOver = false;
    let result = "";                                         // NEW

    const winningLines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    const getActivePlayer = () => activePlayer;
    const getResult = () => result;                          // NEW

    const setPlayerNames = (name1, name2) => {               // NEW
        players[0].name = name1 || "Player 1";               // NEW
        players[1].name = name2 || "Player 2";               // NEW
    };                                                       // NEW

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const printBoard = () => {
        const cells = Gameboard.getBoard().map(cell => cell || " ");
        console.log(
            `${cells[0]} | ${cells[1]} | ${cells[2]}\n` +
            `${cells[3]} | ${cells[4]} | ${cells[5]}\n` +
            `${cells[6]} | ${cells[7]} | ${cells[8]}`
        );
    };

    const checkWinner = () => {
        const board = Gameboard.getBoard();
        return winningLines.some(([a, b, c]) =>
            board[a] !== "" && board[a] === board[b] && board[a] === board[c]
        );
    };

    const checkTie = () => Gameboard.getBoard().every(cell => cell !== "");

    const playRound = (index) => {
        if (gameOver) {
            console.log("Game is over. Call GameController.restart()");
            return;
        }

        const placed = Gameboard.placeMark(index, activePlayer.mark);
        if (!placed) {
            console.log("Invalid move, try again.");
            return;
        }

        printBoard();

        if (checkWinner()) {
            gameOver = true;
            result = `${activePlayer.name} wins!`;           // NEW
            console.log(result);                             // CHANGED
            return;
        }

        if (checkTie()) {
            gameOver = true;
            result = "It's a tie!";                          // NEW
            console.log(result);                             // CHANGED
            return;
        }

        switchPlayer();
        console.log(`${activePlayer.name}'s turn (${activePlayer.mark})`);
    };

    const restart = () => {
        Gameboard.reset();
        activePlayer = players[0];
        gameOver = false;
        result = "";                                         // NEW
        printBoard();
        console.log(`${activePlayer.name}'s turn (${activePlayer.mark})`);
    };

    return { playRound, getActivePlayer, getResult, setPlayerNames, restart }; // CHANGED
})();

const displayController = (function () {
    const boardDiv = document.querySelector(".board");
    const turnDiv = document.querySelector(".turn");
    const player1Input = document.querySelector("#player1"); // NEW
    const player2Input = document.querySelector("#player2"); // NEW
    const startButton = document.querySelector(".start-btn"); // NEW

    const render = () => {
        boardDiv.textContent = "";

        const board = Gameboard.getBoard();
        board.forEach((cell, index) => {
            const cellButton = document.createElement("button");
            cellButton.classList.add("cell");
            cellButton.dataset.index = index;
            cellButton.textContent = cell;
            boardDiv.appendChild(cellButton);
        });

        const result = GameController.getResult();           // NEW
        if (result) {                                        // NEW
            turnDiv.textContent = result;                    // NEW
        } else {                                             // NEW
            const player = GameController.getActivePlayer();
            turnDiv.textContent = `${player.name}'s turn (${player.mark})`;
        }                                                    // NEW
    };

    const handleClick = (event) => {
        const index = event.target.dataset.index;
        if (index === undefined) return;

        GameController.playRound(Number(index));
        render();
    };

    const handleStart = () => {                              // NEW
        const name1 = player1Input.value.trim();             // NEW
        const name2 = player2Input.value.trim();             // NEW
        GameController.setPlayerNames(name1, name2);         // NEW
        GameController.restart();                            // NEW
        render();                                            // NEW
    };                                                       // NEW

    boardDiv.addEventListener("click", handleClick);
    startButton.addEventListener("click", handleStart);      // NEW

    render();

    return { render };
})();