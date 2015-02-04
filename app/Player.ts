import Point = require("Point");
import IGameEntity = require("IGameEntity");

class Player implements IGameEntity {
    constructor(position: Point) {
        this.position = position;
    }

    position: Point;

    public draw(canvas: CanvasRenderingContext2D): void {
        canvas.fillStyle = "#000";
        canvas.fillRect(this.position.x, this.position.y, 15, 15);
    }
}

export = Player;