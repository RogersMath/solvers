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
        this.ui.updateBoard();
        this.generateEquations();
        this.ui.updateActionsAndItems();
    }

    generateEquations() {
        const availableNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const operations = ['+', '-', '*', '/'];
        this.currentEquations = {};

        while (availableNumbers.length > 0) {
            const a = availableNumbers.splice(Math.floor(Math.random() * availableNumbers.length), 1)[0];
            const b = Math.floor(Math.random() * 10);
            const operation = operations[Math.floor(Math.random() * operations.length)];

            let equation, result;
            switch (operation) {
                case '+':
                    equation = `${a + b} - ${b}`;
                    result = a;
                    break;
                case '-':
                    equation = `${a + b} + ${b}`;
                    result = a;
                    break;
                case '*':
                    equation = `${a * b} / ${b}`;
                    result = a;
                    break;
                case '/':
                    equation = `${a * b} * ${b}`;
                    result = a;
                    break;
            }
            this.currentEquations[result] = equation;
        }

        // Assign equations to movable cells
        const directions = [
            { x: 0, y: -1 }, // Up
            { x: 1, y: 0 },  // Right
            { x: 0, y: 1 },  // Down
            { x: -1, y: 0 }  // Left
        ];

        directions.forEach((dir, index) => {
            const cell = this.board[4 + dir.y][4 + dir.x];
            cell.textContent = this.currentEquations[index];
        });
    }

    handleKeyPress(key) {
        if (key in this.currentEquations) {
            if (key < 4) {
                const directions = [
                    { x: 0, y: -1 }, // Up
                    { x: 1, y: 0 },  // Right
                    { x: 0, y: 1 },  // Down
                    { x: -1, y: 0 }  // Left
                ];
                this.playerPosition.x += directions[key].x;
                this.playerPosition.y += directions[key].y;
            } else {
                console.log(`Action ${key - 3} triggered`);
                // Implement action logic here
            }
            this.endTurn();
        }
    }
}

class EnemyManager {
    constructor(game) {
        this.game = game;
        this.enemies = [];
    }

    spawnEnemy() {
        const side = Math.floor(Math.random() * 4);
        let x, y;
        switch (side) {
            case 0: // Top
                x = Math.floor(Math.random() * 9) - 4;
                y = -4;
                break;
            case 1: // Right
                x = 5;
                y = Math.floor(Math.random() * 9) - 4;
                break;
            case 2: // Bottom
                x = Math.floor(Math.random() * 9) - 4;
                y = 5;
                break;
            case 3: // Left
                x = -5;
                y = Math.floor(Math.random() * 9) - 4;
                break;
        }
        this.enemies.push({ x, y });
    }

    moveEnemies() {
        this.enemies.forEach(enemy => {
            const dx = Math.sign(this.game.playerPosition.x - enemy.x);
            const dy = Math.sign(this.game.playerPosition.y - enemy.y);
            if (Math.abs(dx) > Math.abs(dy)) {
                enemy.x += dx;
            } else {
                enemy.y += dy;
            }
        });
    }

    removeDeadEnemies() {
        this.enemies = this.enemies.filter(enemy => 
            Math.abs(enemy.x - this.game.playerPosition.x) > 0 || 
            Math.abs(enemy.y - this.game.playerPosition.y) > 0
        );
    }
}

window.onload = () => {
    new SolversGame();
};
