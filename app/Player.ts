import Inputter = require("Inputter");
import Game = require("Game");
import Point = require("Point");
import IGameEntity = require("IGameEntity");

class Player implements IGameEntity {
    constructor(game: Game, position: Point) {
        this._game = game;
        this._position = position;
    }

    private _game: Game;

    private _position: Point;

    public draw(canvas: CanvasRenderingContext2D): void {
        canvas.fillStyle = "#000";
        canvas.fillRect(this._position.x, this._position.y, 15, 15);
    }

    public update(): void {
        if (this._game.inputter.isDown(Inputter.Key.Left)) {
            this._position.x--;
        }
        if (this._game.inputter.isDown(Inputter.Key.Right)) {
            this._position.x++;
        }
    }
}

export = Player;