import Point = require("Point");

interface IGameEntity {
    draw(canvas: CanvasRenderingContext2D): void;

    update(): void;
}

export = IGameEntity;