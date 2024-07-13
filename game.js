class SolversGame {
    constructor() {
        this.board = [];
        this.playerPosition = { x: 0, y: 0 };
        this.currentEquations = {};
        this.score = 0;
        this.timeRemaining = 5 * 60; // 5 minutes in seconds
        this.turnDuration = 10; // 10 seconds per turn
        this.turnTimeRemaining = this.turnDuration;
        this.ui = new UI(this);
        this.enemyManager = new EnemyManager(this);
        this.initializeGame();
    }

    initializeGame() {
        this.updateBoard();
        this.startGameLoop();
    }

    startGameLoop() {
        this.gameInterval = setInterval(() => {
            this.timeRemaining--;
            this.turnTimeRemaining--;

            if (this.turnTimeRemaining <= 0) {
                this.endTurn();
            }

            if (this.timeRemaining <= 0) {
                this.endGame();
            }

            this.ui.updateTimer(this.timeRemaining);
        }, 1000);
    }

    endTurn() {
        this.turnTimeRemaining = this.turnDuration;
        this.enemyManager.moveEnemies();
        this.enemyManager.removeDeadEnemies();
        this.score += this.enemyManager.enemies.length;
        if (Math.random() < 0.3) { // 30% chance to spawn a new enemy each turn
            this.enemyManager.spawnEnemy();
        }
        this.updateBoard();
        this.ui.updateScore(this.score);
    }

    endGame() {
        clearInterval(this.gameInterval);
        alert(`Game Over! Your score: ${this.score}`);
    }

    updateBoard() {
        this.currentEquations = {};
        this.ui.updateBoard();
        this.ui.updateActionsAndItems();
        this.generateMoveEquations();
    }

    generateMoveEquations() {
        const directions = [
            { x: 0, y: -1, key: 1 }, // Up
            { x: 1, y: 0, key: 2 },  // Right
            { x: 0, y: 1, key: 3 },  // Down
            { x: -1, y: 0, key: 4 }  // Left
        ];

        directions.forEach(dir => {
            const equation = this.generateEquation();
            const result = this.solveEquation(equation) % 10;
            this.currentEquations[result] = dir;
            const cell = this.board[4 + dir.y][4 + dir.x];
            cell.textContent = equation;
        });

        // Generate equations for actions and items
        for (let i = 5; i <= 9; i++) {
            const equation = this.generateEquation();
            const result = this.solveEquation(equation) % 10;
            this.currentEquations[result] = { action: i - 4 };
        }
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
            const action = this.currentEquations[key];
            if (action.x !== undefined && action.y !== undefined) {
                this.playerPosition.x += action.x;
                this.playerPosition.y += action.y;
            } else if (action.action !== undefined) {
                console.log(`Action ${action.action} triggered`);
                // Implement action logic here
            }
            this.endTurn();
        }
    }
}

window.onload = () => {
    new SolversGame();
};
