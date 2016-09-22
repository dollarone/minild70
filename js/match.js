"use strict";


$.Match = function(homeTeam, awayTeam) {
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.list = [];
    this.events= 0;
    this.homeTeamGoals = 0;
    this.awayTeamGoals = 0;
    this.matchTimePassed = 0;
};


$.Match.prototype.initMatch = function (cupGame) {
    this.matchEvents = {};
    this.possession = this.calcPossession(matchEvents);

};

$.Match.prototype.simulateFirstHalf = function (timer) {

    if (this.timeout > 0) {
        this.timeout--;
        return;
    }
    this.matchTimePassed++;
    if (this.matchTimePassed < (46 + Math.abs(possession))) {
        if (matchEvents[this.matchTimePassed] != undefined) {
            this.timeout = 300;
            var event = matchEvents[this.matchTimePassed];
            if (event === "regularChanceHome") {
                $.events.addEvent("He scores!");
                this.homeTeamGoals++;
            }
            if (event === "regularChanceAway") {
                $.events.addEvent("tHey scores!");
                this.awayTeamGoals++;
            }
        }
    }
};
$.Match.prototype.simulateSecondHalf = function (offsetTimer) {
    var timer = offsetTimer - 100;

    if (timer < 91 + parseInt(Math.abs(possession/2))) {
        if (matchEvents[timer] != undefined) {

        }        
    }

};

$.Match.prototype.render = function () {
    
};

$.Match.prototype.update = function (timer) {

};

$.Match.prototype.calcPossession = function (matchEvents) {

    if (this.homeTeam.totalMidfielderSkill === this.awayTeam.totalMidfielderSkill) {
        matchEvents['11'] = "regularChanceHome";
        matchEvents['67'] = "regularChanceAway";
        return 0;
    }
    else if (this.homeTeam.totalMidfielderSkill > this.awayTeam.totalMidfielderSkill) {
        matchEvents['12'] = "regularChanceHome";
        if (this.homeTeam.totalMidfielderSkill > this.awayTeam.totalMidfielderSkill+4) {
            matchEvents['55'] = "regularChanceHome";
            matchEvents['85'] = "regularChanceHome";
            return -3;
        }
        matchEvents['41'] = "regularChanceAway";
        matchEvents['73'] = "regularChanceHome";
        return -2;
    }
    else if (this.homeTeam.totalMidfielderSkill < this.awayTeam.totalMidfielderSkill) {
        matchEvents['17'] = "regularChanceAway";
        if (this.homeTeam.totalMidfielderSkill+4 < this.awayTeam.totalMidfielderSkill) {
            matchEvents['36'] = "regularChanceAway";
            matchEvents['90'] = "regularChanceAway";
            return 3;
        }
        matchEvents['71'] = "regularChanceHome";
        matchEvents['87'] = "regularChanceAway";
        return 2;
    }
};

$.Match.prototype.regularChance = function (forHomeTeam) {


};

