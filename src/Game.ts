import { Player } from "./Player";
import { Platform } from "./Platform";
import { Background } from "./Background";
import { Enemy } from "./Enemy";

export class Game {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    player: Player;
    platforms: Platform[];
    enemies: Enemy[];
    background: Background;
    lastTime: number;
    scrollX: number;
    isGameOver: boolean;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        this.player = new Player(50, 250);
        this.platforms = [
            new Platform(0, 400, 800, 50),
            new Platform(200, 300, 100, 20),
            new Platform(400, 200, 100, 20),
        ];
        this.enemies = [new Enemy(350, 350), new Enemy(500, 150)];
        this.background = new Background();
        this.lastTime = 0;
        this.scrollX = 0;
        this.isGameOver = false;
    }

    start(): void {
        this.lastTime = performance.now();
        this.gameLoop();
    }

    update(): void {
        const currentTime = performance.now();
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        this.player.update(deltaTime, this.platforms, this.enemies);
        this.enemies.forEach((enemy) => enemy.update(deltaTime));

        // Check if the player has moved beyond the middle of the screen, and scroll accordingly
        const middleScreenX = this.canvas.width / 2;
        if (this.player.x > middleScreenX) {
            this.scrollX = this.player.x - middleScreenX;
        }

        // Generate new platforms and enemies as the player progresses
        const lastPlatform = this.platforms[this.platforms.length - 1];
        if (lastPlatform.x - this.scrollX < this.canvas.width) {
            const newPlatformX =
                lastPlatform.x + lastPlatform.width + Math.random() * 200 + 50;
            const newPlatformY =
                Math.random() * (this.canvas.height - 200) + 100;
            const newPlatform = new Platform(
                newPlatformX,
                newPlatformY,
                100,
                20
            );
            this.platforms.push(newPlatform);

            const newEnemyX = newPlatformX + Math.random() * newPlatform.width;
            const newEnemyY = newPlatformY - 50;
            const newEnemy = new Enemy(newEnemyX, newEnemyY);
            this.enemies.push(newEnemy);
        }

        // Remove off-screen platforms and enemies
        this.platforms = this.platforms.filter(
            (platform) =>
                platform.x - this.scrollX < this.canvas.width + platform.width
        );
        this.enemies = this.enemies.filter(
            (enemy) => enemy.x - this.scrollX < this.canvas.width + enemy.width
        );

        // Check if the player has fallen below the game area
        if (this.player.y > this.canvas.height) {
            this.isGameOver = true;
        }
    }

    draw(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.background.draw(this.ctx, this.scrollX);

        for (const platform of this.platforms) {
            platform.draw(this.ctx, this.scrollX);
        }

        for (const enemy of this.enemies) {
            enemy.draw(this.ctx, this.scrollX);
        }

        this.player.draw(this.ctx, this.scrollX);
    }

    gameLoop(): void {
        if (this.isGameOver) {
            this.showGameOverScreen();
            return;
        }

        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }

    showGameOverScreen(): void {
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.font = "48px sans-serif";
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = "center";
        this.ctx.fillText(
            "Game Over",
            this.canvas.width / 2,
            this.canvas.height / 2
        );

        this.ctx.font = "32px sans-serif";
        this.ctx.fillText(
            "Click to Restart",
            this.canvas.width / 2,
            this.canvas.height / 2 + 50
        );
    }

    restart(): void {
        this.player = new Player(50, 200);
        this.platforms = [
            // Add initial platforms
            new Platform(0, 400, 800, 50),
            new Platform(200, 300, 100, 20),
            new Platform(400, 200, 100, 20),
        ];
        this.enemies = [
            // Add initial enemies
            new Enemy(300, 250),
        ];
        this.lastTime = performance.now();
        this.scrollX = 0;
        this.isGameOver = false;
        this.gameLoop();
    }
}
