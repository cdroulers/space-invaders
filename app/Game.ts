import Inputter = require("Inputter");
import Size = require("Size");
import Point = require("Point");
import Player = require("Player");
import IGameEntity = require("IGameEntity");

class Game {
    constructor(public element: HTMLCanvasElement) {
        this._size = new Size(element.width, element.height);

        this._entities.push(new Player(this, new Point(this._size.width / 2, this._size.height - 25)));

        this._drawingContext = this.element.getContext("2d");
    }

    private _drawingContext: CanvasRenderingContext2D;

    private _size: Size;

    private _entities: IGameEntity[] = [];

    public inputter: Inputter.Inputter = new Inputter.Inputter();

    public begin(): void {
        this._startTick(() => {
            this.update();
            this.draw();
        });
    }

    public update() {
        this._entities.forEach(entity => {
            entity.update();
        });
    }

    public draw() {
        this._drawingContext.clearRect(0, 0, this._size.width, this._size.height);

        this._entities.forEach(entity => {
            entity.draw(this._drawingContext);
        });
    }

    private _startTick(fn) {
        var tick = () => {
            fn();
            requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    }
}

export = Game;