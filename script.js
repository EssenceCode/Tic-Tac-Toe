// create a function to create players
const PlayerFactory = (name,marker) => {
    getName = () => name;
    getMarker = () => marker;

    return {getName, getMarker};
}

const playerOne = PlayerFactory('Player One','X');
const playerTwo = PlayerFactory('Player Two', 'O');

const gameBoard = (() => {
    let _board= new Array(9).fill('');
    let getBoard = () => [..._board]

    const placeMarker = (index,marker) => {
         deleteItem = 1;
         _board.splice(index,deleteItem,marker);
        //  console.log(board.getBoard());
         
    }

    const printBoard = () => {
        const boardWithCellValues = _board.map((val) => val);
        return boardWithCellValues
    }
    
    const checkWinner = () => {
        if(
            // vertical
          (_board[0] === playerOne.getMarker() && _board[1] === playerOne.getMarker() && _board[2] === playerOne.getMarker()) ||
          (_board[3] === playerOne.getMarker() && _board[4] === playerOne.getMarker() && _board[5] === playerOne.getMarker()) ||
          (_board[6] === playerOne.getMarker() && _board[7] === playerOne.getMarker() && _board[8] === playerOne.getMarker()) ||
          // horizontal
          (_board[0] === playerOne.getMarker() && _board[3] === playerOne.getMarker() && _board[6] === playerOne.getMarker()) ||
          (_board[1] === playerOne.getMarker() && _board[4] === playerOne.getMarker() && _board[7] === playerOne.getMarker()) ||
          (_board[2] === playerOne.getMarker() && _board[5] === playerOne.getMarker() && _board[8] === playerOne.getMarker()) ||
          // diagonal
          (_board[0] === playerOne.getMarker() && _board[4] === playerOne.getMarker() && _board[8] === playerOne.getMarker()) 
        ) {
            // console.log(playerOne.getName());
            console.log(`${playerOne.getName()} won`);
        }
      
        else if (
                   // vertical
          (_board[0] === playerTwo.getMarker() && _board[1] === playerTwo.getMarker() && _board[2] === playerTwo.getMarker()) ||
          (_board[3] === playerTwo.getMarker() && _board[4] === playerTwo.getMarker() && _board[5] === playerTwo.getMarker()) ||
          (_board[6] === playerTwo.getMarker() && _board[7] === playerTwo.getMarker() && _board[8] === playerTwo.getMarker()) ||
          // horizontal
          (_board[0] === playerTwo.getMarker() && _board[3] === playerTwo.getMarker() && _board[6] === playerTwo.getMarker()) ||
          (_board[1] === playerTwo.getMarker() && _board[4] === playerTwo.getMarker() && _board[7] === playerTwo.getMarker()) ||
          (_board[2] === playerTwo.getMarker() && _board[5] === playerTwo.getMarker() && _board[8] === playerTwo.getMarker()) ||
          // diagonal
          (_board[0] === playerTwo.getMarker() && _board[4] === playerTwo.getMarker() && _board[8] === playerTwo.getMarker()) 
        ) {
            console.log(`${playerTwo.getName()} won`);
        }
        else if (!_board.includes('')) {
            console.log('draw')
        }
      
      };
     

     return {getBoard, placeMarker, printBoard, checkWinner}
})();

const gameController = (() => {
    const board = gameBoard;

    const player = [
        {
            name: playerOne.getName(),
            marker: playerOne.getMarker(),
        },
        {
            name: playerTwo.getName(),
            marker: playerTwo.getMarker(),
        }
    ]

    let activePlayers = player[0];

    const switchPlayers = () => {
        if(activePlayers === player[0]) {
            activePlayers = player[1];
        }
        else if (activePlayers === player[1]) {
            activePlayers = player[0];
        }
    }

    const getActivePlayer = () => activePlayers;

    const playGame = (index) => {
        console.log(
            `${getActivePlayer().name} put his marker on cell ${index}`
        )
        board.placeMarker(index,getActivePlayer().marker)
        board.checkWinner();    
    
        switchPlayers(); 

    }

    return { getActivePlayer, playGame}
})();

const displayController = (() => {
    const game = gameController;
    const _boardDiv = document.querySelector('.board');
    const _playerTurn = document.querySelector('.turn');

   
    const createGrid = () => {
        for(let i = 0; i < 9; i++) {
            const sqr = document.createElement('div');
            sqr.classList.add('sqr');
            sqr.setAttribute('index', i);
        
            _boardDiv.appendChild(sqr);
        }    
    };

    const updateScreen = () => {
         const activePlayer = game.getActivePlayer().name;   

        _playerTurn.textContent = activePlayer;
    }

    const sqrClick = () => {
        const sqr = document.querySelectorAll('.sqr');
        sqr.forEach(cell => cell.addEventListener('click', (e) => {
            const selectedSqr = e.target.getAttribute('index');
            e.target.textContent = `${game.getActivePlayer().marker}`
            updateScreen();
            game.playGame(selectedSqr);
        }));
      
    }

    createGrid();
    updateScreen();
    sqrClick();
 
})();

// displayController.renderBoard(gameBoard.getBoard());

