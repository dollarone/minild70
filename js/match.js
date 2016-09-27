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
    this.timeout = 0;
    this.timeoutCount = 200;
    if (!render) {
        this.timeoutCount = 0;
    }
    this.homeTeamRegularChances = 0;
    this.awayTeamRegularChances = 0;
    this.homeTeamCorners = 0;
    this.awayTeamCorners = 0;
    this.homeTeamFreekicks = 0;
    this.awayTeamFreekicks = 0;
};
$.Match.prototype.beforeKickoff = function() {
    this.possession = this.calcPossesionAndGenerateEvents()
    $.events.addEvent("Possession is " + this.possession);
    this.matchEvents[(46 + Math.abs(this.possession))] = "firstHalfEnds";
    this.matchEvents[(91 + parseInt(Math.abs(this.possession/2)))] = "secondHalfEnds";
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
                if (this.homeTeam.totalStrikerSkill > this.awayTeam.totalDefenderSkill) {
                   $.events.addEvent("He scores!");
                    this.homeTeamGoals++;
                    this.timeout = this.timeoutCount;
                }
            }
            if (event === "regularChanceAway") {
                if (this.awayTeam.totalStrikerSkill > this.homeTeam.totalDefenderSkill) {
                    $.events.addEvent("tHey scores!");
                    this.awayTeamGoals++;
                    this.timeout = this.timeoutCount;
                }
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
this.beforeKickoff();
    console.log("fastsimming " + this.homeTeam.name + "-" + this.awayTeam.name);

console.log("TA homeTeam stats: " + this.homeTeam.name);
console.log("TA  keeper: " + this.homeTeam.totalKeeperSkill);
console.log("TA defence: " + this.homeTeam.totalDefenderSkill);
console.log("TAmidfield: " + this.homeTeam.totalMidfielderSkill);
console.log("TA  attack: " + this.homeTeam.totalStrikerSkill);
console.log("TAfreekick: " + this.homeTeam.freekickTaker.attack + " " + this.homeTeam.freekickTaker.trait);

console.log("TA awayTeam stats: " + this.awayTeam.name);
console.log("TA  keeper: " + this.awayTeam.totalKeeperSkill);
console.log("TA defence: " + this.awayTeam.totalDefenderSkill);
console.log("TAmidfield: " + this.awayTeam.totalMidfielderSkill);
console.log("TA  attack: " + this.awayTeam.totalStrikerSkill);
console.log("TAfreekick: " + this.awayTeam.freekickTaker.attack + " " + this.awayTeam.freekickTaker.trait);

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
                    this.homeTeamRegularChances++;
                    if (this.homeTeamRegularChances === 1 && this.awayTeam.hasTackler()) {
                        // tackle
                    }
                    else if (this.homeTeam.totalStrikerSkill > this.awayTeam.totalDefenderSkill) {
                        this.homeTeamGoals++;
console.log("TA GOAL regHome");
                    }
                }
                else if (event === "regularChanceAway") {
                    this.awayTeamRegularChances++;
                    if (this.awayTeamRegularChances === 1 && this.homeTeam.hasTackler()) {
                        // tackle
                    }
                    else if (this.awayTeam.totalStrikerSkill > this.homeTeam.totalDefenderSkill) {
                        this.awayTeamGoals++;
console.log("TA GOAL regAway");                          
                    }
                }
                else if (event === "freeKickHome") {
                    this.homeTeamFreekicks++;
                    if ((this.homeTeam.freekickTaker.trait === "Freekick expert" || 
                        this.homeTeam.freekickTaker.attack > this.awayTeam.totalKeeperSkill) && this.homeTeamFreekicks % 2 == 0) {
                        this.homeTeamGoals++;
console.log("TA GOAL freekickHome");                    
                    }
                }
                else if (event === "freeKickAway") {
                    this.awayTeamFreekicks++;
                    if ((this.awayTeam.freekickTaker.trait === "Freekick expert" || 
                        this.awayTeam.freekickTaker.attack > this.homeTeam.totalKeeperSkill) && this.awayTeamFreekicks % 2 == 0) {
                        this.awayTeamGoals++;
console.log("TA GOAL freekickAway");
                    }
                }
                else if (event === "dribbleChanceHome") {
                    this.homeTeamFreekicks++;
                    if ((this.homeTeam.freekickTaker.trait === "Freekick expert" || 
                        this.homeTeam.freekickTaker.attack > this.awayTeam.totalKeeperSkill) && this.homeTeamFreekicks % 2 == 0) {
                        this.homeTeamGoals++;
console.log("TA GOAL dribbleHome");
                    }
              
                }
                else if (event === "dribbleChanceAway") {
                    this.awayTeamFreekicks++;
                    if ((this.awayTeam.freekickTaker.trait === "Freekick expert" || 
                        this.awayTeam.freekickTaker.attack > this.homeTeam.totalKeeperSkill) && this.awayTeamFreekicks % 2 == 0) {
                        this.awayTeamGoals++;
console.log("TA GOAL dribbleAway");                    
                    }
                }
                else if (event === "cornerChanceHome") {
                    this.homeTeamCorners++;
                    if (this.homeTeam.countHeaders() > this.awayTeam.countHeaders() && this.homeTeamCorners % 2 === 0) {
                        this.homeTeamGoals++;
console.log("TA GOAL cornerHome");
                    }
                }
                else if (event === "cornerChanceAway") {
                    this.awayTeamCorners++;
                    if (this.homeTeam.countHeaders() < this.awayTeam.countHeaders() && this.awayTeamCorners % 2 === 0) {
                        this.awayTeamGoals++;
console.log("TA GOAL cornerAway");
                    }
                }
                else if (event === "speedChanceHome") {
                    this.homeTeamCorners++;
                    if (this.homeTeam.countHeaders() > this.awayTeam.countHeaders() && this.homeTeamCorners % 2 === 0) {
                       this.homeTeamGoals++;
console.log("TA GOAL speedcornerHome");
                    }
                }
                else if (event === "speedChanceAway") {
                    this.awayTeamCorners++;
                    if (this.homeTeam.countHeaders() < this.awayTeam.countHeaders() && this.awayTeamCorners % 2 === 0) {
                        this.awayTeamGoals++;
console.log("TA GOAL speedcornerAway");
                    }
                }

                if (this.matchState === 1 && event === "firstHalfEnds") {
                    this.matchState = 4;
                    this.matchTimePassed = 45;
                }
                if (event === "secondHalfEnds") {
                    this.matchState = 6;
                    this.saveResult();
console.log("TAPossession was " + this.possession);
console.log("TA result: " + this.homeTeamGoals + "-" + this.awayTeamGoals);

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
    // home advantage:
    this.matchEvents['88'] = "regularChanceHome";

    if (this.homeTeam.hasFastRunnerAtt() && !this.awayTeam.hasFastRunner()) {
        this.matchEvents['24'] = "speedChanceHome";
    }
    if (!this.homeTeam.hasFastRunner() && this.awayTeam.hasFastRunnerAtt()) {
        this.matchEvents['27'] = "speedChanceAway";
    }

    if (this.homeTeam.countDribblers() > 1) {
        this.matchEvents['33'] = "dribbleChanceHome";
        this.matchEvents['49'] = "dribbleChanceHome";
    }
    else if (this.homeTeam.countDribblers() > 0) {
        this.matchEvents['18'] = "dribbleChanceHome";
    }
    if (this.awayTeam.countDribblers() > 1) {
        this.matchEvents['44'] = "dribbleChanceAway";
        this.matchEvents['70'] = "dribbleChanceAway";
    }
    else if (this.awayTeam.countDribblers() > 0) {
        this.matchEvents['22'] = "dribbleChanceAway";
    }

    if (this.homeTeam.totalMidfielderSkill === this.awayTeam.totalMidfielderSkill) {
        this.matchEvents['11'] = "regularChanceHome";
        this.matchEvents['39'] = "cornerChanceAway";
        this.matchEvents['42'] = "freeKickAway";
        this.matchEvents['53'] = "cornerChanceHome";
        this.matchEvents['67'] = "regularChanceAway";
        this.matchEvents['75'] = "freeKickHome";
        return 0;
    }
    else if (this.homeTeam.totalMidfielderSkill > this.awayTeam.totalMidfielderSkill) {
        this.matchEvents['12'] = "regularChanceHome";

        if (this.homeTeam.totalMidfielderSkill > this.awayTeam.totalMidfielderSkill+4) {
            this.matchEvents['9'] = "cornerChanceAway";
            this.matchEvents['18'] = "freeKickHome";
            this.matchEvents['52'] = "cornerChanceHome";
            this.matchEvents['55'] = "regularChanceHome";
            this.matchEvents['85'] = "regularChanceHome";
            this.matchEvents['61'] = "freeKickHome";
            this.matchEvents['86'] = "cornerChanceHome";
            return -3;
        }
        this.matchEvents['21'] = "cornerChanceAway";
        this.matchEvents['23'] = "freeKickHome";
        this.matchEvents['41'] = "regularChanceAway";
        this.matchEvents['54'] = "cornerChanceHome";
        this.matchEvents['73'] = "regularChanceHome"
        this.matchEvents['79'] = "cornerChanceHome";;
        this.matchEvents['84'] = "freeKickAway";
        return -2;
    }
    else if (this.homeTeam.totalMidfielderSkill < this.awayTeam.totalMidfielderSkill) {
        this.matchEvents['17'] = "regularChanceAway";
        if (this.homeTeam.totalMidfielderSkill+4 < this.awayTeam.totalMidfielderSkill) {
            this.matchEvents['5'] = "cornerChanceAway";
            this.matchEvents['7'] = "freeKickAway";
            this.matchEvents['10'] = "cornerChanceAway";
            this.matchEvents['36'] = "regularChanceAway";
            this.matchEvents['51'] = "freeKickAway";
            this.matchEvents['57'] = "cornerChanceHome";
            this.matchEvents['90'] = "regularChanceAway";
            return 3;
        }
        this.matchEvents['13'] = "cornerChanceAway";
        this.matchEvents['35'] = "freeKickHome";
        this.matchEvents['58'] = "cornerChanceAway";
        this.matchEvents['71'] = "regularChanceHome";
        this.matchEvents['69'] = "freeKickAway";
        this.matchEvents['74'] = "cornerChanceHome";
        this.matchEvents['87'] = "regularChanceAway";
        return 2;
    }
};

$.Match.prototype.regularChance = function (forHomeTeam) {


};

