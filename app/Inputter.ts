export class Inputter {
    private _keyState = {};

    constructor() {
        window.onkeydown = (e) => {
            this._keyState[e.keyCode] = true;
        };

        window.onkeyup = (e) => {
            this._keyState[e.keyCode] = false;
        };
    }

    isDown(keyCode: Key) {
        return this._keyState[keyCode] === true;
    }
}

export enum Key {
    Left = 37,
    Right = 39,
}