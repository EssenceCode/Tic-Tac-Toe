// create a function to create players
const PlayerFactory = (name,marker) => {
  let getName = () => name;
  let getMarker = () => marker;

    return {getName, getMarker,name};
}
const playerOne = PlayerFactory('playerOne','X');
const playerTwo = PlayerFactory('playerTwo','O');

const gameBoard = (() => {
    let _board= new Array(9).fill('');
    let getBoard = () => [..._board];

    const placeMarker = (index,marker) => {
         deleteItem = 1;
         if(_board[index] !== '')return false;
         _board.splice(index,deleteItem,marker);
        
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
          (_board[0] === playerOne.getMarker() && _board[4] === playerOne.getMarker() && _board[8] === playerOne.getMarker()) ||
          (_board[2] === playerOne.getMarker() && _board[4] === playerOne.getMarker() && _board[6] === playerOne.getMarker())  
          ) {
           
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
          (_board[0] === playerTwo.getMarker() && _board[4] === playerTwo.getMarker() && _board[8] === playerTwo.getMarker()) ||
          (_board[2] === playerTwo.getMarker() && _board[4] === playerTwo.getMarker() && _board[6] === playerTwo.getMarker()) 
        
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

    const compChoice = () => {
        let indexes = board.getBoard().map((val,index) => index);
        let availableIndex = indexes.filter(index => board.getBoard()[index] === '' );
        const choice = availableIndex[Math.floor(Math.random() * availableIndex.length)];
    
        return choice;
    }

    const getPlayer = () => [...player]

    let activePlayers = player[0];

    let getActivePlayer = () => activePlayers

    const switchPlayers = () => {
        if(activePlayers === player[0]) {
            activePlayers = player[1];
        }
        else if (activePlayers === player[1]) {
            activePlayers = player[0];
        }
    }
    
    const isWin = () => {
        if(board.checkWinner() === 'draw') {
           return 'draw';
         }
         else if(board.checkWinner() === 'win') {
            return player[0].name;
            
         }
         else if(board.checkWinner() === 'lose') {
            return player[1].name;
         }     

         
}
    
    const playGame = (index) => {
        board.placeMarker(index,activePlayers.marker)
        isWin();
        switchPlayers(); 
        
    }

    const compPlay = () => {
        if(isWin())return;
        board.placeMarker(compChoice(),activePlayers.marker)
        console.log(activePlayers.marker)
        isWin();
        switchPlayers();
       

    }

    const resetGame = () => {
        board.resetBoard();
        activePlayers = player[0];
    }

    return { playGame, getPlayer,isWin,resetGame, getActivePlayer, compChoice, compPlay}
})();

const displayController = (() => {
    const game = gameController;
    const _boardDiv = document.querySelector('.board');  
  
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
  
    const renderBoard = (board) => {    
        for (let i = 0; i < board.length; i++) {
            const sqr = document.querySelectorAll('.sqr')
            sqr[i].textContent = board[i]
        }
    };
    const updateScreen = () => {
         const drawMsg = (name,name2) => result.textContent = `${name} and ${name2} is tied.`
         const winMsg = (name) => result.textContent = `${name} wins`;
         const loseMsg = (name) => result.textContent = `${name} wins`;
       
    // print the winner of the game;
        if(game.isWin() === 'draw') {   
            return drawMsg(game.getPlayer()[0].name,game.getPlayer()[1].name);
     }
         else if(game.isWin() === game.getPlayer()[0].name) {
             return winMsg(game.getPlayer()[0].name);
     }
         else if(game.isWin() === game.getPlayer()[1].name) {
             return loseMsg(game.getPlayer()[1].name);
     }
    };
    

    const sqrClick = () => {
        const sqr = document.querySelectorAll('.sqr');
        sqr.forEach(cell => cell.addEventListener('click', (e) => {
            const selectedSqr = e.target.getAttribute('index');
            if(game.isWin()||e.target.textContent !=='')return;
            if(game.getActivePlayer().name === game.getPlayer()[0].name) {
                game.playGame(selectedSqr);
                renderBoard(gameBoard.getBoard())
                updateScreen();  
            };
           setTimeout(() => {
            game.compPlay();
            renderBoard(gameBoard.getBoard())
            updateScreen(); 
          },1000);
            
          

        }));
      
    };

    const newGame = () => {
        game.resetGame();
        renderBoard(gameBoard.getBoard());
        result.textContent = '';
    }

 
    resetBtn.addEventListener('click',newGame)

    createGrid();
    sqrClick();
})();


