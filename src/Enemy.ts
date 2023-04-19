export class Enemy {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    minX: number;
    maxX: number;
    direction: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.speed = 0.15;
        this.minX = x - 100;
        this.maxX = x + 100;
        this.direction = 1;
    }

    update(deltaTime: number): void {
        // Update enemy's position based on direction and speed
        this.x += this.direction * this.speed * deltaTime;

        // If the enemy reaches the minX or maxX boundary, change direction
        if (this.x < this.minX || this.x > this.maxX) {
            this.direction *= -1;
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
