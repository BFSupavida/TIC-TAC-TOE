let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
//Array.form จะสร้าง array ให้กับใน () 
let boxes = Array.from(document.getElementsByClassName('box'))

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')
// console.log(boxes);

const O_TEXT = 'O'
const X_TEXT = 'X'
//start game with X
let currentPlayer = X_TEXT
//start game created for null
let spaces = Array(9).fill(null)

//func start game
const startGame = () => {
    //forEach for loop every array we created (spaces)
    //box คือชื่อที่ถูกกำหนดให้กับ parameter ตัวแรกของฟังก์ชัน callback ที่ใช้ใน forEach.
    // ในทุกรอบของการวนลูป, box จะเป็นค่าของแต่ละ element ใน boxes.
    //box.addEventListener(click, boxClicked) when clicked 'box' it will call boxclicke function
    boxes.forEach(box => box.addEventListener('click', boxClicked))

}

//
function boxClicked(e) {
    const id = e.target.id
    
    if (!spaces[id]) {
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if(playerHaswon() !==false){
            playerText.innerHTML = `${currentPlayer} has won!`
            let winning_blocks = playerHaswon()

            // console.log(winning_blocks);
            winning_blocks.map(box => boxes[box].style.backgroundColor=winnerIndicator)
        }

        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
    }
}

//condition for winning
const winningCombos = [
    //row
    [0,1,2],
    [3,4,5],
    [6,7,8],
    //col
    [0,3,6],
    [1,4,7],
    [2,5,8],
    //cross
    [0,4,8],
    [2,4,6]
]

function playerHaswon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition
        
        if (spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,c]
        }
    }
    return false
}

restartBtn.addEventListener('click', restart)

//restart
function restart() {
    spaces.fill(null);

    boxes.forEach(box => {
        box.innerText = '';
    });

    playerText.innerHTML = 'Tic Tac Toe';

    currentPlayer = X_TEXT;
}

startGame();