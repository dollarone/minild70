 "use strict";

$.Npcs = function() {
    this.list = [];
    this.npcs = 0;
    this.color = 'rgba(3, 3, 3, 1)';
    this.dimension = 10;
};

$.Npcs.prototype.addNpc = function (name, x, y) {
    this.list.push({name:name, x:x,y:y});
    this.npcs++;

};
$.Npcs.prototype.render = function () {
    

    for (var i=0; i<this.npcs; i++) {
        if (this.list[i].x > $.map_x && this.list[i].x < $.map_x+40 &&
            this.list[i].y > $.map_y && this.list[i].y < $.map_y+25) {
            $.Draw.rect((this.list[i].x-$.map_x)*20+5, (this.list[i].y-$.map_y)*20+5, this.dimension, this.dimension, this.color);
        }
    }
};

$.Npcs.prototype.overlap = function () {
    

    for (var i=0; i<this.npcs; i++) {
        if (this.list[i].x > $.map_x && this.list[i].x < $.map_x+40 &&
            this.list[i].y > $.map_y && this.list[i].y < $.map_y+25) {
            if (Math.abs($.player.x-15 - (this.list[i].x-$.map_x)*20+5) < 10 &&
                Math.abs($.player.y-15 - (this.list[i].y-$.map_y)*20+5) < 10) {
                return this.list[i].name;
            }
        }
    }
    return "noone";
};


$.Npcs.prototype.update = function () {
    for (var i=0; i<this.npcs; i++) {
        $.map.setData(this.list[i].x, this.list[i].y, $.colors["yellow"]);
    }

};
