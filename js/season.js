"use strict";

$.Season = function(teamCount) {
	this.maxTeamCount = teamCount;
	this.teamCount = 0;
	this.teams = {};
	this.matchDay = new Array(((teamCount-1)*2));
};

$.Season.prototype.addTeam = function (team) {
	if (this.teamCount < this.maxTeamCount) {
		this.teams[team.id] = {id:team.id, name:team.name, team:team, goalsDiff:$.util.randomIntInRange(1,9), goalsFor:$.util.randomIntInRange(0,9), goalsAgainst:0, points:7};
		this.teamCount++;
	}
};


$.Season.prototype.generateMatches = function() {
	for(var i=0; i<((this.teamCount-1)); i++) {
		this.matchDay[i] = new Array(this.teamCount/2);
		//this.matchDay[i+(this.matchDay-1)] = [this.teamCount/2];
		for(var j=0; j<(this.teamCount/2); j++) {
			this.matchDay[i].push(new $.Match(this.teams[(i+j)%this.teamCount], this.teams[(i+j+1)%this.teamCount], false));
			//this.matchDay[i+(this.matchDay-1)].push(new $.Match(this.teams[(i+j+1)%this.teamCount], this.teams[(i+j)%this.teamCount], false));
		}
	}
};

$.Season.prototype.simMatchDay = function(day) {

};

$.Season.prototype.update = function() {

};

$.Season.prototype.render = function() {
	console.log("matchday " + 0 + ": " + JSON.stringify(this.matchDay[0]));

};
$.Season.prototype.rendser = function() {
	for(var i=0; i<(this.matchDay-1); i++) {
		for(var j=0; j<(this.teamCount/2); j++) {
//			console.log("matchday " + i + ":\n" + this.matchDay[i][j].homeTeam + "-" + this.matchDay[i][j].awayTeam);
			console.log("matchday " + i + ":\n" + this.matchDay[i]);
		}
	}
};

