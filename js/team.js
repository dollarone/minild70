"use strict";

$.staticTeamId = 0;

$.Team = function() {
    this.color = 'rgba(3, 3, 3, 1)';
    var extra = 0;
    this.id = $.staticTeamId++;
    this.name = $.teamNames[this.id];

    this.players = [];
    this.playerCount = 0;

    this.keeper = [];
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

    this.points = 0;
    this.goalsFor = 0;
    this.goalsAgainst = 0;
    this.goalsDiff = 0;

    this.wins = 0;
    this.draws = 0;
    this.losses = 0;
    this.foo = "a";
};

$.Team.prototype.teamFull = function () {
    return (5 < this.keeperCount + this.defenderCount + this.midfielderCount + this.keeperCount);
};

$.Team.prototype.setKeeper = function (player) {
    if (this.keeperCount > 0) {
       //this.unsetPlayer(this.keeper[0]);
       this.setSub(this.keeper[0]);
    }


    this.unsetPlayer(player);

    var index = this.players.indexOf(player);
    if (index != -1) {
        this.keeper.push(player);
        this.keeperCount = 1;
        player.position = "Goalkeeper";
        this.updateSkills();
    }

};

$.Team.prototype.setPosById = function (id) {

    
    var pos = document.getElementById("pos_" + id).elements[0].value;
    //select.options[select.selectedIndex].getAttribute("lon");
    
    for (var i=0; i<this.playerCount; i++) {
        if (this.players[i].id === id) {
            if (pos === "Substitute") {
                this.subCount = this.setPlayerType(this.players[id], this.subs, this.subCount, "Substitute");
            }
            else if (pos === "Goalkeeper") {
                this.setKeeper(this.players[id]);
            }
            else if (pos === "Defender") {
                this.defenderCount = this.setPlayerType(this.players[id], this.defenders, this.defenderCount, "Defender");
            }
            else if (pos === "Midfielder") {
                this.midfielderCount = this.setPlayerType(this.players[id], this.midfielders, this.midfielderCount, "Midfielder");
            }
            else if (pos === "Striker") {
                this.strikerCount = this.setPlayerType(this.players[id], this.strikers, this.strikerCount, "Striker");
            }
            this.updateSkills();
            this.render();
        }
    }
};

$.Team.prototype.setDefender = function (player) {
    this.defenderCount = this.setPlayerType(player, this.defenders, this.defenderCount, "Defender");
    this.updateSkills();
};
$.Team.prototype.setMidfielder = function (player) {
    this.midfielderCount = this.setPlayerType(player, this.midfielders, this.midfielderCount, "Midfielder");
    this.updateSkills();

};
$.Team.prototype.setStriker = function (player) {
    this.strikerCount = this.setPlayerType(player, this.strikers, this.strikerCount, "Striker");
    this.updateSkills();

};
$.Team.prototype.setSub = function (player) {
    this.subCount = this.setPlayerType(player, this.subs, this.subCount, "Substitute");
    this.updateSkills();

};

$.Team.prototype.setPlayerType = function (player, playerTypeArray, playerTypeCount, pos) {

    if (pos != "Substitute" && this.teamFull()) {
        alert("Only 5 players allowed - put someone on the bench first");
        return playerTypeCount;
    }
    var index = this.players.indexOf(player);
    if (index != -1) {
        playerTypeArray.push(player);
        playerTypeCount++;
        player.position = pos;
    }
//    console.log("Set " + playerTypeCount + " " + this.midfielderCount + "/" + this.midfielders.length);
    return playerTypeCount;

};

$.Team.prototype.unsetPlayer = function (player) {
    if(this.keeperCount > 0 && this.keeper[0] === player) {
        this.keeper = [];
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

//    $.Draw.fillText("KeeperSkill: " + this.totalKeeperSkill + "\nDefenceSkill: " + this.totalDefenderSkill + "\nMidfieldSkill: " 
  //      + this.totalMidfielderSkill + "\nStrikerSkill: " + this.totalStrikerSkill, x, y, "30px Arial");

    var buffer = "<table>";
    buffer += "<tr style='text-align: right; color: " + $.colors["purple"] + ";'>"  + "<td style='text-align: left;'>Name" +
        "</td><td>Goalkeeping</td><td>Defence</td><td>Midfield</td><td>Attack</td><td>Position</td></tr>";

    var keys = Object.keys(this.players);
    keys.forEach(function(key) {
        var player = this.players[key];
        buffer += "<tr style='text-align: right; color: " + $.colors["purple"] + ";'>"  + "<td style='text-align: left;'>" +
        player.name + "</td><td>" + player.keeper + "</td><td>" + player.defence + "</td><td>" + player.midfield + "</td><td>" + 
        player.attack + "</td><td>" + player.position + "</td><td>" + this.displayForm(player) +
        "</td></tr>";
    }, this);

    buffer += "</table>";
    document.getElementById('team').innerHTML = buffer + this.foo;
    this.foo += "a";
    

};


$.Team.prototype.displayForm = function (player) {
    var isSub = (player.position === "Substitute") ? "selected" : "";
    var isGoalkeeper = (player.position === "Goalkeeper") ? "selected" : "";
    var isDefender = (player.position === "Defender") ? "selected" : "";
    var isMidfielder = (player.position === "Midfielder") ? "selected" : "";
    var isStriker = (player.position === "Striker") ? "selected" : "";

    return '<form id="pos_' + player.id + '" onSubmit="return false;">' +
        '<select id="select_' + player.id + '" onchange="$.team1.setPosById(' + player.id + ');">' +
    '<option ' + isSub + ' position="Substitute">Substitute</option>' +
    '<option ' + isGoalkeeper + ' position="Goalkeeper">Goalkeeper</option>' +
    '<option ' + isDefender + ' position="Defender">Defender</option>' +
    '<option ' + isMidfielder + ' position="Midfielder">Midfielder</option>' +
    '<option ' + isStriker + ' position="Striker">Striker</option>' +
    '</select></form><script>function onChange(select, form) {' +
    'var pos = select.options[select.selectedIndex].getAttribute("lon");' +
    'form.elements["position"].value = pos;' +
    'this.setDefender(player); this.render(); };</script>';

};
$.Team.prototype.update = function () {

};

