import { Platform } from "./Platform";
import { Enemy } from "./Enemy";

export class Player {
    x: number;
    y: number;
    width: number;
    height: number;
    velocity: { x: number; y: number };
    onGround: boolean;
    jumpForce: number;
    gravity: number;
    speed: number;
    moveLeft: boolean;
    moveRight: boolean;
    spacePressed: boolean;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.velocity = { x: 0, y: 0 };
        this.onGround = false;
        this.jumpForce = 15;
        this.gravity = 0.5;
        this.speed = 5;
        this.moveLeft = false;
        this.moveRight = false;
        this.spacePressed = false;
        this.initializeControls();
    }

    initializeControls(): void {
        window.addEventListener("keydown", (e) => {
            if (e.code === "ArrowLeft") {
                this.moveLeft = true;
            }
            if (e.code === "ArrowRight") {
                this.moveRight = true;
            }
            if (e.code === "Space") {
                this.spacePressed = true;
            }
        });

        window.addEventListener("keyup", (e) => {
            if (e.code === "ArrowLeft") {
                this.moveLeft = false;
            }
            if (e.code === "ArrowRight") {
                this.moveRight = false;
            }
            if (e.code === "Space") {
                this.spacePressed = false;
            }
        });
    }

    update(deltaTime: number, platforms: Platform[], enemies: Enemy[]): void {
        this.velocity.y += this.gravity;
        this.y += this.velocity.y;

        this.onGround = false;
        platforms.forEach((platform) => {
            if (
                this.y + this.height > platform.y &&
                this.y < platform.y + platform.height &&
                this.x + this.width > platform.x &&
                this.x < platform.x + platform.width
            ) {
                this.y = platform.y - this.height;
                this.velocity.y = 0;
                this.onGround = true;
            }
        });

        if (this.onGround && this.isJumping()) {
            this.velocity.y = -this.jumpForce;
        }

        if (this.moveLeft) {
            this.x -= this.speed;
        }

        if (this.moveRight) {
            this.x += this.speed;
        }

        // Check for collision with the left edge of the screen
        if (this.x < 0) {
            this.x = 0;
            this.velocity.x = 0;
        }

        enemies.forEach((enemy, index) => {
            if (
                this.y + this.height > enemy.y &&
                this.y < enemy.y + enemy.height &&
                this.x + this.width > enemy.x &&
                this.x < enemy.x + enemy.width
            ) {
                if (this.velocity.y >= 0) {
                    enemies.splice(index, 1);
                    this.velocity.y = -this.jumpForce;
                }
            }
        });
    }

    draw(ctx: CanvasRenderingContext2D, scrollX: number): void {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.x - scrollX, this.y, this.width, this.height);
    }

    isJumping(): boolean {
        return this.spacePressed;
    }
}
