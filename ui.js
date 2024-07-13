class UI {
    constructor(game) {
        this.game = game;
        this.createGameBoard();
        this.createKeypad();
        this.createActions();
        this.createItems();
    }

    createGameBoard() {
        const gameBoard = document.getElementById('game-board');
        for (let y = 0; y < 9; y++) {
            this.game.board[y] = [];
            for (let x = 0; x < 9; x++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                gameBoard.appendChild(cell);
                this.game.board[y][x] = cell;
            }
        }
    }

    createKeypad() {
        const keypad = document.getElementById('keypad');
        for (let i = 1; i <= 9; i++) {
            this.createKey(keypad, i);
        }
        this.createKey(keypad, 0);
    }

    createKey(keypad, number) {
        const key = document.createElement('button');
        key.className = 'key';
        key.textContent = number;
        key.addEventListener('click', () => this.game.handleKeyPress(number));
        keypad.appendChild(key);
    }

    createActions() {
        const actions = document.getElementById('actions');
        for (let i = 0; i < 3; i++) {
            const action = document.createElement('button');
            action.className = 'action';
            action.textContent = `Attack ${i + 1}`;
            actions.appendChild(action);
        }
    }

    createItems() {
        const items = document.getElementById('items');
        for (let i = 0; i < 3; i++) {
            const item = document.createElement('button');
            item.className = 'item';
            item.textContent = `Item ${i + 1}`;
            items.appendChild(item);
        }
    }

    updateBoard() {
        for (let y = 0; y < 9; y++) {
            for (let x = 0; x < 9; x++) {
                const cell = this.game.board[y][x];
                cell.className = 'cell neutral';
                cell.textContent = '';

                if (x === 4 && y === 4) {
                    cell.className = 'cell player';
                } else if (this.game.enemies.some(e => e.x === x - 4 + this.game.playerPosition.x && e.y === y - 4 + this.game.playerPosition.y)) {
                    cell.className = 'cell enemy';
                    cell.textContent = 'E';
                } else if (Math.abs(x - 4) + Math.abs(y - 4) === 1) {
                    cell.className = 'cell movable';
                    const equation = this.game.generateEquation();
                    cell.textContent = equation;
                }
            }
        }
    }

    updateActionsAndItems() {
        const actions = document.querySelectorAll('.action');
        const items = document.querySelectorAll('.item');
        [...actions, ...items].forEach((element, index) => {
            const equation = this.game.generateEquation();
            element.textContent = equation;
        });
    }

    updateScore(score) {
        document.getElementById('score').textContent = `Score: ${score}`;
    }

    updateTimer(time) {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        document.getElementById('timer').textContent = `Time: ${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}
