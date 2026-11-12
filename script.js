const Gameboard = (function() { //准备立刻执行，这就是IIFE
    const board = Array(9).fill("");

    const getBoard = () => [...board];  // 返回的是复印本

    const placeMark = (index, mark) => {
        if(index < 0 || index > 8) return false;
        if(board[index] !== "") return false;
        board[index] = mark;
        return true;
    };

    const reset = () => {
        board.fill("");
    };

    return { getBoard, placeMark, reset};
})();

function createPlayer(name, mark){
    return {name, mark};
}

const GameController = (function () {
    const players = [
        createPlayer("Player 1", "X"),
        createPlayer("Player 2", "O")
    ];
    let activePlayer = players[0];
    let gameOver = false;

    const winningLines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    const getActivePlayer = () => activePlayer;

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
            console.log(`${activePlayer.name} wins!`);
            return;
        }

        if (checkTie()) {
            gameOver = true;
            console.log("It's a tie!");
            return;
        }

        switchPlayer();
        console.log(`${activePlayer.name}'s turn (${activePlayer.mark})`);
    };

    const restart = () => {
        Gameboard.reset();
        activePlayer = players[0];
        gameOver = false;
        printBoard();
        console.log(`${activePlayer.name}'s turn (${activePlayer.mark})`);
    };

    return { playRound, getActivePlayer, restart };
})();

const displayController = (function () { // IIFE 画面控制器只需要一个
    const boardDiv = document.querySelector(".board");
    const turnDiv = document.querySelector(".turn");

    const render = () => { //重播画面的函数
        boardDiv.textContent = "";

        const board = Gameboard.getBoard();
        board.forEach((cell, index) => {
            const cellButton = document.createElement("button");
            cellButton.classList.add("cell"); // 加上class cell
            cellButton.dataset.index = index; // 在按钮上贴一张编号标签
            cellButton.textContent = cell; // 把格子内容写进按钮，空的就显示空白
            boardDiv.appendChild(cellButton); 
        });

        const player = GameController.getActivePlayer();
        turnDiv.textContent = `${player.name}'s turn (${player.mark})`;
    };

    render();

    return { render };
})(); // 立刻执行