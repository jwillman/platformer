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
    }

    update(deltaTime: number): void {
        this.player.update(deltaTime, this.platforms, this.enemies);
        this.background.update(this.player.velocity.x);
        this.enemies.forEach((enemy) => enemy.update(deltaTime));
    }

    draw(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.background.draw(this.ctx);
        this.player.draw(this.ctx);
        this.platforms.forEach((platform) => platform.draw(this.ctx));
        this.enemies.forEach((enemy) => enemy.draw(this.ctx));
    }

    gameLoop(): void {
        const deltaTime = 1000 / 60;
        this.update(deltaTime);
        this.draw();
        requestAnimationFrame(() => this.gameLoop());
    }
}
