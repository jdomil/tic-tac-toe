// Game logic module
const gameController = (() => {

    const grid = document.querySelector('.grid')

    // Game board module
    const gameBoard = (() => {
        boardArray = new Array(3).fill('').map(() => new Array(3).fill(''))
        return {boardArray}
    })()

    // Player factory function
    const Player = (name, mark) => {
        const playerName = name
        const playerMark = mark
        return {playerName, playerMark}
    }

    const updateDisplay = () => {
        gameBoard.boardArray.forEach((_, row) => {
            _.forEach((cellValue, column) => {
                const newCell = document.createElement('div')
                newCell.textContent = cellValue
                newCell.classList.add('cell')
                newCell.setAttribute('style', `grid-row: ${row+1}; grid-column: ${column+1};`)
                newCell.setAttribute('data-row', `${row}`)
                newCell.setAttribute('data-column', `${column}`)
                grid.appendChild(newCell)
            })
        });
    }

    const swapPlayers = () => {
        if (activePlayer === player1) {
            activePlayer = player2
        } else {
            activePlayer = player1
        }
    }

    const gameOver = () => {

        const checkDraw = () => {
            let emptyCells = false
            for (let i = 0; i < 3; i++) {
                let row = boardArray[i]
                let cellEmpty = row.includes('')
                if(cellEmpty) {
                    emptyCells = true
                } else {
                    emptyCells = false
                }
            }
            return !emptyCells
        }

        const checkRow = () => {
            for (let i = 0; i < 3; i++) {
                let row = boardArray[i]
                let rowSame = row.every(cell => cell === row[0] && cell != '')
                if (rowSame) {
                    return true
                } 
            }
        }

        const checkColumn = () => {
            let transposed = boardArray[0].map((_, colIndex) => boardArray.map(row => row[colIndex]));
            for (let i = 0; i < 3; i++) {
                let column = transposed[i]
                let columnSame = column.every(cell => cell === column[0] && cell != '')
                if (columnSame) {
                    return true
                }     
            }
        }

        const checkDiagonals = () => {
            let diagonal1 = [boardArray[0][0], boardArray[1][1], boardArray[2][2]]
            let diagonal2 = [boardArray[0][2], boardArray[1][1], boardArray[2][0]]
            if (diagonal1.every(cell => cell === diagonal1[0] && cell != '') 
            || diagonal2.every(cell => cell === diagonal1[0] && cell != '')) {
                return true
            }
        }
        
        if (checkDraw()) {
            alert('It is a tie')
            gameOn = false
        } else if (checkRow()) {
            alert(`${activePlayer.playerName} wins`)
            console.log('row win');
            gameOn = false
        } else if (checkColumn()) {
            alert(`${activePlayer.playerName} wins`)
            console.log('column win');
            gameOn = false
        } else if (checkDiagonals()) {
            alert(`${activePlayer.playerName} wins`)
            console.log('diagonal win');
            gameOn = false
        }


    }

    const addMark = (cell) => {
        if (!cell.classList.contains('marked') && gameOn) {
            let row = parseInt(cell.getAttribute('data-row'))
            let column = parseInt(cell.getAttribute('data-column'))
            boardArray[row][column] = activePlayer.playerMark
            cell.textContent = activePlayer.playerMark
            cell.classList.add('marked')
            gameOver()
            swapPlayers()
        }
    }

    const player1 = Player('player1', 'O')
    const player2 = Player('player2', 'X')
    let activePlayer = player1
    let gameOn = true

    return {updateDisplay, addMark}
})()

gameController.updateDisplay()

const cells = document.querySelectorAll('.cell')

cells.forEach(cell => {
    cell.addEventListener('click', e => {
        gameController.addMark(e.target)
    })
})








