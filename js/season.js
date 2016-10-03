"use strict";

$.Season = function(teamCount) {
	this.maxTeamCount = teamCount;
	this.teamCount = 0;
	this.teams = {};
	this.matchDayCount = ((teamCount-1)*2)
	this.matchDay = new Array(this.matchDayCount);
	this.matchDaysPlayed = 0;
	this.inspectingTeam = -1;
	this.speed = 1;
	this.matchDaysFinished = 0;
};

$.Season.prototype.finishMatchday = function() {
	this.matchDaysFinished = this.matchDaysPlayed;
	$.renderAll();	
};

$.Season.prototype.getMatchdaysPlayed = function() {
	return this.matchDaysPlayed;
};

$.Season.prototype.setSpeed = function(speed) {
	this.speed = parseInt(speed);
};

$.Season.prototype.getSpeed = function() {
	return this.speed;
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
	if (this.matchDaysPlayed < this.matchDayCount) {
		for (var i=this.matchDaysPlayed; i<this.matchDayCount; i++) {
			this.simMatchDay(i);
		}
		this.finishMatchday();
	}
};


$.Season.prototype.simNextMatchday = function() {
	if (this.matchDaysFinished === this.matchDaysPlayed) {		
		if (this.matchDaysPlayed < this.matchDayCount) {
			this.simMatchDay(this.matchDaysPlayed);
		}
	}
};

$.Season.prototype.simMatchDay = function(day) {
	if ($.team8.getFreekickTaker() == null) {
		$.team8.assignDefaultFreekickTaker();
	}

	for (var i=0; i<this.matchDay[day].length; i++) {
	//	console.log("sim matchday " + day + ": " + this.matchDay[day][i].homeTeam.name + "-" + this.matchDay[day][i].awayTeam.name );	
		this.matchDay[day][i].fastSim();
	//	console.log("post sim matchday " + day + ": " + this.matchDay[day][i].homeTeamGoals + "-" + this.matchDay[day][i].awayTeamGoals);	
	}
	this.matchDaysPlayed++;
	if (this.speed === 2) {
		this.finishMatchday();
	}
	else {
		$.renderAll();
	}

};

$.Season.prototype.resetMatchdayData = function() {
		document.getElementById('matchTeams').innerHTML = "";
		document.getElementById('matchScore').innerHTML = "";
		document.getElementById('events').innerHTML = "";
		document.getElementById('matchTime').innerHTML = "";
		document.getElementById('nextMatch').innerHTML = "";
};

$.Season.prototype.getNextMatchDay = function() {
	if (parseInt(this.speed) === 3) {
		var buffer = "";
		for (var days=0; days<this.matchDayCount; days++) {
			buffer += "<h2>Matchday " + days + "</h2>";
			for (var i=0; i<this.matchDay[days].length; i++) {
				buffer += "<br />" + this.matchDay[days][i].homeTeam.name + " - " + this.matchDay[days][i].awayTeam.name;
				if (days < this.matchDaysFinished) {
					buffer += " " + this.matchDay[days][i].homeTeamGoals + " - " + this.matchDay[days][i].awayTeamGoals;
				}
			}
			buffer += "<br /><br />";
		//this.matchDay[day][i].fastSim();
	//	console.log("post sim matchday " + day + ": " + this.matchDay[day][i].homeTeamGoals + "-" + this.matchDay[day][i].awayTeamGoals);	
		}
		document.getElementById('nextMatches').innerHTML = buffer;
		document.getElementById('matchDay').innerHTML = "";
		document.getElementById('prevMatches').innerHTML = "";
		document.getElementById('prevMatchDay').innerHTML = "";
	}
	else if (this.matchDaysFinished > this.matchDaysPlayed-1 ) {
		if (this.matchDaysPlayed < this.matchDayCount) {
			var buffer = "";
			for (var i=0; i<this.matchDay[this.matchDaysPlayed].length; i++) {
				buffer += this.matchDay[this.matchDaysPlayed][i].homeTeam.name + " - " + this.matchDay[this.matchDaysPlayed][i].awayTeam.name + "<br />";
			//this.matchDay[day][i].fastSim();
		//	console.log("post sim matchday " + day + ": " + this.matchDay[day][i].homeTeamGoals + "-" + this.matchDay[day][i].awayTeamGoals);	
			}
			document.getElementById('nextMatches').innerHTML = buffer;
			document.getElementById('matchDay').innerHTML = "<h2>Matchday " + parseInt(this.matchDaysPlayed+1) + "</h2>";
		}
		else {
			document.getElementById('nextMatches').innerHTML = "";
			document.getElementById('matchDay').innerHTML = "";
		}
		this.getPrevMatchDayResults();

	}

};

$.Season.prototype.getPrevMatchDayResults = function(day) {
	if (this.matchDaysFinished > 0 && this.matchDaysPlayed-1 < this.matchDayCount) {
		var buffer = "";
		for (var i=0; i<this.matchDay[this.matchDaysPlayed-1].length; i++) {
			buffer += this.matchDay[this.matchDaysPlayed-1][i].homeTeam.name + " - " + this.matchDay[this.matchDaysPlayed-1][i].awayTeam.name;
			//if (this.matchDaysPlayed === this.matchDaysFinished) {
				buffer += " " + this.matchDay[this.matchDaysPlayed-1][i].homeTeamGoals + "-" + this.matchDay[this.matchDaysPlayed-1][i].awayTeamGoals;
			//}
			buffer +=  " <br />";
		//this.matchDay[day][i].fastSim();
	//	console.log("post sim matchday " + day + ": " + this.matchDay[day][i].homeTeamGoals + "-" + this.matchDay[day][i].awayTeamGoals);	
		}
		document.getElementById('prevMatches').innerHTML = buffer;
		document.getElementById('prevMatchDay').innerHTML = "<h2>Matchday " + this.matchDaysPlayed + "</h2>";
		
	}

};

$.Season.prototype.update = function() {

};

$.Season.prototype.rendder = function() {
	//console.log("matchday " + 0 + ": " + this.matchDay[0][0].homeTeam.name + "-" + this.matchDay[0][0].awayTeam.name );


};
$.Season.prototype.render = function() {
	this.updateTable();
	this.renderTable(false);
	this.getNextMatchDay();
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
	this.renderTable(true);
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

$.Season.prototype.renderTable = function (check) {
    if (this.inspectingTeam > -1) {
        var buffer = this.getTeam(this.inspectingTeam).generateTeamTable();

//        buffer =+ "Back to table link";    in table button or both
        document.getElementById('table').innerHTML = buffer;
        return;
    }
	if (this.matchDaysFinished === this.matchDaysPlayed) {

		var table = this.updateTable();

		var buffer = "<h2>Table";
		if (this.matchDaysPlayed != 0) {
			buffer += " after matchday " + this.matchDaysPlayed;
		}
		else {
			buffer += " before matchday 1";
		}
		buffer += "</h2><table>";
		var lol = 0;
		var win = false;
		table.forEach(function(key) {
			lol++;
			var team = this.teams[key];
			if (check && lol === 1 && team === $.team8) {
				win = true;
			}
			buffer += "<tr style='text-align: right; color: " + $.colors["skyblue"] + ";'>"  + "<td style='text-align: left;'>";

	//	buffer += '<form id="pos_' + team.id + '" onSubmit="return false;">';
			
	        buffer += '<a href="#" onclick="$.season.inspectTeam(' + team.id + ');">' + team.name + '</a>';

			buffer += "</td><td>" + this.matchDaysPlayed + 
			"</td><td>" + team.wins + "</td><td>" + team.draws + "</td><td>" + team.losses + "</td><td>" + 
			team.goalsFor + "</td><td>" + team.goalsAgainst + "</td><td>" + team.goalsDiff + "</td><td>" + team.points + "</td></tr>";
		}, this);

	    buffer += "</table>";
	    document.getElementById('table').innerHTML = buffer;
	    if (win) {
	    	document.getElementById('win').innerHTML = "<div style='color: " + $.colors["cloudblue"] + "';>You won the league! Amazing - well done!<br />Thanks for playing Bargainball!<br /><br />";
	    }
	}
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
