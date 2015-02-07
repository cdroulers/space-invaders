import Size = require("Size");
import Bullet = require("Bullet");
import Inputter = require("Inputter");
import Game = require("Game");
import Point = require("Point");
import IGameEntity = require("IGameEntity");

class Player implements IGameEntity {
    constructor(game: Game) {
        this._game = game;
        this.position = new Point(this._game.size.width / 2, this._game.size.height - this._game.size.height * 0.05);
        this.size = this._game.size.resize(0.025);
        this.size.height = this.size.width;
    }

    public position: Point;

    public size: Size;

    private _game: Game;

    private _canFire: boolean = true;

    public draw(canvas: CanvasRenderingContext2D): void {
        canvas.fillStyle = "#000";
        canvas.fillRect(this.position.x - this.size.width / 2, this.position.y - this.size.height / 2, this.size.width, this.size.height);
    }

    public update(): void {
        var widthRatio = this._game.size.width * 0.005;
        if (this._game.inputter.isDown(Inputter.Key.Left) && this.position.x > this.size.width / 2) {
            this.position.x -= widthRatio;
        }

        if (this._game.inputter.isDown(Inputter.Key.Right) && this.position.x < this._game.size.width - this.size.width / 2) {
            this.position.x += widthRatio;
        }

        if (this._canFire) {
            if (this._game.inputter.isDown(Inputter.Key.Space)) {
                this._game.addEntity(new Bullet(this._game, new Point(this.position.x, this.position.y - this.size.height)));
                this._canFire = false;
                setTimeout(() => this._canFire = true, 500);
            }
        }
    }
}

export = Player;