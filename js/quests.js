"use strict";


$.Quests = function() {
    this.list = [];
    this.quests = 0;
};


$.Quests.prototype.addQuest = function (id, text, x, y) {
    this.list.push({id:id, text:text, x:x,y:y,complete:false,fade:100});
    this.quests++;

};
$.Quests.prototype.render = function () {
    var buffer = "<ul>";
    for (var i=0; i<this.quests; i++) {
        if( this.list[i].fade > 0) {
            buffer += "<li style='color: " + $.colors["pink"] + "; opacity:" + this.list[i].fade/100 + ";'>" + this.list[i].text + "</li>";
        }
    }
    buffer += "</ul>";
    document.getElementById('quests').innerHTML = buffer;
    
};

$.Quests.prototype.getAll = function () {
    return this.list;
};


$.Quests.prototype.complete = function (id) {
    for (var i=0; i<this.quests; i++) {
        if(this.list[i].id == id) {
            this.list[i].complete = true;
        }
    }
};

$.Quests.prototype.update = function (id) {
    for (var i=0; i<this.quests; i++) {
        if (this.list[i].complete && this.list[i].fade > 0) {
            this.list[i].fade -= 0.5;
        }
    }
};
