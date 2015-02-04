import Point = require("Point");

interface IGameEntity {
    position: Point;

    draw(canvas: CanvasRenderingContext2D) : void;
}

export = IGameEntity;