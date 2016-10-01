"use strict";

$.staticTeamId = 0;

$.Team = function() {
    this.my = true;
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
    this.totalWage = 0;

    this.freekickTaker = null;

    this.points = 0;
    this.goalsFor = 0;
    this.goalsAgainst = 0;
    this.goalsDiff = 0;

    this.wins = 0;
    this.draws = 0;
    this.losses = 0;
    this.foo = this.keeperCount + this.defenderCount + this.midfielderCount + this.strikerCount;
};

$.Team.prototype.teamFull = function () {
    return (5 <= this.keeperCount + this.defenderCount + this.midfielderCount + this.strikerCount);
};

$.Team.prototype.setKeeper = function (player) {
    if (!this.my) {
        return;
    }
    if (this.keeperCount > 0) {
       //this.unsetPlayer(this.keeper[0]);
       this.setSub(this.keeper[0]);
       this.keeper = [];
       this.keeperCount = 0;
    }


//    this.unsetPlayer(player);

    var index = this.players.indexOf(player);
    if (index != -1) {
        this.keeper.push(player);
        this.keeperCount = 1;
        player.position = "Goalkeeper";
        this.updateSkills();
    }

};

$.Team.prototype.setPosById = function (id) {
    if (!this.my) {
        return;
    }
//    var pos = document.getElementById("pos_" + id).elements[0].value;

    var yourSelect = document.getElementById( "select_" + id);
    var pos = yourSelect.options[ yourSelect.selectedIndex ].value;
//elements[0].value;
    //select.options[select.selectedIndex].getAttribute("lon");

    this.unsetPlayer(this.players[id]);
    
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
$.Team.prototype.setFreekicktaker = function (player) {
    if (!this.my) {
        return;
    }
    for (var i=0; i<this.playerCount; i++) {
        if (this.players[i].id === player.id) {
            this.freekickTaker = player;
        }
    }
};


$.Team.prototype.hasKeeper = function() {
    return this.keeperCount == 1;

};
$.Team.prototype.setDefender = function (player) {
    if (!this.my) {
        return;
    }
    this.defenderCount = this.setPlayerType(player, this.defenders, this.defenderCount, "Defender");
    this.updateSkills();
};
$.Team.prototype.setMidfielder = function (player) {
    if (!this.my) {
        return;
    }
    this.midfielderCount = this.setPlayerType(player, this.midfielders, this.midfielderCount, "Midfielder");
    this.updateSkills();

};
$.Team.prototype.setStriker = function (player) {
    if (!this.my) {
        return;
    }
    this.strikerCount = this.setPlayerType(player, this.strikers, this.strikerCount, "Striker");
    this.updateSkills();
};
$.Team.prototype.setSub = function (player) {
    if (!this.my) {
        return;
    }
    this.subCount = this.setPlayerType(player, this.subs, this.subCount, "Substitute");
    this.updateSkills();

};

$.Team.prototype.setPlayerType = function (player, playerTypeArray, playerTypeCount, pos) {
    if (!this.my) {
        return;
    }

    if (player.position == "Substitute" && pos != "Substitute" && this.teamFull()) {
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
    if (!this.my) {
        return;
    }
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
//    console.log("adding " + player.id + " " + player.attack);
    this.updateSkills();

};
$.Team.prototype.removePlayer = function (player) {
    //var index = this.players.find(x => x.id === player.id);
    var index = this.players.indexOf(player);
    if (index != -1) {
        this.unsetPlayer(player);
        this.players.splice(index, 1);
        this.playerCount--;
        console.log("removing " + player.id);
    }
};

$.Team.prototype.updateSkills = function () {
    this.totalWage = 0;
    if (this.keeperCount > 0) {
        this.totalKeeperSkill = this.keeper[0].keeper;
        this.totalWage += parseInt(this.keeper[0].wage);
    }
    this.totalDefenderSkill = 0;
    for (var i=0; i<this.defenderCount; i++) {
        this.totalDefenderSkill += this.defenders[i].defence;
        this.totalWage += parseInt(this.defenders[i].wage);
    }       
    this.totalMidfielderSkill = 0;
    for (var i=0; i<this.midfielderCount; i++) {
        this.totalMidfielderSkill += this.midfielders[i].midfield;
        this.totalWage += parseInt(this.midfielders[i].wage);
    }
    this.totalStrikerSkill = 0;
    for (var i=0; i<this.strikerCount; i++) {
        this.totalStrikerSkill += this.strikers[i].attack;
        this.totalWage += parseInt(this.strikers[i].wage);
    }
    for (var i=0; i<this.subCount; i++) {
        this.totalWage += parseInt(this.subs[i].wage);
    }
};

$.Team.prototype.setMy = function (my) {
    this.my = my;
};

$.Team.prototype.hasTackler = function () {
    var keys = Object.keys(this.players);
    keys.forEach(function(key) {
        var player = this.players[key];
        if (player.position === "Defender" && player.trait === "Great tackler") {
            console.log("TA has Great tackler" + player.name);
            return true;
        }
    }, this);
    return false;
};


$.Team.prototype.hasFastRunner = function () {
    var keys = Object.keys(this.players);
    keys.forEach(function(key) {
        var player = this.players[key];
        if (player.position != "Substitute" && player.position != "Goalkeeper" && player.trait === "Fast runner") {
            console.log("hasfastTA" + player.name);
            return true;
        }
    }, this);
    return false;
};

$.Team.prototype.hasFastRunnerAtt = function () {
    var keys = Object.keys(this.players);
    keys.forEach(function(key) {
        var player = this.players[key];
        if (player.position != "Substitute" && player.position != "Goalkeeper" 
            && player.position != "Defender" && player.trait === "Fast runner") {
            console.log("hasfastattTA" + player.name);
            return true;
        }
    }, this);
    return false;
};

$.Team.prototype.countHeaders = function () {
    var headers = 0;
    var keys = Object.keys(this.players);
    keys.forEach(function(key) {
        var player = this.players[key];
        if (player.position != "Substitute" && player.position != "Goalkeeper" && player.trait === "Excellent header") {
            headers++;
        }
    }, this);
    console.log("TAhas headers= " + headers);
    return headers;
};

$.Team.prototype.countDribblers = function () {
    var dribblers = 0;
    var keys = Object.keys(this.players);
    keys.forEach(function(key) {
        var player = this.players[key];
        if (player.position != "Substitute" && player.position != "Goalkeeper" 
            && player.position != "Defender" && player.trait === "Amazing dribbler") {
            dribblers++;
        }
    }, this);
    console.log("TAhas dribblers= " + dribblers);
    return dribblers;
};

$.Team.prototype.generateTeamTable = function () {

    var buffer = "<h2>" + this.name + "</h2><br /><table>";

    buffer += "<tr style='text-align: right; color: " + $.colors["skyblue"] + ";'>"  + "<td /><td style='text-align: left;'>Name" +
        "</td><td>Age</td><td>Goalkeeping</td><td>Defence</td><td>Midfield</td><td>Attack</td><td>Trait</td><td>Wage</td><td>Position</td></tr>";

    var keys = Object.keys(this.players);
    keys.forEach(function(key) {
        var player = this.players[key];
        buffer += "<tr style='text-align: right; color: " + $.colors["cloudblue"] + ";'>" ;
        buffer += '<td><div class="img-container">' +
            '<img class="top z8" src="img/10bighair1.png" alt="">';
        if (player.id % 3 == 0) {
            buffer += '<img class="top z7" src="img/20happymouth.png" alt="">';
        }
        else {
            buffer += '<img class="top z7" src="img/20sourmouth.png" alt="">';

        }
        buffer += '<img class="top z6" src="img/30twodaybeard.png" alt="">' +
            '<img class="top z5" src="img/40smallpupils.png" alt="">' +
            '<img class="top z4" src="img/50smalleyes.png" alt="">' +
            '<img class="top z3" src="img/70nose1.png" alt="">';
        if (player.id % 2 == 0) {
            buffer += '<img class="top z2" src="img/80bigface.png" alt="">';
        }
        else {
            buffer += '<img class="top z2" src="img/81bigface2.png" alt="">';
        }
        buffer += '<img class="top z1" src="img/91redshirt.png" alt="">' +
            '<img class="bot" src="img/99background.png" alt="">' +
            '</div></td>';
        buffer += "<td style='text-align: left;'>" +
            player.name + "</td><td>" + player.age + "</td><td>" + player.keeper + "</td><td>" + player.defence + "</td><td>" + 
            player.midfield + "</td><td>" + player.attack + "</td><td>" + player.trait + "</td><td>" + player.wage + " p/w</td><td>";
        if (this.my) {
            buffer += this.displayForm(player);
        }
        else {
            buffer += player.position;
        }
        buffer += "</td></tr>";
    }, this);

    buffer += "</table>";
    buffer += "Totals: <table><tr><td>Goalkeeping</td><td>Defence</td><td>Midfield</td><td>Attack</td><td>Total Wage</td><tr>";
    buffer += "<tr><td>" + this.totalKeeperSkill + "</td><td>" + this.totalDefenderSkill + "</td><td>" +
        this.totalMidfielderSkill + "</td><td>" + this.totalStrikerSkill + "</td><td>" + this.totalWage + " per week</td></tr>";

    return buffer;
//    document.getElementById('team').innerHTML = buffer;
};

$.Team.prototype.render = function (x, y) {
    document.getElementById('team').innerHTML = this.generateTeamTable();  
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
    '</select></form>';
/*
    </form><script>function onChange(select, form) {' +
    'var pos = select.options[select.selectedIndex].getAttribute("lon");' +
    'form.elements["position"].value = pos;' +
    'this.setDefender(player); this.render(); };</script>';
*/
};
$.Team.prototype.update = function () {

};

