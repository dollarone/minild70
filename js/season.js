"use strict";

$.Season = function(teamCount) {
	this.maxTeamCount = teamCount;
	this.teamCount = 0;
	this.teams = {};
	this.matchDay = new Array(((teamCount-0)*2));
};

$.Season.prototype.addTeam = function (team) {
	if (this.teamCount < this.maxTeamCount) {
		this.teams[team.id] = {id:team.id, name:team.name, team:team, goalsDiff:$.util.randomIntInRange(1,9), goalsFor:$.util.randomIntInRange(0,9), goalsAgainst:0, points:7};
		this.teamCount++;
	}
};


$.Season.prototype.generateMatches = function() {
	var x = 1;
	var teamOffset = this.teamCount/2;
	if (this.teamCount%3 == 0) {
		teamOffset++;
	}
	for(var i=0; i<((this.teamCount-1)); i+=2) {
		this.matchDay[i] = [];
		this.matchDay[i+1] = [];//new Array(this.teamCount/2);
		//this.matchDay[i+(this.matchDay-1)] = [this.teamCount/2];


		// after some experiementing (see below), conclusion is:
		// jsut hard-code a table of fixtures for the available 
		// # of teams (4/8/12/16/20). aintnobodygottimeforthis
		var availableTeams = [];
		for(var a=0; a<this.teamCount; a++) {
			availableTeams.push(a);
		}
		if (i===0) {
			for(var j=0; j<(this.teamCount); j+=2) {
				this.matchDay[i].push(new $.Match(this.teams[(j)%this.teamCount], this.teams[(j+1)%this.teamCount], false));
				this.matchDay[i].push(new $.Match(this.teams[(j+teamOffset)%this.teamCount], this.teams[(j+teamOffset+1)%this.teamCount], false));
				//this.matchDay[i+(this.matchDay-1)].push(new $.Match(this.teams[(i+j+1)%this.teamCount], this.teams[(i+j)%this.teamCount], false));
				this.matchDay[i+1].push(new $.Match(this.teams[(j+1)%this.teamCount], this.teams[(j+1+1)%this.teamCount], false));
				this.matchDay[i+1].push(new $.Match(this.teams[(j+teamOffset+1)%this.teamCount], this.teams[(j+teamOffset+1+1)%this.teamCount], false));

			}
		}
		else if (i===2) {
			// if even teams, its easy
			for(var j=0; j<(this.teamCount); j+=2) {
				this.matchDay[i].push(new $.Match(this.teams[(j+teamOffset)%this.teamCount], this.teams[(j+teamOffset+2)%this.teamCount], false));
				this.matchDay[i].push(new $.Match(this.teams[(j)%this.teamCount], this.teams[(j+2)%this.teamCount], false));
				//this.matchDay[i+(this.matchDay-1)].push(new $.Match(this.teams[(i+j+1)%this.teamCount], this.teams[(i+j)%this.teamCount], false));
				this.matchDay[i+1].push(new $.Match(this.teams[(j+1)%this.teamCount], this.teams[(j+2+1)%this.teamCount], false));
				this.matchDay[i+1].push(new $.Match(this.teams[(j+teamOffset+1)%this.teamCount], this.teams[(j+teamOffset+2+1)%this.teamCount], false));
			}
		}
		else if (i===4) {
			for(var j=0; j<(this.teamCount/2); j++) {
				this.matchDay[i].push(new $.Match(this.teams[(j)%this.teamCount], this.teams[(j+3)%this.teamCount], false));
				this.matchDay[i].push(new $.Match(this.teams[(j+this.teamCount/2)%this.teamCount], this.teams[(j+this.teamCount/2+3)%this.teamCount], false));
				//this.matchDay[i+(this.matchDay-1)].push(new $.Match(this.teams[(i+j+1)%this.teamCount], this.teams[(i+j)%this.teamCount], false));
			}
		}
		else if (i===6) {
			for(var j=0; j<(this.teamCount/2); j++) {
				this.matchDay[i].push(new $.Match(this.teams[(j)%this.teamCount], this.teams[(j+4)%this.teamCount], false));
				this.matchDay[i].push(new $.Match(this.teams[(j+5)%this.teamCount], this.teams[(j+5+4)%this.teamCount], false));
				//this.matchDay[i+(this.matchDay-1)].push(new $.Match(this.teams[(i+j+1)%this.teamCount], this.teams[(i+j)%this.teamCount], false));
			}
		}

	}
};

$.Season.prototype.simMatchDay = function(day) {

};

$.Season.prototype.update = function() {

};

$.Season.prototype.rendder = function() {
	console.log("matchday " + 0 + ": " + this.matchDay[0][0].homeTeam.name + "-" + this.matchDay[0][0].awayTeam.name );

};
$.Season.prototype.render = function() {
	console.log("test");
	for(var i=0; i<(this.teamCount-1); i++) {
		for(var j=0; j<(this.teamCount/2); j++) {
			console.log("matchday " + i + ":" + this.matchDay[i][j].homeTeam.name + "-" + this.matchDay[i][j].awayTeam.name);
//			console.log("matchday " + i + ":\n" + this.matchDay[i]);
		}
	}
};

