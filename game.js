class SolversGame {
    constructor() {
        this.hexagons = [];
        this.currentEquations = {};
        this.initializeGame();
    }

    initializeGame() {
        this.createHexagonGrid();
        this.createKeypad();
        this.updateHexagons();
    }

    createHexagonGrid() {
        const grid = document.getElementById('hexagon-grid');
        const layout = [
            [0,1,1,0,1,1,0],
            [1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1],
            [1,1,1,1,1,1,1],
            [0,1,1,0,1,1,0]
        ];

        layout.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                const hex = document.createElement('div');
                hex.className = cell ? 'hex' : 'hex blank';
                if (cell) {
                    this.hexagons.push(hex);
                }
                grid.appendChild(hex);
            });
            if (rowIndex % 2 === 0) {
                const spacer = document.createElement('div');
                spacer.className = 'hex blank';
                grid.appendChild(spacer);
            }
        });
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

    updateHexagons() {
        this.currentEquations = {};
        this.hexagons.forEach((hex, index) => {
            const equation = this.generateEquation();
            const result = this.solveEquation(equation);
            hex.textContent = equation;
            this.currentEquations[result] = index;
        });
    }

    generateEquation() {
        const operators = ['+', '-', '*'];
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const operator = operators[Math.floor(Math.random() * operators.length)];
        return `${num1} ${operator} ${num2}`;
    }

    solveEquation(equation) {
        return eval(equation);
    }

    handleKeyPress(key) {
        const message = document.getElementById('message');
        if (key in this.currentEquations) {
            const hexIndex = this.currentEquations[key];
            message.textContent = `Moved to hexagon ${hexIndex + 1}`;
            this.updateHexagons();
        } else {
            message.textContent = `No action for ${key}`;
        }
    }
}

window.onload = () => {
    new SolversGame();
};
