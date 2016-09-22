 
"use strict";

$.Table = function(teamCount) {
	this.maxTeamCount = teamCount;
	this.teamCount = 0;
	this.teams = {};
};

$.Table.prototype.addTeam = function (team) {
	if (this.teamCount < this.maxTeamCount) {
		this.teams[team.id] = {id:team.id, name:team.name, team:team, points:$.util.randomIntInRange(0,9)};
		this.teamCount++;
	}
};

$.Table.prototype.render = function () {
	var table = this.updateTable();

	var buffer = "<ul>";
	/*
	for (var i=0; i < Object.keys(this.teams).length; i++) {
		buffer += "<li style='color: " + $.colors["skyblue"] + ";'>a" + this.teams[i].id + " " + this.teams[i].points + "</li>";
	}
	*/
	table.forEach(function(key) {
		var team = this.teams[key];
		buffer += "<li style='color: " + $.colors["skyblue"] + ";'>"  + " " + team.team.name + " " + team.points + "</li>";
	}, this);

    buffer += "</ul>";
    document.getElementById('table').innerHTML = buffer;


};


$.Table.prototype.getSortedKeys = function(obj) {
    var keys = []; for(var key in obj) keys.push(key);
    return keys.sort(function(a,b){return obj[b].points-obj[a].points});
}

$.Table.prototype.updateTable = function() {
	console.log("---------------------\n" + JSON.stringify(this.teams));

    var keys = this.getSortedKeys(this.teams);

    return keys;
};
