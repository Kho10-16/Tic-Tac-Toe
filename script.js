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
