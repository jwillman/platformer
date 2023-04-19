import PNGbackground from "../img/clouds.png";

export class Background {
    private readonly backgroundImage: HTMLImageElement;

    constructor() {
        this.backgroundImage = new Image();
        this.backgroundImage.src = PNGbackground;
    }

    draw(ctx: CanvasRenderingContext2D, scrollX: number): void {
        const canvasWidth = ctx.canvas.width;
        const canvasHeight = ctx.canvas.height;

        const backgroundWidth = this.backgroundImage.width;
        const backgroundHeight = this.backgroundImage.height;

        const scrollFactor = 0.5; // Change this value to control the parallax effect

        // Calculate the background's X position based on the scrollX value and the scroll factor
        const backgroundX = (-scrollX * scrollFactor) % backgroundWidth;

        // Draw the background image
        ctx.drawImage(
            this.backgroundImage,
            backgroundX,
            0,
            backgroundWidth,
            backgroundHeight
        );

        // If the background image doesn't fully cover the canvas width, draw another copy to fill the remaining area
        if (backgroundX + backgroundWidth < canvasWidth) {
            ctx.drawImage(
                this.backgroundImage,
                backgroundX + backgroundWidth,
                0,
                backgroundWidth,
                backgroundHeight
            );
        }
    }
}
