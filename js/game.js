"use strict";

var $ = {};

$.width = 800;
$.height = 500;

$.colors = {
    black: 'rgba(0, 0, 0, 1)',
    gray: 'rgba(157, 157, 157, 1)',
    white: 'rgba(255, 255, 255, 1)',
    red: 'rgba(190, 38, 51, 1)',
    pink: 'rgba(295, 99, 247, 1)',
    purple: 'rgba(91, 0, 110, 1)',
    darkbrown: 'rgba(73, 60, 43, 1)',
    brown: 'rgba(164, 100, 34, 1)',
    yellow: 'rgba(247, 226, 107, 1)',
    darkgreen: 'rgba(47, 72, 78, 1)',
    green: 'rgba(88, 167, 46, 1)',
    slimegreen: 'rgba(163, 206, 39, 1)',
    nightblue: 'rgba(27, 38, 50, 1)',
    seablue: 'rgba(0, 87, 132, 1)',
    skyblue: 'rgba(49, 162, 242, 1)',
    cloudblue: 'rgba(178, 220, 239, 1)',

};

$.red = 'rgba(190, 38, 51, 1)';
$.black = 'rgba(0, 0, 0, 1)';
$.gray ='rgba(157, 157, 157, 1)';

$.timer = 0;

$.timeout = 100;

$.entities = [];

$.stop = false;
$.current_player = 0;

var dt = 0;
var controls = { left: false, right: false, jump: false };

$.init = function () {
    $.canvas = document.getElementsByTagName('canvas')[0];
    $.canvas.width = $.width;
    $.canvas.height = $.height;
    $.ctx = $.canvas.getContext('2d');

    $.players = [];
    
    $.generateRandomObjects();
    $.map_x = 80;
    $.map_y = 50;
    $.loop();
};

$.loop = function () {
    $.render();
    $.update();

    window.requestAnimFrame($.loop);
};

$.update = function () {
    if ($.stop) return;

    $.timer++;
    if ($.timeout > 0) {
        $.timeout--;
    }
    else {
        if (controls.left) {
            if ($.current_player != 0) {
                $.current_player--;
                $.team.removePlayer($.players[$.current_player]);
                $.timeout = 50;
            }
        }
        else if (controls.right) {
            if ($.current_player < $.players.length) {
                $.team.addPlayer($.players[$.current_player]);
                $.current_player++;
                $.timeout = 50;
            }
        }
    }
};

$.render = function () {
    $.Draw.clear();

    for (var i=0; i<6; i++) {
        $.players[i].render(30, 50 + 30* i);
    }

    $.team.render(5, 300);
};


$.generateRandomObjects = function () {
    $.entities = [];
    $.team  = new $.Team();

    $.map = new $.Map(202,127, $.colors);

    if (0 === $.util.randomIntInRange(0,6)) {
        $.players.push(new $.Player(true, true));
        $.players.push(new $.Player(false, false));
    }
    else {
        $.players.push(new $.Player(true, false));
        $.players.push(new $.Player(false, true));
    }
    for (var i=0; i<4; i++) {
        
        $.players.push(new $.Player(false, false));
    }
    
    
};

window.addEventListener('load', $.init, false);

window.addEventListener('keydown', function(ev) { return onkey(ev, ev.keyCode, true);  }, true);
window.addEventListener('keyup',   function(ev) { return onkey(ev, ev.keyCode, false); }, false);

function onkey(ev, key, down) {
    var KEY = { SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, X: 88 };

  switch(key) {
    case KEY.LEFT:  controls.left  = down; return false;
    case KEY.RIGHT: controls.right = down;  return false;
    case KEY.UP: controls.up  = down; return false;
    case KEY.DOWN: controls.down  = down; return false;
    case KEY.SPACE: controls.space = down; return false;
    case KEY.X: controls.x = down; return false;
  }
}