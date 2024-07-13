class SolversGame {
    constructor() {
        this.hexagons = [];
        this.initializeGame();
    }

    initializeGame() {
        const grid = document.getElementById('hexagon-grid');
        for (let i = 0; i < 7; i++) {
            const hex = document.createElement('div');
            hex.className = 'hexagon';
            hex.addEventListener('click', () => this.handleHexClick(i));
            grid.appendChild(hex);
            this.hexagons.push(hex);
        }

        document.getElementById('area-attack').addEventListener('click', () => this.handleAttack('area'));
        document.getElementById('strike-attack').addEventListener('click', () => this.handleAttack('strike'));
        document.getElementById('range-attack').addEventListener('click', () => this.handleAttack('range'));

        this.updateHexagons();
    }

    updateHexagons() {
        this.hexagons.forEach((hex, index) => {
            const equation = this.generateEquation();
            const result = this.solveEquation(equation);
            hex.textContent = `${equation} = ${result}`;
        });
    }

    generateEquation() {
        const operators = ['+', '-', '*', '/'];
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        const operator = operators[Math.floor(Math.random() * operators.length)];
        return `${num1} ${operator} ${num2}`;
    }

    solveEquation(equation) {
        return eval(equation);
    }

    handleHexClick(index) {
        const message = document.getElementById('message');
        message.textContent = `Moved to hexagon ${index + 1}`;
        this.updateHexagons();
    }

    handleAttack(type) {
        const message = document.getElementById('message');
        message.textContent = `Used ${type} attack`;
        this.updateHexagons();
    }
}

window.onload = () => {
    new SolversGame();
};
