class SolversGame {
    constructor() {
        this.board = [];
        this.playerPosition = { x: 4, y: 4 };
        this.currentEquations = {};
        this.initializeGame();
    }

    initializeGame() {
        this.createGameBoard();
        this.createKeypad();
        this.updateBoard();
    }

    createGameBoard() {
        const gameBoard = document.getElementById('game-board');
        for (let y = 0; y < 9; y++) {
            this.board[y] = [];
            for (let x = 0; x < 9; x++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                gameBoard.appendChild(cell);
                this.board[y][x] = cell;
            }
        }
    }

    createKeypad() {
        const keypad = document.getElementById('keypad');
        for (let i = 1; i <= 9; i++) {
            const key = document.createElement('button');
            key.className = 'key';
            key.textContent = i;
            key.addEventListener('click', () => this.handleKeyPress(i));
            keypad.appendChild(key);
        }
        const key0 = document.createElement('button');
        key0.className = 'key';
        key0.textContent = '0';
        key0.addEventListener('click', () => this.handleKeyPress(0));
        keypad.appendChild(key0);
    }

    updateBoard() {
        this.currentEquations = {};
        for (let y = 0; y < 9; y++) {
            for (let x = 0; x < 9; x++) {
                const cell = this.board[y][x];
                cell.className = 'cell neutral';
                cell.textContent = '';

                if (x === this.playerPosition.x && y === this.playerPosition.y) {
                    cell.className = 'cell player';
                } else if (Math.random() < 0.1) {
                    cell.className = 'cell enemy';
                } else if (this.isAdjacentToPlayer(x, y)) {
                    cell.className = 'cell movable';
                    const equation = this.generateEquation();
                    const result = this.solveEquation(equation);
                    cell.textContent = equation;
                    this.currentEquations[result] = { x, y };
                }
            }
        }
    }

    isAdjacentToPlayer(x, y) {
        const { x: px, y: py } = this.playerPosition;
        return (Math.abs(x - px) + Math.abs(y - py) === 1);
    }

    generateEquation() {
        const operators = ['+', '-', '*'];
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const operator = operators[Math.floor(Math.random() * operators.length)];
        return `${num1}${operator}${num2}`;
    }

    solveEquation(equation) {
        return eval(equation);
    }

    handleKeyPress(key) {
        if (key in this.currentEquations) {
            const { x, y } = this.currentEquations[key];
            this.playerPosition = { x, y };
            this.updateBoard();
        }
    }
}

window.onload = () => {
    new SolversGame();
};
