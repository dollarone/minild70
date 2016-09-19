"use strict";

$.Team = function() {
    this.color = 'rgba(3, 3, 3, 1)';
    var extra = 0;

    this.players = [];
    this.playerCount = 0;

    this.keeper = null;
    this.keeperCount = 0;
    this.defenders = [];
    this.defenderCount = 0;
    this.midfielders = [];
    this.midfielderCount = 0;
    this.strikers = [];
    this.strikerCount = 0;
    this.subs = [];
    this.subCount = 0;
    this.totalKeeperSkill = 0;
    this.totalDefenderSkill = 0;
    this.totalMidfielderSkill = 0;
    this.totalStrikerSkill = 0;
};


$.Team.prototype.addPlayer = function (player) {
    this.players.push(player.id, player);
    this.playerCount++;
    console.log("adding " + player.id + " " + player.attack);
    this.updateSkills();

};
$.Team.prototype.removePlayer = function (player) {
    var index = this.players.indexOf(player.id);
    if (index != -1) {
        this.players.splice(index, 1);
        this.playerCount--;
        console.log("removing " + player.id);
        this.updateSkills();
    }
};

$.Team.prototype.updateSkills = function () {

    if (this.keeperCount > 0) {
        this.totalKeeperSkill = this.keeper.keeper;
    }
    for (var i=0; i<this.defenderCount; i++) {
        this.totalDefenderSkill += this.defenders[i];
    }       
    for (var i=0; i<this.midfielderCount; i++) {
        this.totalMidfielderSkill += this.midfielders[i];
    }
    for (var i=0; i<this.strikerCount; i++) {
        this.totalStrikerSkill += this.strikers[i];
    }


    for (var i=0; i<this.playerCount; i++) {
        this.totalStrikerSkill = parseInt(this.players[i]["attack"]);
        console.log(JSON.stringify(this.players[i]));
        console.log(JSON.stringify(this.players[i].attack));
    }
};


$.Team.prototype.render = function (x, y) {

    $.Draw.fillText("KeeperSkill: " + this.totalKeeperSkill + "\nDefenceSkill: " + this.totalDefenderSkill + "\nMidfieldSkill: " 
        + this.totalMidfielderSkill + "\nStrikerSkill: " + this.totalStrikerSkill, x, y, "30px Arial");
    

};


$.Team.prototype.update = function () {

};

