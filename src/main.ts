import { Game } from "./Game";

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const game = new Game(canvas);

canvas.addEventListener("click", () => {
    if (game.isGameOver) {
        game.restart();
    }
});

game.start();
