export class Platform {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;

    constructor(
        x: number,
        y: number,
        width: number,
        height: number,
        color: string = "green"
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
