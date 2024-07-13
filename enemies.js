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
