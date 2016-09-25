"use strict";


$.Match = function(homeTeam, awayTeam, render) {
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.list = [];
    this.eventCount = 0;
    this.homeTeamGoals = 0;
    this.awayTeamGoals = 0;
    this.matchTimePassed = 0;
    this.matchEvents = {};
    this.possession = this.calcPossesionAndGenerateEvents();
    this.matchState = 0;
    this.result = '?';
    // 0 = not started
    // 1 = first half
    // 2 = first half ends
    // 3 = halftime
    // 4 = second half no started
    // 5 = second half 
    // 6 = second half ends
    // 7 = post game
    $.events.addEvent("Possession is " + this.possession);
    this.matchEvents[(46 + Math.abs(this.possession))] = "firstHalfEnds";
    this.matchEvents[(91 + parseInt(Math.abs(this.possession/2)))] = "secondHalfEnds";
    this.timeout = 0;
    this.timeoutCount = 200;
    if (!render) {
        this.timeoutCount = 0;
    }
};

$.Match.prototype.update = function (timer) {
    if (this.timeout > 0) {
        this.timeout--;
        return;
    }

    if (this.matchState === 0) {
        this.matchState = 1;
        $.events.addEvent("The match has started!");
        this.timeout = this.timeoutCount;
    }
    else if (this.matchState === 4) {
        this.matchState = 5;
        $.events.addEvent("The second half has started!");
        this.timeout = this.timeoutCount;
    }
    else if (this.matchState === 1 || this.matchState === 5) {
        this.matchTimePassed++;
        if (this.matchEvents[this.matchTimePassed] != undefined) {
            var event = this.matchEvents[this.matchTimePassed];
            if (event === "regularChanceHome") {
                $.events.addEvent("He scores!");
                this.homeTeamGoals++;
                this.timeout = this.timeoutCount;
            }
            if (event === "regularChanceAway") {
                $.events.addEvent("tHey scores!");
                this.awayTeamGoals++;
                this.timeout = this.timeoutCount;
            }
            if (this.matchState === 1 && event === "firstHalfEnds") {
                $.events.addEvent("First half ends");
                this.matchState = 4;
                this.matchTimePassed = 45;
                this.timeout = this.timeoutCount;
            }
            if (event === "secondHalfEnds") {
                $.events.addEvent("The ref blows his whistle for full time.");
                this.matchState = 6;
                this.timeout = this.timeoutCount;
            }
        }
    }
};

$.Match.prototype.fastSim = function () {
    console.log("fastsimming " + this.homeTeam.name + "-" + this.awayTeam.name);
    while(this.matchState!=6) {
        if (this.matchState === 0) {
            this.matchState = 1;
        }
        else if (this.matchState === 4) {
            this.matchState = 5;
        }
        else if (this.matchState === 1 || this.matchState === 5) {
            this.matchTimePassed++;
            if (this.matchEvents[this.matchTimePassed] != undefined) {
                var event = this.matchEvents[this.matchTimePassed];
                if (event === "regularChanceHome") {
                    this.homeTeamGoals++;
                }
                if (event === "regularChanceAway") {
                    this.awayTeamGoals++;
                }
                if (this.matchState === 1 && event === "firstHalfEnds") {
                    this.matchState = 4;
                    this.matchTimePassed = 45;
                }
                if (event === "secondHalfEnds") {
                    this.matchState = 6;
                    this.saveResult();
                }
            }
        }
    }
};


$.Match.prototype.saveResult = function() {

    console.log("saving res");

    if (this.homeTeamGoals > this.awayTeamGoals) {
        this.result = 'H';
        this.homeTeam.points += 3;
        this.homeTeam.wins++;
        this.awayTeam.losses++;
    }
    else if (this.homeTeamGoals < this.awayTeamGoals) {
        this.result = 'A';
        this.awayTeam.points += 3;
        this.awayTeam.wins++;
        this.homeTeam.losses++;
    }
    else {
        this.result = 'D';
        this.homeTeam.points += 1;
        this.awayTeam.points += 1;
        this.homeTeam.draws++;
        this.awayTeam.draws++;
    }
    // TODO: maybe refactor this if we want to access previous state

    console.log("res: " + this.result);

    this.homeTeam.goalsFor += this.homeTeamGoals;
    this.homeTeam.goalsAgainst += this.awayTeamGoals;
    this.homeTeam.goalsDiff = this.homeTeam.goalsFor - this.homeTeam.goalsAgainst;

    this.awayTeam.goalsFor += this.awayTeamGoals;
    this.awayTeam.goalsAgainst += this.homeTeamGoals;
    this.awayTeam.goalsDiff = this.awayTeam.goalsFor - this.awayTeam.goalsAgainst;

};

$.Match.prototype.render = function (x, y) {
   // $.Draw.fillText("Home: " + this.homeTeamGoals + "\nAway: " + this.awayTeamGoals + " Time: " + this.matchTimePassed + " MatchState: " + this.matchState, x, y, "30px Arial");
    
};


$.Match.prototype.updateSkillsBeforeMatch = function () {
    /*
    if (this.homeTeam.my) {
        this.hometeam.totalDefenderSkill = $.team1.totalKeeperSkill;
        this.hometeam.totalDefenderSkill = $.team1.totalDefenderSkill;
        this.hometeam.totalDefenderSkill = $.team1.totalMidfielderSkill;
        this.hometeam.totalDefenderSkill = $.team1.totalStrikerSkill;

    }
    */
};

$.Match.prototype.calcPossesionAndGenerateEvents = function () {

    this.matchEvents['88'] = "regularChanceHome";

    if (this.homeTeam.totalMidfielderSkill === this.awayTeam.totalMidfielderSkill) {
        this.matchEvents['11'] = "regularChanceHome";
        this.matchEvents['67'] = "regularChanceAway";
        return 0;
    }
    else if (this.homeTeam.totalMidfielderSkill > this.awayTeam.totalMidfielderSkill) {
        this.matchEvents['12'] = "regularChanceHome";
        if (this.homeTeam.totalMidfielderSkill > this.awayTeam.totalMidfielderSkill+4) {
            this.matchEvents['55'] = "regularChanceHome";
            this.matchEvents['85'] = "regularChanceHome";
            return -3;
        }
        this.matchEvents['41'] = "regularChanceAway";
        this.matchEvents['73'] = "regularChanceHome";
        return -2;
    }
    else if (this.homeTeam.totalMidfielderSkill < this.awayTeam.totalMidfielderSkill) {
        this.matchEvents['17'] = "regularChanceAway";
        if (this.homeTeam.totalMidfielderSkill+4 < this.awayTeam.totalMidfielderSkill) {
            this.matchEvents['36'] = "regularChanceAway";
            this.matchEvents['90'] = "regularChanceAway";
            return 3;
        }
        this.matchEvents['71'] = "regularChanceHome";
        this.matchEvents['87'] = "regularChanceAway";
        return 2;
    }
};

$.Match.prototype.regularChance = function (forHomeTeam) {


};

