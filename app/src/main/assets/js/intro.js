"use strict";


$.Intro = function() {
    this.list = [];
    this.chatlines = 0;
};


$.Intro.prototype.addChat = function (who, text, color) {
    this.list.push({who:who, text:text, color:color, fade:200});
    this.chatlines++;

};
$.Intro.prototype.render = function () {
    var buffer = "";
    var buffer2 = "The year is 2016. \nBy now, football statistics "
        + "are able to objectively analyse and accurately determine which player will win a duel, and "
        + "which team will win a match, solely based on the players in each team. \n\n"
        + "Whereas you might think this has rendered the game boring, infact it has made it much more "
        + "strategic and tactical, due to the statistics being available to all players and teams. \n\n"
        + "Enter the world of Statsball, and gather a team of players who can and will beat any opponent!";



    for (var i=0; i<this.chatlines; i++) {
        if( this.list[i].fade > 0) {
            buffer += "<div style='color: " + this.list[i].color + "; opacity:" + Math.min(this.list[i].fade, 100)/100 + ";'>" +
             this.list[i].text + "</div><br />";
        }
    }
    buffer += "";
    document.getElementById('chat').innerHTML = buffer;
    
};

$.Intro.prototype.update = function (id) {
    for (var i=0; i<this.chatlines; i++) {
        if (this.list[i].fade > 0) {
            this.list[i].fade -= 0.5;
        }
    }
};
