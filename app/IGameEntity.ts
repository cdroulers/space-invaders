import Size = require("Size");
import Point = require("Point");

interface IGameEntity {
    draw(canvas: CanvasRenderingContext2D): void;

    update(): void;

    position: Point;

    size: Size;
}

export = IGameEntity;