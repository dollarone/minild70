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
    this.timeoutCount = 50;
    if (!render) {
        this.timeoutCount = 0;
    }
    this.homeTeamRegularChances = 0;
    this.awayTeamRegularChances = 0;
    this.homeTeamCorners = 0;
    this.awayTeamCorners = 0;
    this.homeTeamFreekicks = 0;
    this.awayTeamFreekicks = 0;
    this.speed = 0;
};
$.Match.prototype.beforeKickoff = function() {
    this.speed = 2;
    if ($.team8 === this.homeTeam || $.team8 === this.awayTeam) {
        this.speed = parseInt($.season.getSpeed());
    }
    this.timeout = 0;

    this.possession = this.calcPossesionAndGenerateEvents()
    this.matchEvents[(46 + Math.abs(this.possession))] = "firstHalfEnds";
    this.matchEvents[(91 + parseInt(Math.abs(this.possession/2)))] = "secondHalfEnds";
};


$.Match.prototype.fastSim = function () {
    this.beforeKickoff();
/*
    console.log("fastsimming " + this.homeTeam.name + "-" + this.awayTeam.name);

console.log("TA homeTeam stats: " + this.homeTeam.name);
console.log("TA  keeper: " + this.homeTeam.totalKeeperSkill);
console.log("TA defence: " + this.homeTeam.totalDefenderSkill);
console.log("TAmidfield: " + this.homeTeam.totalMidfielderSkill);
console.log("TA  attack: " + this.homeTeam.totalStrikerSkill);
console.log("TAfreekick: " + this.homeTeam.freekickTaker.attack + " " + this.homeTeam.getFreekickTaker().trait);

console.log("TA awayTeam stats: " + this.awayTeam.name);
console.log("TA  keeper: " + this.awayTeam.totalKeeperSkill);
console.log("TA defence: " + this.awayTeam.totalDefenderSkill);
console.log("TAmidfield: " + this.awayTeam.totalMidfielderSkill);
console.log("TA  attack: " + this.awayTeam.totalStrikerSkill);
console.log("TAfreekick: " + this.awayTeam.freekickTaker.attack + " " + this.awayTeam.getFreekickTaker().trait);
*/
    while(this.matchState!=6) {
        if (this.matchState === 0) {
            this.matchState = 1;
            if (this.speed == 1) {
                $.events.addEvent(this.homeTeam.name, this.homeTeamGoals, this.awayTeam.name, this.awayTeamGoals, 0, "Welcome to today's match: " + this.homeTeam.name + " vs " + this.awayTeam.name); 
                $.events.addEvent(this.homeTeam.name, this.homeTeamGoals, this.awayTeam.name, this.awayTeamGoals, 0, "The ref gets the match going!");
            }
        }
        else if (this.matchState === 4) {
            this.matchState = 5;
            if (this.speed == 1) {
                $.events.addEvent(this.homeTeam.name, this.homeTeamGoals, this.awayTeam.name, this.awayTeamGoals, 45, "The second half has started!");
            }
        }
        else if (this.matchState === 1 || this.matchState === 5) {
            this.matchTimePassed++;
            if (this.matchEvents[this.matchTimePassed] != undefined) {
                var event = this.matchEvents[this.matchTimePassed];
                if (event === "regularChanceHome") {
                    this.homeTeamRegularChances++;
                    if (this.speed == 1) {
                        $.events.addEvent(this.homeTeam.name, this.homeTeamGoals, this.awayTeam.name, this.awayTeamGoals, this.matchTimePassed, this.homeTeam.name + " breaking through the middle... ");
                    }
                    if (this.homeTeamRegularChances === 1 && this.awayTeam.hasTackler()) {
                        // tackle
                        if (this.speed == 1) {
                            $.events.addEvent(this.homeTeam.name, this.homeTeamGoals, this.awayTeam.name, this.awayTeamGoals, this.matchTimePassed, "but a great last-ditch tackle clears the danger!");
                            this.timeout = this.timeoutCount;
                        }
                    }
                    else if (!this.awayTeam.hasKeeper() || this.homeTeam.totalStrikerSkill > this.awayTeam.totalDefenderSkill) {
                        this.homeTeamGoals++;
                        if (this.speed == 1) {
                            $.events.addEvent(this.homeTeam.name, this.homeTeamGoals, this.awayTeam.name, this.awayTeamGoals, this.matchTimePassed, "and the shot is cleanly struck and well-aimed: GOAL!");
                            this.timeout = this.timeoutCount;
                        }
//console.log("TA GOAL regHome");
                    }
                    else {
                        if (this.speed == 1) {
                            $.events.addEvent(this.homeTeam.name, this.homeTeamGoals, this.awayTeam.name, this.awayTeamGoals, this.matchTimePassed, "but the shot is high and wide!");
                            this.timeout = this.timeoutCount;
                        }
                    }
                }
                else if (event === "regularChanceAway") {
                    this.awayTeamRegularChances++;
                    if (this.speed == 1) {
                        $.events.addEvent(this.homeTeam.name, this.homeTeamGoals, this.awayTeam.name, this.awayTeamGoals, this.matchTimePassed, "Excellent play by " + this.awayTeam.name + " here... ");
                    }
                    if (this.awayTeamRegularChances === 1 && this.homeTeam.hasTackler()) {
                        if (this.speed == 1) {
                            $.events.addEvent(this.homeTeam.name, this.homeTeamGoals, this.awayTeam.name, this.awayTeamGoals, this.matchTimePassed, "but a last-ditch tackle saves the day!");
                        }
                    }
                    else if (!this.homeTeam.hasKeeper() || this.awayTeam.totalStrikerSkill > this.homeTeam.totalDefenderSkill) {
                        this.awayTeamGoals++;
                        if (this.speed == 1) {
                            $.events.addEvent(this.homeTeam.name, this.homeTeamGoals, this.awayTeam.name, this.awayTeamGoals, this.matchTimePassed, "a few good passes creates a 1-on-1 situation: GOAL!");
                            this.timeout = this.timeoutCount;
                        }
//console.log("TA GOAL regAway");                          
                    }
                    else {
                        if (this.speed == 1) {
                            $.events.addEvent(this.homeTeam.name, this.homeTeamGoals, this.awayTeam.name, this.awayTeamGoals, this.matchTimePassed, "but the chance is wasted!");
                            this.timeout = this.timeoutCount;
                        }
                    }

                }
                else if (event === "freeKickHome") {
                    this.homeTeamFreekicks++;
                    if (this.speed == 1) {
                        $.events.addEvent(this.homeTeam.name, this.homeTeamGoals, this.awayTeam.name, this.awayTeamGoals, this.matchTimePassed, "Free kick to " + this.homeTeam.name + ".");
                    }
                    if (!this.awayTeam.hasKeeper() || ((this.homeTeam.getFreekickTaker().trait === "Freekick expert" || 
                        this.homeTeam.getFreekickTaker().attack > this.awayTeam.totalKeeperSkill) && this.homeTeamFreekicks % 2 == 0)) {
                        this.homeTeamGoals++;
                        if (this.speed == 1) {
                            $.events.addEvent(this.homeTeam.name, this.homeTeamGoals, this.awayTeam.name, this.awayTeamGoals, this.matchTimePassed, "He puts it high and out of the keeper's reach! GOAL!");
                            this.timeout = this.timeoutCount;
                        }

//console.log("TA GOAL freekickHome");                    
                    }
                    else {
                        if (this.speed == 1) {
                            $.events.addEvent(this.homeTeam.name, this.homeTeamGoals, this.awayTeam.name, this.awayTeamGoals, this.matchTimePassed, "But the keeper parries with a great save!");
                            this.timeout = this.timeoutCount;
                        }

                    }
                }
                else if (event === "freeKickAway") {
                    this.awayTeamFreekicks++;
                    if (this.speed == 1) {
                        $.events.addEvent(this.homeTeam.name, this.homeTeamGoals, this.awayTeam.name, this.awayTeamGoals, this.matchTimePassed, this.awayTeam.name + " has a free kick in a good position.");
                    }
                    if (!this.homeTeam.hasKeeper() ||  ((this.awayTeam.getFreekickTaker().trait === "Freekick expert" || 
                        this.awayTeam.getFreekickTaker().attack > this.homeTeam.totalKeeperSkill) && this.awayTeamFreekicks % 2 == 0)) {
                        this.awayTeamGoals++;
                        if (this.speed == 1) {
                            $.events.addEvent(this.homeTeam.name, this.homeTeamGoals, this.awayTeam.name, this.awayTeamGoals, this.matchTimePassed, "Top corner! What a shot! GOAL!");
                            this.timeout = this.timeoutCount;
                        }

//console.log("TA GOAL freekickAway");
                    }
                    else {
                        if (this.speed == 1) {
                            $.events.addEvent(this.homeTeam.name, this.homeTeamGoals, this.awayTeam.name, this.awayTeamGoals, this.matchTimePassed, "But it's an easy catch for the goalkeeper.");
                            this.timeout = this.timeoutCount;
                        }
                    }
                }
                else if (event === "dribbleChanceHome") {
                    this.homeTeamFreekicks++;
                    if (this.speed == 1) {
                        $.events.addEvent(this.homeTeam.name, this.homeTeamGoals, this.awayTeam.name, this.awayTeamGoals, this.matchTimePassed, "Some excellent dribbling leads to a free kick for " + this.homeTeam.name + ".");
                    }

                    if (!this.awayTeam.hasKeeper() || ((this.homeTeam.getFreekickTaker().trait === "Freekick expert" || 
                        this.homeTeam.getFreekickTaker().attack > this.awayTeam.totalKeeperSkill) && this.homeTeamFreekicks % 2 == 0)) {
                        this.homeTeamGoals++;
                        if (this.speed == 1) {
                            $.events.addEvent(this.homeTeam.name, this.homeTeamGoals, this.awayTeam.name, this.awayTeamGoals, this.matchTimePassed, "GOAL! The ball almost takes the net out!");
                            this.timeout = this.timeoutCount;
                        }

//console.log("TA GOAL dribbleHome");
                    }
                    else {
                        if (this.speed == 1) {
                            $.events.addEvent(this.homeTeam.name, this.homeTeamGoals, this.awayTeam.name, this.awayTeamGoals, this.matchTimePassed, "It's hit hard but wide.");
                            this.timeout = this.timeoutCount;
                        }
                    }
              
                }
                else if (event === "dribbleChanceAway") {
                    this.awayTeamFreekicks++;
                    if (this.speed === 1) {
                        $.events.addEvent(this.homeTeam.name, this.homeTeamGoals, this.awayTeam.name, this.awayTeamGoals, this.matchTimePassed, this.awayTeam.name + " has a free kick after some great dribbling down the left hand side.");
                    }

                    if (!this.homeTeam.hasKeeper() || ((this.awayTeam.getFreekickTaker().trait === "Freekick expert" || 
                        this.awayTeam.getFreekickTaker().attack > this.homeTeam.totalKeeperSkill) && this.awayTeamFreekicks % 2 == 0)) {
                        this.awayTeamGoals++;
                        if (this.speed === 1) {
                            $.events.addEvent(this.homeTeam.name, this.homeTeamGoals, this.awayTeam.name, this.awayTeamGoals, this.matchTimePassed, "Fantastic shot! It's a GOAL!");
                            this.timeout = this.timeoutCount;
                        }
//console.log("TA GOAL dribbleAway");                    
                    }
                    else {
                        if (this.speed === 1) {
                            $.events.addEvent(this.homeTeam.name, this.homeTeamGoals, this.awayTeam.name, this.awayTeamGoals, this.matchTimePassed, "It hits the post and goes out for a goal kick.");
                            this.timeout = this.timeoutCount;
                        }
                    }
                }
                else if (event === "cornerChanceHome") {
                    this.homeTeamCorners++;
                    if (this.speed === 1) {
                        $.events.addEvent(this.homeTeam.name, this.homeTeamGoals, this.awayTeam.name, this.awayTeamGoals, this.matchTimePassed, this.homeTeam.name + " has a corner from the left.");
                    }
                    if (!this.awayTeam.hasKeeper() || (this.homeTeam.countHeaders() > this.awayTeam.countHeaders() && this.homeTeamCorners % 2 === 0)) {
                        this.homeTeamGoals++;
                        if (this.speed === 1) {
                            $.events.addEvent(this.homeTeam.name, this.homeTeamGoals, this.awayTeam.name, this.awayTeamGoals, this.matchTimePassed, "GOAL! Headed in with power!");
                            this.timeout = this.timeoutCount;
                        }
//console.log("TA GOAL cornerHome");
                    }
                    else {
                        if (this.speed === 1) {
                            $.events.addEvent(this.homeTeam.name, this.homeTeamGoals, this.awayTeam.name, this.awayTeamGoals, this.matchTimePassed, "The keeper comes out and claims the cross.");
                            this.timeout = this.timeoutCount;
                        }
                    }
                }
                else if (event === "cornerChanceAway") {
                    this.awayTeamCorners++;
console.log("corner number " + this.awayTeamCorners);
                    if (this.speed === 1) {
                        $.events.addEvent(this.homeTeam.name, this.homeTeamGoals, this.awayTeam.name, this.awayTeamGoals, this.matchTimePassed, "A corner is awarded to " + this.awayTeam.name + ".");
                    }
                    if (!this.homeTeam.hasKeeper() || (this.homeTeam.countHeaders() < this.awayTeam.countHeaders() && this.awayTeamCorners % 2 === 0)) {
                        this.awayTeamGoals++;
                        if (this.speed === 1) {
                            $.events.addEvent(this.homeTeam.name, this.homeTeamGoals, this.awayTeam.name, this.awayTeamGoals, this.matchTimePassed, "It's a well-rehearsed corner. Headed on and toed in at the back post! GOAL!");
                            this.timeout = this.timeoutCount;
console.log("goal");
                        }
//console.log("TA GOAL cornerAway");
                    }
                    else {
console.log("fail");
                        if (this.speed === 1) {
                            $.events.addEvent(this.homeTeam.name, this.homeTeamGoals, this.awayTeam.name, this.awayTeamGoals, this.matchTimePassed, "But the defence has no problem dealing with the corner.");
                            this.timeout = this.timeoutCount;
                        }
                    }
                }
                else if (event === "speedChanceHome") {
                    this.homeTeamCorners++;
                    if (this.speed === 1) {
                        $.events.addEvent(this.homeTeam.name, this.homeTeamGoals, this.awayTeam.name, this.awayTeamGoals, this.matchTimePassed, "A super fast break by " + this.homeTeam.name + " leads to a corner.");
                    }
                    if (!this.awayTeam.hasKeeper() || (this.homeTeam.countHeaders() > this.awayTeam.countHeaders() && this.homeTeamCorners % 2 === 0)) {
                       this.homeTeamGoals++;
                        if (this.speed == 1) {
                            $.events.addEvent(this.homeTeam.name, this.homeTeamGoals, this.awayTeam.name, this.awayTeamGoals, this.matchTimePassed, "It's perfectly met by a massive forehead. GOAL!");
                            this.timeout = this.timeoutCount;
                        }
//console.log("TA GOAL speedcornerHome");
                    }
                    else {
                        if (this.speed === 1) {
                            $.events.addEvent(this.homeTeam.name, this.homeTeamGoals, this.awayTeam.name, this.awayTeamGoals, this.matchTimePassed, "But it leads to nothing.");
                            this.timeout = this.timeoutCount;
                        }
                    }
                }
                else if (event === "speedChanceAway") {
                    this.awayTeamCorners++;
                    if (this.speed === 1) {
                        $.events.addEvent(this.homeTeam.name, this.homeTeamGoals, this.awayTeam.name, this.awayTeamGoals, this.matchTimePassed, this.awayTeam.name + " with a super fast counter attack... It's a corner.");
                    }
                    if (!this.homeTeam.hasKeeper() || (this.homeTeam.countHeaders() < this.awayTeam.countHeaders() && this.awayTeamCorners % 2 === 0)) {
                        this.awayTeamGoals++;
                        if (this.speed == 1) {
                            $.events.addEvent(this.homeTeam.name, this.homeTeamGoals, this.awayTeam.name, this.awayTeamGoals, this.matchTimePassed, "Met by a player on the first post and headed in via the crossbar! GOAL!");
                            this.timeout = this.timeoutCount;
                        }
//console.log("TA GOAL speedcornerAway");
                    }
                    else {
                        if (this.speed == 1) {
                            $.events.addEvent(this.homeTeam.name, this.homeTeamGoals, this.awayTeam.name, this.awayTeamGoals, this.matchTimePassed, "The keeper punches the ball away.");
                            this.timeout = this.timeoutCount;
                        }
                    }
                }

                if (this.matchState === 1 && event === "firstHalfEnds") {
                    if (this.speed == 1) {
                        $.events.addEvent(this.homeTeam.name, this.homeTeamGoals, this.awayTeam.name, this.awayTeamGoals, this.matchTimePassed, "First half ends");
                        this.timeout = this.timeoutCount;
                    }
                    this.matchState = 4;
                    this.matchTimePassed = 45;
                }
                if (event === "secondHalfEnds") {
                    if (this.speed == 1) {
                       $.events.addEvent(this.homeTeam.name, this.homeTeamGoals, this.awayTeam.name, this.awayTeamGoals, this.matchTimePassed, "The ref blows his whistle for full time.");
                        this.timeout = this.timeoutCount;
                    }
                    this.matchState = 6;
                    this.saveResult();
//console.log("TAPossession was " + this.possession);
//console.log("TA result: " + this.homeTeamGoals + "-" + this.awayTeamGoals);

                }
            }
        }
    }
};


$.Match.prototype.saveResult = function() {

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

    if (this.homeTeam.hasFastRunner() && !this.awayTeam.hasFastRunner()) {
        this.matchEvents['24'] = "speedChanceHome";
    }
    if (!this.homeTeam.hasFastRunner() && this.awayTeam.hasFastRunner()) {
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

