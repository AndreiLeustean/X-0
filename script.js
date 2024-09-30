let xOr0 = 0;
let nrWinsX = 0;
let nrWins0 = 0;
let listX = [];
let list0 = [];

function restartGame() { // clear all the squares
    for (let i = 0; i < 9; i++) {
        document.getElementById(`box${i}`).textContent = '';
    }
    listX = [];
    list0 = [];
}

function showMessageWins(messageID, buttonID) { // if someone wins or equal
    let messageBox = document.getElementById(messageID);
    let closeBtn = document.getElementById(buttonID);
    messageBox.classList.remove('hidden');
    xOr0 = 0;
    closeBtn.addEventListener('click', function () {
        document.querySelectorAll(".message-box").forEach(box => {
            box.classList.add("hidden");
        });
        restartGame();
        removeWinningLine();
    });
}

function updateScores() {
    document.querySelector("#XWins").textContent = `X - ${nrWinsX}`;
    document.querySelector("#OWins").textContent = `0 - ${nrWins0}`;
}

function updateUsersRound() {
    if (xOr0 % 2 === 0) {
        document.getElementById('text4').textContent = "Este rândul jucătorului X";
    } else {
        document.getElementById('text4').textContent = "Este rândul jucătorului 0";
    }
}

function drawWinningLine(startSquare, endSquare) {
    const line = document.getElementById('winningLine');
    line.style.display = 'block';
    const startElement = document.querySelector(`.square:nth-child(${startSquare})`);
    const endElement = document.querySelector(`.square:nth-child(${endSquare})`);
    const startRect = startElement.getBoundingClientRect();
    const endRect = endElement.getBoundingClientRect();
    const deltaX = endRect.left - startRect.left;
    const deltaY = endRect.top - startRect.top;
    const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    line.style.width = `${length}px`;
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    line.style.transform = `rotate(${angle}deg)`;
    line.style.top = `${startRect.top + startRect.height / 2}px`;
    line.style.left = `${startRect.left + startRect.width / 2}px`;
}

function removeWinningLine() {
    const line = document.getElementById('winningLine');
    line.style.display = 'none';
}

function winner(list) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    return lines.some(line => line.every(index => list.includes(index)));
}

function findSquaresLine(list) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    const winningLine = lines.find(line => line.every(index => list.includes(index)));
    if (winningLine) {
        return {
            first: winningLine[0],
            last: winningLine[winningLine.length - 1]
        };
    }
    return null;
}

document.getElementById("boxes").addEventListener('click', function (event) {
    if (event.target.classList.contains('square')) {
        const number = parseInt(event.target.id.replace('box', ''));//take number of box

        if (!event.target.textContent) {
            if (xOr0 % 2 === 0) {
                event.target.textContent = "X"
                listX.push(number);
            } else {
                event.target.textContent = "0"
                list0.push(number);
            }
            ++xOr0;
        }
        console.log(xOr0);

        if (winner(listX)) {
            showMessageWins('message-WinX', 'xWin');
            ++nrWinsX;
            squares = findSquaresLine(listX);
            drawWinningLine(squares.first + 1, squares.last + 1);
        } else if (winner(list0)) {
            showMessageWins('message-Win0', '0Win');
            ++nrWins0;
            squares = findSquaresLine(list0);
            drawWinningLine(squares.first + 1, squares.last + 1);
        } else if (xOr0 === 9) {
            showMessageWins('message-Equal', 'equal');
        }
        console.log(xOr0);
        updateScores();
        updateUsersRound();
    }
});

