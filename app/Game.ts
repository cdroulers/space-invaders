import Invader = require("Invader");
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

        this._player = new Player(this);
        this.entities.push(this._player);

        for (var i = 0; i < 24; i++) {
            var size = this.size.width * 0.075;
            this.entities.push(new Invader(this, new Point(size / 2 + size * (i % 8), size / 2 + size * (i % 3))));
        }

        this._drawingContext = this.element.getContext("2d");
    }

    private _drawingContext: CanvasRenderingContext2D;

    public size: Size;

    public entities: IGameEntity[] = [];

    private _player: Player;

    public inputter: Inputter.Inputter = new Inputter.Inputter();

    public begin(): void {
        this._startTick(() => {
            this.update();
            this.draw();
        });
    }

    public update(): void {
        this.entities.forEach(e1 => {
            this.entities.forEach(e2 => {
                if (e1 !== e2 && this._isColliding(e1, e2)) {
                    this.removeEntity(e1);
                    this.removeEntity(e2);
                }
            });
        });

        this.entities.forEach(entity => {
            entity.update();
        });
    }

    public draw(): void {
        if (this.entities.indexOf(this._player) < 0) {
            this._drawingContext.font = "bold 4em Arial";
            this._drawingContext.fillText("YOU LOST", this.size.width / 2, this.size.height / 2);
            return;
        }

        this._drawingContext.clearRect(0, 0, this.size.width, this.size.height);

        this.entities.forEach(entity => {
            entity.draw(this._drawingContext);
        });
    }

    public removeEntity(entity: IGameEntity): void {
        var index = this.entities.indexOf(entity);
        if (index >= 0) {
            this.entities.splice(index, 1);
        }
    }

    public addEntity(entity: IGameEntity): void {
        this.entities.push(entity);
    }

    private _startTick(fn) {
        var tick = () => {
            fn();
            requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    }

    private _isColliding(e1: IGameEntity, e2: IGameEntity): boolean {
        return !(e1.position.x > e2.position.x + e1.size.width ||
            e1.position.y > e2.position.y + e2.size.width ||
            e1.position.x + e1.size.width < e2.position.x ||
            e1.position.y + e1.size.height < e2.position.y);
    }
}

export = Game;