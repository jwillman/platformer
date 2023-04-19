export class Background {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    color: string;

    constructor(
        x: number = 0,
        y: number = 0,
        width: number = 800,
        height: number = 480,
        color: string = "skyblue",
        speed: number = 0.5
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = speed;
    }

    update(playerVelocityX: number): void {
        this.x -= playerVelocityX * this.speed;
        if (this.x <= -this.width) {
            this.x = 0;
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillRect(this.x + this.width, this.y, this.width, this.height);
    }
}
