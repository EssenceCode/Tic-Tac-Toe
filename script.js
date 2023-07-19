// create a function to create players
const PlayerFactory = (name,marker) => {
    getName = () => {return name};
    getMarker = () => {return marker};

    return {getName, getMarker};
}

const playerOne = PlayerFactory('John','X');
const playerTwo = PlayerFactory('Jane', 'O');

const gameBoard = (() => {
    let board = new Array(9).fill('');

    const placeMarker = (index,marker) => {
         deleteItem = 1;
         board.splice(index,deleteItem,marker);
         console.log(board)
    }
    
     return {board, placeMarker}
})();

const displayController = (() => {
    const _container = document.querySelector('.game-container');
   
    for(let i = 0; i < 9; i++) {
        const sqr = document.createElement('div');
        sqr.classList.add('sqr');
        sqr.setAttribute('index', i);
       
        _container.appendChild(sqr);
    }
   

    const renderBoard = (board) => {
        const sqrDiv = document.querySelectorAll('.sqr');
    
        for (let i = 0; i < board.length; i++) {
            const sqr = document.querySelectorAll('.sqr')
            sqr[i].textContent = board[i]
        }
    }

    return { renderBoard }
})();

displayController.renderBoard(gameBoard.board)