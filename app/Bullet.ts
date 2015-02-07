import Invader = require("Invader");
import Size = require("Size");
import Inputter = require("Inputter");
import Game = require("Game");
import Point = require("Point");
import IGameEntity = require("IGameEntity");

class Bullet implements IGameEntity {
    constructor(game: Game, position: Point, velocity: Point) {
        this._game = game;
        this.position = position;
        this.size = this._game.size.resize(0.005);
        this.size.height = this.size.width;
        this._velocity = velocity;
    }

    public position: Point;

    public size: Size;

    private _game: Game;

    private _velocity: Point;

    public draw(canvas: CanvasRenderingContext2D): void {
        canvas.fillStyle = "red";
        canvas.fillRect(this.position.x - this.size.width / 2, this.position.y - this.size.height / 2, this.size.width, this.size.height);
    }

    public update(): void {
        var widthRatio = this._game.size.height * 0.005 * (this._velocity.x);
        var heightRatio = this._game.size.height * 0.005 * (this._velocity.y);
        this.position.x += widthRatio;
        this.position.y += heightRatio;

        if (this.position.y <= 0 || this.position.y >= this._game.size.height) {
            this._game.removeEntity(this);
        }
    }
}

export = Bullet;