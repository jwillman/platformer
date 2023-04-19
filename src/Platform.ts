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

    draw(ctx: CanvasRenderingContext2D, scrollX: number): void {
        ctx.fillStyle = "green";
        ctx.fillRect(this.x - scrollX, this.y, this.width, this.height);
    }
}
