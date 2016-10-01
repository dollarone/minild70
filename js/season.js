"use strict";

$.Season = function(teamCount) {
	this.maxTeamCount = teamCount;
	this.teamCount = 0;
	this.teams = {};
	this.matchDayCount = ((teamCount-1)*2)
	this.matchDay = new Array(this.matchDayCount);
	this.matchDaysPlayed = 0;
	this.inspectingTeam = 0;
};

$.Season.prototype.addTeam = function (team) {
	if (this.teamCount < this.maxTeamCount) {
		this.teams[team.id] = team;
		this.teamCount++;
	}
};


$.Season.prototype.generateMatches = function() {
	for (var i=0; i<this.matchDayCount; i++) {
		this.matchDay[i] = [];
	}
	if (this.teamCount === 4) {
		this.matchDay[0].push(new $.Match(this.teams[0], this.teams[1], false));
		this.matchDay[0].push(new $.Match(this.teams[2], this.teams[3], false));
		this.matchDay[1].push(new $.Match(this.teams[1], this.teams[2], false));
		this.matchDay[1].push(new $.Match(this.teams[3], this.teams[0], false));
		this.matchDay[2].push(new $.Match(this.teams[0], this.teams[2], false));
		this.matchDay[2].push(new $.Match(this.teams[1], this.teams[3], false));

		this.matchDay[3].push(new $.Match(this.teams[1], this.teams[0], false));
		this.matchDay[3].push(new $.Match(this.teams[3], this.teams[2], false));
		this.matchDay[4].push(new $.Match(this.teams[2], this.teams[1], false));
		this.matchDay[4].push(new $.Match(this.teams[0], this.teams[3], false));
		this.matchDay[5].push(new $.Match(this.teams[2], this.teams[0], false));
		this.matchDay[5].push(new $.Match(this.teams[3], this.teams[1], false));
	}
	else if (this.teamCount === 6) {
		this.matchDay[0].push(new $.Match(this.teams[0], this.teams[1], false));
		this.matchDay[0].push(new $.Match(this.teams[2], this.teams[3], false));
		this.matchDay[0].push(new $.Match(this.teams[4], this.teams[5], false));
		this.matchDay[1].push(new $.Match(this.teams[1], this.teams[2], false));
		this.matchDay[1].push(new $.Match(this.teams[3], this.teams[4], false));
		this.matchDay[1].push(new $.Match(this.teams[5], this.teams[0], false));
		this.matchDay[2].push(new $.Match(this.teams[0], this.teams[2], false));
		this.matchDay[2].push(new $.Match(this.teams[3], this.teams[5], false));
		this.matchDay[2].push(new $.Match(this.teams[4], this.teams[1], false));
		this.matchDay[3].push(new $.Match(this.teams[1], this.teams[3], false));
		this.matchDay[3].push(new $.Match(this.teams[4], this.teams[0], false));
		this.matchDay[3].push(new $.Match(this.teams[5], this.teams[2], false));
		this.matchDay[4].push(new $.Match(this.teams[0], this.teams[3], false));
		this.matchDay[4].push(new $.Match(this.teams[1], this.teams[5], false));
		this.matchDay[4].push(new $.Match(this.teams[2], this.teams[4], false));

		this.matchDay[5].push(new $.Match(this.teams[1], this.teams[0], false));
		this.matchDay[5].push(new $.Match(this.teams[3], this.teams[2], false));
		this.matchDay[5].push(new $.Match(this.teams[5], this.teams[4], false));
		this.matchDay[6].push(new $.Match(this.teams[2], this.teams[1], false));
		this.matchDay[6].push(new $.Match(this.teams[4], this.teams[3], false));
		this.matchDay[6].push(new $.Match(this.teams[0], this.teams[5], false));
		this.matchDay[7].push(new $.Match(this.teams[2], this.teams[0], false));
		this.matchDay[7].push(new $.Match(this.teams[5], this.teams[3], false));
		this.matchDay[7].push(new $.Match(this.teams[1], this.teams[4], false));
		this.matchDay[8].push(new $.Match(this.teams[3], this.teams[1], false));
		this.matchDay[8].push(new $.Match(this.teams[0], this.teams[4], false));
		this.matchDay[8].push(new $.Match(this.teams[2], this.teams[5], false));
		this.matchDay[9].push(new $.Match(this.teams[3], this.teams[0], false));
		this.matchDay[9].push(new $.Match(this.teams[5], this.teams[1], false));
		this.matchDay[9].push(new $.Match(this.teams[4], this.teams[2], false));
	}
	else if (this.teamCount === 8) {
		this.matchDay[0].push(new $.Match(this.teams[0], this.teams[1], false));
		this.matchDay[0].push(new $.Match(this.teams[2], this.teams[3], false));
		this.matchDay[0].push(new $.Match(this.teams[4], this.teams[5], false));
		this.matchDay[0].push(new $.Match(this.teams[6], this.teams[7], false));
		this.matchDay[1].push(new $.Match(this.teams[1], this.teams[2], false));
		this.matchDay[1].push(new $.Match(this.teams[3], this.teams[4], false));
		this.matchDay[1].push(new $.Match(this.teams[5], this.teams[6], false));
		this.matchDay[1].push(new $.Match(this.teams[7], this.teams[0], false));
		this.matchDay[2].push(new $.Match(this.teams[0], this.teams[2], false));
		this.matchDay[2].push(new $.Match(this.teams[1], this.teams[3], false));
		this.matchDay[2].push(new $.Match(this.teams[4], this.teams[6], false));
		this.matchDay[2].push(new $.Match(this.teams[5], this.teams[7], false));
		this.matchDay[3].push(new $.Match(this.teams[2], this.teams[4], false));
		this.matchDay[3].push(new $.Match(this.teams[3], this.teams[5], false));
		this.matchDay[3].push(new $.Match(this.teams[6], this.teams[0], false));
		this.matchDay[3].push(new $.Match(this.teams[7], this.teams[1], false));
		this.matchDay[4].push(new $.Match(this.teams[0], this.teams[3], false));
		this.matchDay[4].push(new $.Match(this.teams[2], this.teams[5], false));
		this.matchDay[4].push(new $.Match(this.teams[4], this.teams[7], false));
		this.matchDay[4].push(new $.Match(this.teams[6], this.teams[1], false));
		this.matchDay[5].push(new $.Match(this.teams[3], this.teams[6], false));
		this.matchDay[5].push(new $.Match(this.teams[5], this.teams[0], false));
		this.matchDay[5].push(new $.Match(this.teams[7], this.teams[2], false));
		this.matchDay[5].push(new $.Match(this.teams[1], this.teams[4], false));
		this.matchDay[6].push(new $.Match(this.teams[0], this.teams[4], false));
		this.matchDay[6].push(new $.Match(this.teams[2], this.teams[6], false));
		this.matchDay[6].push(new $.Match(this.teams[5], this.teams[1], false));
		this.matchDay[6].push(new $.Match(this.teams[7], this.teams[3], false));

		this.matchDay[7].push(new $.Match(this.teams[1], this.teams[0], false));
		this.matchDay[7].push(new $.Match(this.teams[3], this.teams[2], false));
		this.matchDay[7].push(new $.Match(this.teams[5], this.teams[4], false));
		this.matchDay[7].push(new $.Match(this.teams[7], this.teams[6], false));
		this.matchDay[8].push(new $.Match(this.teams[2], this.teams[1], false));
		this.matchDay[8].push(new $.Match(this.teams[4], this.teams[3], false));
		this.matchDay[8].push(new $.Match(this.teams[6], this.teams[5], false));
		this.matchDay[8].push(new $.Match(this.teams[0], this.teams[7], false));
		this.matchDay[9].push(new $.Match(this.teams[2], this.teams[0], false));
		this.matchDay[9].push(new $.Match(this.teams[3], this.teams[1], false));
		this.matchDay[9].push(new $.Match(this.teams[6], this.teams[4], false));
		this.matchDay[9].push(new $.Match(this.teams[7], this.teams[5], false));
		this.matchDay[10].push(new $.Match(this.teams[4], this.teams[2], false));
		this.matchDay[10].push(new $.Match(this.teams[5], this.teams[3], false));
		this.matchDay[10].push(new $.Match(this.teams[0], this.teams[6], false));
		this.matchDay[10].push(new $.Match(this.teams[1], this.teams[7], false));
		this.matchDay[11].push(new $.Match(this.teams[3], this.teams[0], false));
		this.matchDay[11].push(new $.Match(this.teams[5], this.teams[2], false));
		this.matchDay[11].push(new $.Match(this.teams[7], this.teams[4], false));
		this.matchDay[11].push(new $.Match(this.teams[1], this.teams[6], false));
		this.matchDay[12].push(new $.Match(this.teams[6], this.teams[3], false));
		this.matchDay[12].push(new $.Match(this.teams[0], this.teams[5], false));
		this.matchDay[12].push(new $.Match(this.teams[2], this.teams[7], false));
		this.matchDay[12].push(new $.Match(this.teams[4], this.teams[1], false));
		this.matchDay[13].push(new $.Match(this.teams[4], this.teams[0], false));
		this.matchDay[13].push(new $.Match(this.teams[6], this.teams[2], false));
		this.matchDay[13].push(new $.Match(this.teams[1], this.teams[5], false));
		this.matchDay[13].push(new $.Match(this.teams[3], this.teams[7], false));

	}
};


$.Season.prototype.simSeason = function() {
	for (var i=0; i<this.matchDayCount; i++) {
		this.simMatchDay(i);
	}
};


$.Season.prototype.simNextMatchday = function() {
	this.simMatchDay(this.matchDaysPlayed);
};

$.Season.prototype.simMatchDay = function(day) {
	for (var i=0; i<this.matchDay[day].length; i++) {
		console.log("sim matchday " + day + ": " + this.matchDay[day][i].homeTeam.name + "-" + this.matchDay[day][i].awayTeam.name );	
		this.matchDay[day][i].fastSim();
		console.log("post sim matchday " + day + ": " + this.matchDay[day][i].homeTeamGoals + "-" + this.matchDay[day][i].awayTeamGoals);	
	}
	this.matchDaysPlayed++;
	this.updateTable();
	this.renderTable();
};

$.Season.prototype.update = function() {

};

$.Season.prototype.rendder = function() {
	console.log("matchday " + 0 + ": " + this.matchDay[0][0].homeTeam.name + "-" + this.matchDay[0][0].awayTeam.name );

};
$.Season.prototype.render = function() {
	for(var i=0; i<(this.teamCount-1)*2; i++) {
		for(var j=0; j<(this.teamCount/2); j++) {
		//	console.log("matchday " + i + ":" + this.matchDay[i][j].homeTeam.name + "-" + this.matchDay[i][j].awayTeam.name);
//			console.log("matchday " + i + ":\n" + this.matchDay[i]);
		}
	}
	this.renderTable();
};

$.Season.prototype.getTeam = function(id) {
	for(var i=0; i<this.teamCount; i++) {
		if (id === this.teams[i].id) {
			return this.teams[i];
		}
	}
	return;
};

$.Season.prototype.inspectTeam = function(id) {
	this.inspectingTeam = id;
	this.renderTable();
};



$.Season.prototype.inspectPlayerForm = function (player) {

    return '<form id="pos_' + player.id + '" onSubmit="return false;">' +
        '<input id="select_' + player.id + '" onchange="$.season.inspectTeam(' + team.id + ');">' +
    '<option ' + isSub + ' position="Substitute">Substitute</option>' +
    '<option ' + isGoalkeeper + ' position="Goalkeeper">Goalkeeper</option>' +
    '<option ' + isDefender + ' position="Defender">Defender</option>' +
    '<option ' + isMidfielder + ' position="Midfielder">Midfielder</option>' +
    '<option ' + isStriker + ' position="Striker">Striker</option>' +
    '</select>';
/*
    </form><script>function onChange(select, form) {' +
    'var pos = select.options[select.selectedIndex].getAttribute("lon");' +
    'form.elements["position"].value = pos;' +
    'this.setDefender(player); this.render(); };</script>';
*/
};

$.Season.prototype.renderTable = function () {
    if (this.inspectingTeam > 0) {
        var buffer = this.getTeam(this.inspectingTeam).generateTeamTable();

//        buffer =+ "Back to table link";    in table button or both
        document.getElementById('table').innerHTML = buffer;
        return;
    }
	var table = this.updateTable();

	var buffer = "<h2>Table";
	if (this.matchDaysPlayed != 0) {
		buffer += " after matchday " + this.matchDaysPlayed;
	}
	else {
		buffer += " before matchday 1";
	}
	buffer += "</h2><table>";
	table.forEach(function(key) {
		var team = this.teams[key];
		buffer += "<tr style='text-align: right; color: " + $.colors["skyblue"] + ";'>"  + "<td style='text-align: left;'>";

//	buffer += '<form id="pos_' + team.id + '" onSubmit="return false;">';
		
        buffer += '<a href="#" onclick="$.season.inspectTeam(' + team.id + ');">' + team.name + '</a>';

		buffer += "</td><td>" + this.matchDaysPlayed + 
		"</td><td>" + team.wins + "</td><td>" + team.draws + "</td><td>" + team.losses + "</td><td>" + 
		team.goalsFor + "</td><td>" + team.goalsAgainst + "</td><td>" + team.goalsDiff + "</td><td>" + team.points + "</td></tr>";
	}, this);

    buffer += "</table>";
    document.getElementById('table').innerHTML = buffer;
};

$.Season.prototype.getSortedKeys = function(obj, what) {
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

$.Season.prototype.updateTable = function() {
    var keys = this.getSortedKeys(this.teams);
    
    return keys;
};
