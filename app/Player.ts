import Size = require("Size");
import Bullet = require("Bullet");
import Inputter = require("Inputter");
import Game = require("Game");
import Point = require("Point");
import IGameEntity = require("IGameEntity");

class Player implements IGameEntity {
    constructor(game: Game) {
        this._game = game;
        this._position = new Point(this._game.size.width / 2, this._game.size.height - this._game.size.height * 0.05);
        this._size = this._game.size.resize(0.025);
        this._size.height = this._size.width;
    }

    private _game: Game;

    private _position: Point;

    private _size: Size;

    private _canFire: boolean = true;

    public draw(canvas: CanvasRenderingContext2D): void {
        canvas.fillStyle = "#000";
        canvas.fillRect(this._position.x - this._size.width / 2, this._position.y - this._size.height / 2, this._size.width, this._size.height);
    }

    public update(): void {
        var widthRatio = this._game.size.width * 0.005;
        if (this._game.inputter.isDown(Inputter.Key.Left) && this._position.x > this._size.width / 2) {
            this._position.x -= widthRatio;
        }

        if (this._game.inputter.isDown(Inputter.Key.Right) && this._position.x < this._game.size.width - this._size.width / 2) {
            this._position.x += widthRatio;
        }

        if (this._canFire) {
            if (this._game.inputter.isDown(Inputter.Key.Space)) {
                this._game.addEntity(new Bullet(this._game, new Point(this._position.x, this._position.y - this._size.height)));
                this._canFire = false;
                setTimeout(() => this._canFire = true, 1000);
            }
        }
    }
}

export = Player;