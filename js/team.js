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

$.Team.prototype.teamFull = function () {
    return (5 < this.keeperCount + this.defenderCount + this.midfielderCount + this.keeperCount);
};

$.Team.prototype.setKeeper = function (player) {
    if (this.keeperCount > 0) {
       this.unsetPlayer(this.keeper);
    }

    this.unsetPlayer(player);

    if (this.teamFull()) {
        alert("team is full yo");
        return;
    }
    var index = this.players.indexOf(player);
    if (index != -1) {
        this.keeper = player;
        this.keeperCount = 1;
        this.updateSkills();
    }

};

$.Team.prototype.setDefender = function (player) {
    this.defenderCount = this.setPlayerType(player, this.defenders, this.defenderCount);
    this.updateSkills();
};
$.Team.prototype.setMidfielder = function (player) {
    this.midfielderCount = this.setPlayerType(player, this.midfielders, this.midfielderCount);
    this.updateSkills();

};
$.Team.prototype.setStriker = function (player) {
    this.strikerCount = this.setPlayerType(player, this.strikers, this.strikerCount);
    this.updateSkills();

};
$.Team.prototype.setSub = function (player) {
    this.subCount = this.setPlayerType(player, this.subs, this.subCount);
    this.updateSkills();

};

$.Team.prototype.setPlayerType = function (player, playerTypeArray, playerTypeCount) {

    if (this.teamFull()) {
        alert("team is full yo");
        return;
    }
    var index = this.players.indexOf(player);
    if (index != -1) {
        playerTypeArray.push(player);
        playerTypeCount++;
    }
    console.log("Set " + playerTypeCount + " " + this.midfielderCount + "/" + this.midfielders.length);
    return playerTypeCount;

};

$.Team.prototype.unsetPlayer = function (player) {
    if(this.keeperCount > 0 && this.keeper === player) {
        this.keeper = null;
        this.keeperCount = 0;
    }

    var index = this.defenders.indexOf(player);
    if (index != -1){ 
        this.defenders.splice(index, 1);
        this.defenderCount--;
    };
    var index = this.midfielders.indexOf(player);
    if (index != -1){ 
        this.midfielders.splice(index, 1);
        this.midfielderCount--;
    };
    var index = this.strikers.indexOf(player);
    if (index != -1){ 
        this.strikers.splice(index, 1);
        this.strikerCount--;
    };

    this.updateSkills();
};

$.Team.prototype.addPlayer = function (player) {
    this.players.push(player);
    this.playerCount++;
    console.log("adding " + player.id + " " + player.attack);
    this.updateSkills();

};
$.Team.prototype.removePlayer = function (player) {
    //var index = this.players.find(x => x.id === player.id);
    var index = this.players.indexOf(player);
    if (index != -1) {
        this.players.splice(index, 1);
        this.playerCount--;
        console.log("removing " + player.id);
        this.unsetPlayer(player);
    }
};

$.Team.prototype.updateSkills = function () {

    if (this.keeperCount > 0) {
        this.totalKeeperSkill = this.keeper.keeper;
    }
    this.totalDefenderSkill = 0;
    for (var i=0; i<this.defenderCount; i++) {
        this.totalDefenderSkill += this.defenders[i].defence;
    }       
    this.totalMidfielderSkill = 0;
    for (var i=0; i<this.midfielderCount; i++) {
        this.totalMidfielderSkill += this.midfielders[i].midfield;
    }
    this.totalStrikerSkill = 0;
    for (var i=0; i<this.strikerCount; i++) {
        this.totalStrikerSkill += this.strikers[i].attack;
    }
};


$.Team.prototype.render = function (x, y) {

    $.Draw.fillText("KeeperSkill: " + this.totalKeeperSkill + "\nDefenceSkill: " + this.totalDefenderSkill + "\nMidfieldSkill: " 
        + this.totalMidfielderSkill + "\nStrikerSkill: " + this.totalStrikerSkill, x, y, "30px Arial");
    

};


$.Team.prototype.update = function () {

};

