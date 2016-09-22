"use strict";


$.Event = function() {
    this.list = [];
    this.events = 0;
    this.id = 0;
};


$.Event.prototype.addEvent = function (text) {
    this.list.push({id:this.id++, text:text, fade:150});
    this.events++;

};
$.Event.prototype.render = function () {
    var buffer = "<ul>";
    for (var i=0; i<this.Event; i++) {
        if( this.list[i].fade > 0) {
            buffer += "<li style='color: " + $.colors["seablue"] + "; opacity:" + this.list[i].fade/100 + ";'>" + this.list[i].text + "</li>";
        }
    }
    buffer += "</ul>";
    document.getElementById('events').innerHTML = buffer;
    
};

$.Event.prototype.getAll = function () {
    return this.list;
};



$.Event.prototype.update = function (id) {
    for (var i=0; i<this.events; i++) {
        if (this.list[i].fade > 0) {
            this.list[i].fade -= 0.5;
        }
    }
};
