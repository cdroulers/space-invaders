import Inputter = require("Inputter");
import Size = require("Size");
import Point = require("Point");
import Player = require("Player");
import IGameEntity = require("IGameEntity");

class Game {
    constructor(public element: HTMLCanvasElement) {
        element.width = window.innerWidth;
        element.height = window.innerHeight;
        this.size = new Size(element.width, element.height);

        this._entities.push(new Player(this));

        this._drawingContext = this.element.getContext("2d");
    }

    private _drawingContext: CanvasRenderingContext2D;

    public size: Size;

    private _entities: IGameEntity[] = [];

    public inputter: Inputter.Inputter = new Inputter.Inputter();

    public begin(): void {
        this._startTick(() => {
            this.update();
            this.draw();
        });
    }

    public update(): void {
        this._entities.forEach(entity => {
            entity.update();
        });
    }

    public draw(): void {
        this._drawingContext.clearRect(0, 0, this.size.width, this.size.height);

        this._entities.forEach(entity => {
            entity.draw(this._drawingContext);
        });
    }

    public removeEntity(entity: IGameEntity): void {
        var index = this._entities.indexOf(entity);
        if (index >= 0) {
            this._entities.splice(index, 1);
        }
    }

    public addEntity(entity: IGameEntity): void {
        this._entities.push(entity);
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