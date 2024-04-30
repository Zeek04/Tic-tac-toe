const xClass = 'x'
const circleClass = 'o'
const winScreen = 'show'
const win = [
    [0, 1 ,2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const gridItems = document.querySelectorAll("[data-cell]");
const grid = document.getElementById('grid')
const winMessage = document.getElementById('message') 
const message = document.querySelector('[data-winning-message-text]')
const restart = document.getElementById("restartButton")
let circleTurn;

startGame()

function startGame(){
    circleTurn = false
    gridItems.forEach(item => {
        item.classList.remove(xClass)
        item.classList.remove(circleClass)
        item.removeEventListener('click', handleClick)
        item.addEventListener('click', handleClick, {once:true})
    })
    setHover()
    winMessage.classList.remove('show');
}

restart.addEventListener('click', startGame)

function handleClick(e){
    const item = e.target;
    const currentClass = circleTurn ? circleClass : xClass;
    placeMark(item, currentClass)
    if(checkWin(currentClass)){
        winner(false);
    }else if(isDraw()){
        winner(true)
    }else{
        swapTurns()
        setHover()
    }
}

function placeMark(item, currentClass){
    item.classList.add(currentClass);
}   

function swapTurns(){
    circleTurn = !circleTurn
}

function setHover(){
    grid.classList.remove(xClass)
    grid.classList.remove(circleClass)

    if(circleTurn){
        grid.classList.add(circleClass)
    }else{
        grid.classList.add(xClass)
    }
};

function checkWin(currentClass){
    return win.some(combination => {
        return combination.every(index => {
            return gridItems[index].classList.contains(currentClass)
        })
    })
}

function isDraw(){
    return [...gridItems].every(item => {
        return item.classList.contains(xClass) || item.classList.contains(circleClass)
    })
}

function winner(draw){
    if(draw){
        message.innerText = "Draw!"
    }else{
        message.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winMessage.classList.add('show')
}
