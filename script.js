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
    let getBoard = () => [..._board];
    const win = ''

    const placeMarker = (index,marker) => {
         deleteItem = 1;
         if(_board[index] !== '')return false;
         _board.splice(index,deleteItem,marker);
         console.log(_board);
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
            return 'win';
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
            return 'lose';
        }
        else if (_board.every(cell => cell !== '')) {
            return 'draw'
        }
       
      };
    
    const resetBoard = () => {
        _board = new Array(9).fill('');
    }  

     return {getBoard, placeMarker, printBoard, checkWinner, resetBoard}
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

    const getPlayer = () => [...player]

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
        // console.log(
        //     `${getActivePlayer().name} put his marker on cell ${index}`
        // )
        board.placeMarker(index,getActivePlayer().marker)
        // board.checkWinner();    
        switchPlayers(); 
    

    }

    return { getActivePlayer, playGame, getPlayer, checkWinner: board.checkWinner}
})();

const displayController = (() => {
    const game = gameController;
    const gameDiv = document.querySelector('.game-control')
    const _boardDiv = document.querySelector('.board');
    const _playerTurn = document.querySelector('.turn');
    const resultContainer = document.querySelector('.alert-container');
    const result = document.querySelector('.game-result');
    const resetBtn = document.querySelector('.reset');
    
   
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
         const drawMsg = (name,name2) => result.textContent = `${name} and ${name2} is tied.`
         const winMsg = (name) => result.textContent = `${name} wins`;
         const loseMsg = (name) => result.textContent = `${name} wins`;
         const toggleMsgAndBtn = () => {
            resultContainer.classList.add('display-on');
            gameDiv.style.display = 'none'

         };

         const isWin = () => {
            // print the winner of the game;
            if(game.checkWinner() === 'draw') {
               toggleMsgAndBtn();
               return drawMsg(game.getPlayer()[0].name,game.getPlayer()[1].name);
             }
             else if(game.checkWinner() === 'win') {
                toggleMsgAndBtn();
                return winMsg(game.getPlayer()[0].name);
                
             }
             else if(game.checkWinner() === 'lose') {
                toggleMsgAndBtn();
                return loseMsg(game.getPlayer()[1].name);

             }     

             
    }
        isWin()
        

        _playerTurn.textContent = `${activePlayer} turn`;


    }

    const sqrClick = () => {
        const sqr = document.querySelectorAll('.sqr');
        sqr.forEach(cell => cell.addEventListener('click', (e) => {
            const selectedSqr = e.target.getAttribute('index');
            
            if(e.target.textContent !=='')return;
            e.target.textContent = `${game.getActivePlayer().marker}`
            game.playGame(selectedSqr);
            updateScreen();

        }));
      
    }

    const resetBoard = (e) => {
        resetBtn.addEventListener('click',(e)=>console.log(e.target))
        
    }

    createGrid();
    updateScreen();
    sqrClick();
    resetBoard();
 
})();

// displayController.renderBoard(gameBoard.getBoard());

