 
"use strict";

$.Table = function(teamCount) {
	this.maxTeamCount = teamCount;
	this.teamCount = 0;
	this.teams = {};
};

$.Table.prototype.addTeam = function (team) {
	if (this.teamCount < this.maxTeamCount) {
		this.teams[team.id] = {id:team.id, name:team.name, team:team, goalsDiff:0, goalsFor:0, goalsAgainst:0, points:0};
		this.teamCount++;
	}
};

$.Table.prototype.render = function () {
	var table = this.updateTable();

	var buffer = "<ul>";
	table.forEach(function(key) {
		var team = this.teams[key];
		buffer += "<li style='color: " + $.colors["skyblue"] + ";'>"  + " " + team.team.name + 
		" " + team.goalsFor + " " + team.goalsAgainst + " " + team.goalsDiff + " =X=  " + team.points + "</li>";
	}, this);

    buffer += "</ul>";
    document.getElementById('table').innerHTML = buffer;


};


$.Table.prototype.getSortedKeys = function(obj, what) {
    var keys = []; for(var key in obj) keys.push(key);
    return keys.sort(function(a,b) {
    	if (obj[b].points-obj[a].points === 0) {
    		if (obj[b].goalsDiff-obj[a].goalsDiff === 0) {
    			return obj[b].goalsFor-obj[a].goalsFor;
    		}
    		else {
    			return obj[b].goalsDiff-obj[a].goalsDiff;
    		}
    	}
    	else {
	    	return obj[b].points-obj[a].points;
	    }
    });
}

$.Table.prototype.updateTable = function() {
    var keys = this.getSortedKeys(this.teams);
    
    return keys;
};
