"use strict";


$.Event = function() {
    this.list = [];
    this.events = 0;
    this.id = 0;
};


$.Event.prototype.addEvent = function (hometeam, hometeamgoals, awayteam, awayteamgoals, time, text) {
    this.list.push({id:this.id++, hometeam:hometeam, hometeamgoals:hometeamgoals, awayteam:awayteam, awayteamgoals:awayteamgoals, time:time, text:text, fade:2});
    this.events++;

};
$.Event.prototype.render = function () {
    var buffer = "";
    for (var i=0; i<this.events; i++) {
        if( this.list[i].fade > 0) {
            buffer += "<p style='color: " + $.colors["skyblue"] + "; opacity:" + this.list[i].fade/100 + ";'>" + this.list[i].text + "</p>";
            //buffer += "</p>";
            document.getElementById('matchTime').innerHTML = this.list[i].time + " mins";
            document.getElementById('matchTeams').innerHTML = "<h2>" + this.list[i].hometeam + " - " + this.list[i].awayteam + "</h2>";
            document.getElementById('matchScore').innerHTML = this.list[i].hometeamgoals + " - " + this.list[i].awayteamgoals;

            document.getElementById('events').innerHTML = buffer;


            if (this.list[i].text === "The ref blows his whistle for full time." && this.list[i].fade === 2) {
                $.season.finishMatchday();

            }
            
            this.list[i].fade -= 3;

            return;
        }
    }
    
};

$.Event.prototype.getAll = function () {
    return this.list;
};



$.Event.prototype.update = function () {
    for (var i=0; i<this.events; i++) {
        if (this.list[i].fade > 0) {
            
        }
    }
};
