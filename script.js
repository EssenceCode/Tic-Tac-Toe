// create a function to create players
const PlayerFactory = (name,marker) => {
    getName = () =>  name;
    getMarker = () => marker;

    return {getName, getMarker};
}

const playerOne = PlayerFactory('Player One','X');
const playerTwo = PlayerFactory('Player Two', 'O');

const gameBoard = (() => {
    let _board = new Array(9).fill('');
    let getBoard = () => [..._board]

    const placeMarker = (index,marker) => {
         deleteItem = 1;
         _board.splice(index,deleteItem,marker);
         console.log(_board);
         
    }

    const printBoard = () => {
        const boardWithCellValues = _board.map((val) => val);
        return boardWithCellValues
    }
    
     return {getBoard, placeMarker, printBoard}
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
        for (let i = 0; i < board.length; i++) {
            const sqr = document.querySelectorAll('.sqr');
            sqr[i].textContent = board[i];
        }
    }

    return { renderBoard }
})();

// displayController.renderBoard(gameBoard.getBoard());

const gameController = (() => {
    const board = gameBoard;

    const players = [
        {
            name: playerOne.getName(),
            marker: playerOne.getMarker(),
        },
        {
            name: playerTwo.getName(),
            marker: playerTwo.getMarker(),
        }
    ]

    let activePlayers = players[0];

    const switchPlayers = () => {
        if(activePlayers === players[0]) {
            activePlayers = players[1];
        }
        else if (activePlayers === players[1]) {
            activePlayers = players[0];
        }
    }

    const getActivePlayer = () => activePlayers;

    const playGame = (index) => {
        console.log(
            `${getActivePlayer().name} put his marker on column${index}`
        )
        
        board.placeMarker(index,getActivePlayer().marker)

        switchPlayers();    
    }

    return { getActivePlayer, playGame}
})();