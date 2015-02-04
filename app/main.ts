import Game = require("Game");

var el: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('game');
var game = new Game(el);
game.begin();