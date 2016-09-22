"use strict";

var $ = {};

$.width = 800;
$.height = 500;

$.teamNames = {
    0: "London FC", 
    1:"Rubberballs FC", 
    2:"Bargelona FC", 
    3:"Sadboys United"
};

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

    $.renderMatches = false;
    $.loop();
};

$.loop = function () {
    $.render();
    $.update();

    window.requestAnimFrame($.loop);
};


$.generateRandomObjects = function () {
    $.entities = [];
    $.team1 = $.generateRandomTeam();
    $.team2 = $.generateRandomTeam();
    $.team3 = $.generateRandomTeam();
    $.team4 = $.generateRandomTeam();
    
    $.events = new $.Event();
    $.events.addEvent("test");
    $.match = new $.Match($.team1, $.team2, false);

    $.table = new $.Table(4);
    $.table.addTeam($.team1);
    $.table.addTeam($.team2);
    $.table.addTeam($.team3);
    $.table.addTeam($.team4);
    $.table.updateTable();
};

$.generateRandomTeam = function() {

    var team = new $.Team();

    if (0 === $.util.randomIntInRange(0,6)) {
        $.players.push(new $.Player(true, true));
        $.players.push(new $.Player(false, false));
        team.addPlayer($.players[$.current_player]);
        team.setKeeper($.players[$.current_player++]);

        team.addPlayer($.players[$.current_player]);
        team.setDefender($.players[$.current_player++]);
    }
    else {
        $.players.push(new $.Player(true, false));
        $.players.push(new $.Player(false, true));
        team.addPlayer($.players[$.current_player]);
        team.setKeeper($.players[$.current_player++]);

        team.addPlayer($.players[$.current_player]);
        team.setDefender($.players[$.current_player++]);
    }
    for (var i=0; i<3; i++) {
        
        $.players.push(new $.Player(false, false));
    }
    team.addPlayer($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    team.addPlayer($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    team.addPlayer($.players[$.current_player]);
    team.setStriker($.players[$.current_player++]);

    return team;
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
                $.team1.removePlayer($.players[$.current_player]);
                $.timeout = 50;
            }
        }
        else if (controls.right) {
            if ($.current_player < $.players.length) {
                $.team1.addPlayer($.players[$.current_player]);
                $.current_player++;
                $.timeout = 50;
            }
        }
        else if (controls.up) {
            if ($.current_player < $.players.length) {
                $.team1.unsetPlayer($.players[$.current_player-1]);
                $.team1.setMidfielder($.players[$.current_player-1]);
                $.timeout = 50;
            }
        }
    }
    if ($.renderMatches) {
        $.match.update($.timer);
    }
    else {
        $.match.fastSim();
    }

    $.events.update();
};

$.render = function () {
    $.Draw.clear();

    for (var i=0; i<$.players.length; i++) {
  //      $.players[i].render(30, 50 + 30* i);
    }
    if ($.renderMatches) {
        $.team1.render(5, 450);
        $.team2.render(5, 500);
        $.match.render(5, 370);
        $.events.render();
    }
    else {
        $.team1.render(5, 450);
        $.team2.render(5, 500);
        $.team3.render(5, 150);
        $.team4.render(5, 200);
        $.match.render(5, 370);        
        $.table.render();
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