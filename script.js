// create a function to create players
const PlayerFactory = (name,marker) => {
    getName = () => {return name};
    getMarker = () => {return marker};

    return {getName, getMarker};
}

const playerOne = PlayerFactory('John','X');
const playerTwo = PlayerFactory('Jane', 'O');

const documentMock = (() => ({
   querySelector: (selector) => ({
    textContent: null
   })
}))();

const gameBoard = ((doc) => {
    let board = new Array(9).fill('X');
    //create a grid of divs
   const createGrid = function(selector) {
    for(let i = 0; i < board.length; i++) {
        let container = doc.querySelector(selector);
        const sqr = document.createElement('div');
        sqr.classList.add('sqr');
        sqr.setAttribute('sqr-index', i);
        container.appendChild(sqr);
    }
   }
   const placeMarker = (index,marker) => {
        deleteItem = 1;
        board.splice(index,deleteItem,marker);
        console.log(board)
   }
   
   const getBoard = () => {
        return {...board}
   }
    return {createGrid, placeMarker, getBoard,board}
})(document || documentMock);

gameBoard.createGrid('.game-container');
// Gameboard.placeMarker(0,playerOne.getMarker())

const displayController = (() => {
    // ...
    const getSqr = () => {
        const sqr = document.querySelectorAll('.sqr')

        sqr.forEach(val => val.addEventListener('click',(e) =>{
            const sqrDiv = e.target;
            const sqrAtt = sqrDiv.getAttribute('sqr-index')
            // console.log(sqrDiv)
            sqrDiv.textContent = 'X'
            console.log(sqrAtt)

        }))
    }

    const displayMark = () => {
        // const sqr = document.getAttribute('index')
        // sqr
    }

    return {getSqr,displayMark}

})();
displayController.getSqr()
displayController.displayMark()