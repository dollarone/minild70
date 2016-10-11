"use strict";

$.Transfer = function() {

	this.transferList = {};
	this.players = 0;

};

$.Transfer.prototype.addPlayer = function(player) {
	this.transferList[player.id] = player;
	this.players++;
};


$.Transfer.prototype.removePlayer = function(id) {
	delete this.transferList[id];
	this.players--;
	this.render();
};


$.Transfer.prototype.generateTransferTable = function () {

    var buffer = "<table><tr style='text-align: right; color: " + $.colors["skyblue"] + ";'>"  + "<td style='text-align: left;'>Name" +
        "</td><td>Age</td><td>Goalkeeping</td><td>Defence</td><td>Midfield</td><td>Attack</td><td>Trait</td><td>Wage</td><td></td></tr>";

    var keys = Object.keys(this.transferList);
    keys.forEach(function(key) {
        var player = this.transferList[key];
        buffer += "<tr style='text-align: right; color: " + $.colors["cloudblue"] + ";'>" ;
        buffer += "<td style='text-align: left;'>" +
            player.name + "</td><td>" + player.age + "</td><td>" + player.keeper + "</td><td>" + player.defence + "</td><td>" + 
            player.midfield + "</td><td>" + player.attack + "</td><td>" + player.trait + "</td><td>" + player.wage + " p/w" + "</td>";
        if ($.season.getMatchdaysPlayed() === 0) {
            buffer += '<td><button onclick="$.transfer.removePlayer(' + player.id + ');$.team8.addPlayerById(' + player.id + ');">Add to team</button></td></tr>';
        }
        else {
        	buffer += "<td /></tr>";
        }
    }, this);

    buffer += "</table>";

    return buffer;
};

$.Transfer.prototype.render = function () {
    document.getElementById('transfer').innerHTML = this.generateTransferTable();  
};