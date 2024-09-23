const area = document.getElementById('area');
const columns = 5;
const rows = 6;

let curRow = 1;
let curCol = 1;

let keyWord = ["P", "H", "O", "N", "E"];

const wordGuesses = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: []
}

function createGameBoard() {
    let cellIndex = 1;
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
            area.innerHTML += "<div class='cell' id='cell_" + cellIndex + "' contenteditable='true'></div>";
            cellIndex++;
        }
    }
}

createGameBoard();

const cells = document.getElementsByClassName('cell');

for (const cell of cells) {
    cell.addEventListener("keyup", letterType);
}

function letterType(event) {
    const key = event.key.toUpperCase();
    if (key.length === 1 && key.match(/[A-Z]/i)) {
        wordGuesses[curRow].push(key);
        event.target.innerText = key;

        if (curCol < columns) {
            curCol++;
        } else {
            checkLetters(wordGuesses, curRow);
            curRow++;
            curCol = 1;
        }
    }
}

function checkLetters(obj, curRow) {
    const startIndex = (curRow - 1) * columns + 1;
    let allCorrect = true;

    for (let i = 0; i < columns; i++) {
        const cell = document.getElementById(`cell_${startIndex + i}`);
        if (obj[curRow][i] === keyWord[i]) {
            cell.classList.add('correct');
        } else if (keyWord.includes(obj[curRow][i])) {
            cell.classList.add('partial');
            allCorrect = false;
        } else {
            cell.classList.add('none');
            allCorrect = false;
        }
    }

    if (allCorrect) {
        setTimeout(checkForWin, 1000);
    }
}

const checkForWin = () => {
    alert("You Won, Congratulations!!!");
}