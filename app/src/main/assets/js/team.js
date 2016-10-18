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
    this.maxWage = 5000;

    this.freekickTaker = -1;

    this.points = 0;
    this.goalsFor = 0;
    this.goalsAgainst = 0;
    this.goalsDiff = 0;

    this.wins = 0;
    this.draws = 0;
    this.losses = 0;
    this.shirt = this.id;
    this.gkshirt = (this.id % 4) + 8;
};

$.Team.prototype.teamFull = function () {
    return (this.keeperCount + this.defenderCount + this.midfielderCount + this.strikerCount >= 5);
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
            this.unsetPlayer(this.players[i]);
            if (pos === "Substitute") {
                this.subCount = this.setPlayerType(this.players[i], this.subs, this.subCount, "Substitute");
            }
            else if (pos === "Goalkeeper") {
                this.setKeeper(this.players[i]);
            }
            else if (pos === "Defender") {
                this.defenderCount = this.setPlayerType(this.players[i], this.defenders, this.defenderCount, "Defender");
            }
            else if (pos === "Midfielder") {
                this.midfielderCount = this.setPlayerType(this.players[i], this.midfielders, this.midfielderCount, "Midfielder");
            }
            else if (pos === "Striker") {
                this.strikerCount = this.setPlayerType(this.players[i], this.strikers, this.strikerCount, "Striker");
            }
        }
    }
    this.updateSkills();
    this.render();
};
$.Team.prototype.setFreekicktaker = function (player) {
    if (!this.my) {
        return;
    }
    for (var i=0; i<this.playerCount; i++) {
        if (this.players[i].id === player.id) {
            this.freekickTaker = player.id;
        }
    }
};

$.Team.prototype.setFreekicktakerById = function (id) {
    if (!this.my) {
        return;
    }
    for (var i=0; i<this.playerCount; i++) {
        if (this.players[i].id === id) {
            this.freekickTaker = this.players[i].id;
        }
    }
    this.render();
};

$.Team.prototype.getFreekickTaker = function (player) {
    for (var i=0; i<this.playerCount; i++) {
        if (this.players[i].id === this.freekickTaker) {
            return this.players[i];
        }
    }
};

$.Team.prototype.assignDefaultFreekickTaker = function (player) {
    for (var i=0; i<this.playerCount; i++) {
        if (this.players[i].position != "Substitute") {
            this.freekickTaker = this.players[i].id;
        }
    }

};


$.Team.prototype.hasKeeper = function() {
    return this.keeperCount === 1;

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

    if (player.position === "Substitute" && pos != "Substitute" && this.teamFull()) {
        document.getElementById('error').innerHTML = "<div style='color: " + $.colors["red"] + "';>Only 5 players allowed - make someone a Substitute first!</div>";
        return playerTypeCount;
    }
    else {
        document.getElementById('error').innerHTML = "";
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

$.Team.prototype.addPlayerById = function (id) {
    for (var i=0; i < $.current_player; i++ ) {
        if ($.players[i].id === id) {
            this.players.push($.players[i]);
            this.playerCount++;
//    console.log("adding " + player.id + " " + player.attack);
            this.setSub($.players[i]);
            this.updateSkills();
        }
    }
    this.render();
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
        //console.log("removing " + player.id);
    }
};

$.Team.prototype.releasePlayer = function (id) {
    if (!this.my) {
        return;
    }
    var playerToBeRemoved = null;
    var keys = Object.keys(this.players);
    keys.forEach(function(key) {
        var player = this.players[key];
        if (player.id === id) {
            playerToBeRemoved = player;
        }
    }, this);
    if (playerToBeRemoved != null) {
        this.removePlayer(playerToBeRemoved); 
        $.transfer.addPlayer(playerToBeRemoved);
        this.render();
        $.transfer.render();
    }

};

$.Team.prototype.updateSkills = function () {
    this.totalWage = 0;
    if (this.keeperCount > 0) {
        this.totalKeeperSkill = this.keeper[0].keeper;
        this.totalWage += parseInt(this.keeper[0].wage);
    }
    this.totalDefenderSkill = 0;
    this.totalMidfielderSkill = 0;
    this.totalStrikerSkill = 0;

    for (var i=0; i<this.defenderCount; i++) {
        this.totalDefenderSkill += this.defenders[i].defence;
        this.totalMidfielderSkill += this.defenders[i].midfield;
        this.totalStrikerSkill += this.defenders[i].attack;
        this.totalWage += parseInt(this.defenders[i].wage);
    }       
    for (var i=0; i<this.midfielderCount; i++) {
        this.totalDefenderSkill += this.midfielders[i].defence;
        this.totalMidfielderSkill += this.midfielders[i].midfield;
        this.totalStrikerSkill += this.midfielders[i].attack;
        this.totalWage += parseInt(this.midfielders[i].wage);
    }
    for (var i=0; i<this.strikerCount; i++) {
        this.totalDefenderSkill += this.strikers[i].defence;
        this.totalMidfielderSkill += this.strikers[i].midfield
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
    var ret = false;
    var keys = Object.keys(this.players);
    keys.forEach(function(key) {
        var player = this.players[key];
        if (player.position === "Defender" && player.trait === "Great tackler") {
            //console.log("TA has Great tackler" + player.name);
            ret = true;
        }
    }, this);
    return ret;
};


$.Team.prototype.hasFastRunner = function () {
    var ret = false;
    var keys = Object.keys(this.players);
    keys.forEach(function(key) {
        var player = this.players[key];
        if (player.position != "Substitute" && player.position != "Goalkeeper" 
            && player.trait === "Fast runner") {
            ret = true;
        }
    }, this);
    return ret;
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
    //console.log("TAhas headers= " + headers);
    return headers;
};

$.Team.prototype.countDribblers = function () {
    var dribblers = 0;
    var keys = Object.keys(this.players);
    keys.forEach(function(key) {
        var player = this.players[key];
        if (player.position != "Substitute" && player.position != "Goalkeeper" 
            && player.trait === "Amazing dribbler") {
            dribblers++;
        }
    }, this);
    //console.log("TAhas dribblers= " + dribblers);
    return dribblers;
};

$.Team.prototype.renameTeam = function (newname) {
    if (this.my) {
        this.name = newname;
        this.render();
        $.season.renderTable();
    }
};

$.Team.prototype.setShirt = function (shirt) {
    if (this.my) {
        this.shirt = shirt;
        this.render();
    }
};

$.Team.prototype.setGkshirt = function (gkshirt) {
    if (this.my) {
        this.gkshirt = gkshirt;
        this.render();
    }
};

$.Team.prototype.generateTeamTable = function () {

    var buffer = "<h2>" + this.name + "</h2><br /><table>";

    buffer += "<tr style='text-align: right; color: " + $.colors["skyblue"] + ";'>"  + "<td /><td style='text-align: left;'>Name" +
        "</td><td>Age</td><td>Goalkeeping</td><td>Defence</td><td>Midfield</td><td>Attack</td><td>Trait</td><td>Wage</td><td>Freekick taker</td><td>Position</td><td></td></tr>";

    this.totalWage = 0;
    var keys = Object.keys(this.players);
    keys.forEach(function(key) {
        var player = this.players[key];
        var face = player.offset % 5;
        // 1==small
        // ?==pondus face
        buffer += "<tr style='text-align: right; color: " + $.colors["cloudblue"] + ";'>" ;
        buffer += '<td><div class="img-container">' +
            '<img class="top z8 y' + (player.offset-1) % 7 + '" src="img/hair.png" alt="">';
        
        buffer += '<img class="top z7 y';

        var beard = (player.offset + player.defence) % 5;

        if (face === 1) {
            buffer += player.offset % 4;
            if (beard != 2) {
                beard = 3;
            }
        }
        else if (face === 0 || face === 2) {
            var mouth = player.offset % 6;
            if (mouth === 5) {
                if (beard != 3) {
                    beard = 3;
                }
            }
            buffer += mouth;

        }
        else {
            buffer += player.offset % 4;
            if (beard === 0 || beard === 2) {
                beard = 1;
            }
        }
        buffer += '" src="img/mouths.png" alt="">';

        var eye = (((player.offset + player.id) % 6) * 2) + 1
        
        if (eye === 11) {
            buffer += '<img class="top z6 y' + player.offset % 5 + '" src="img/noses.png" alt="">';
        }
        else {
            buffer += '<img class="top z6 y' + player.offset % 4 + '" src="img/noses.png" alt="">';
        }

        if (player.offset-player.id > 7 && player.id % 2 === 3) {//} && player.id % 3 == 0) {
            buffer += '<img class="top z4 y13" src="img/eyespupils.png" alt="">';
            
        }
        else if (face != 1 && player.id % 47 === 0) {
            buffer += '<img class="top z4 y0" src="img/eyespupils.png" alt="">';
        }
        else {
            buffer += '<img class="top z5 y' + (eye + 1) + '" src="img/eyespupils.png" alt="">';
            buffer += '<img class="top z4 y' + eye + '" src="img/eyespupils.png" alt="">';
        }

        buffer += '<img class="top z3 y' + beard + '" src="img/beards.png" alt="">';
        // +           '<img class="top z3" src="img/70nose1.png" alt="">';

        
        buffer += '<img class="top z2 y' + player.offset % 5 + '" src="img/faces.png" alt="">';
        
        buffer += '<img class="top z1';
        if (player.position == "Goalkeeper") {
            buffer += ' y' + this.gkshirt;
        }
        else {
            buffer += ' y' + this.shirt;
        }
        buffer += '" src="img/sprites.png" alt="">';

        if (player.offset % 7 === 6 ) {
            if(face === 2 || face === 1) {
                buffer += '<img class="top z0 y' + ((player.offset % 3)+1) + '" src="img/bighair.png" alt="">';
            }
            else {
                buffer += '<img class="top z0 y' + player.offset % 4 + '" src="img/bighair.png" alt="">';                
            }
        }

        buffer += '<img class="bot" src="img/99background.png" alt="">' +
            '</div></td>';
        buffer += "<td style='text-align: left;'>" +
            player.name + "</td><td>" + player.age + "</td><td>" + player.keeper + "</td><td>" + player.defence + "</td><td>" + 
            player.midfield + "</td><td>" + player.attack + "</td><td>" + player.trait + "</td><td>£" + player.wage + " p/w</td><td>";

        if (this.my) {
            if (this.freekickTaker === player.id) {
                buffer += "Freekick taker";
            }
            else if (player.position != "Substitute" && $.season.getMatchdaysPlayed() === 0) {
                buffer += '<button onclick="$.team8.setFreekicktakerById(' + player.id + ');">Assign</button>';
            }
            
        }
        else {
            if (this.freekickTaker === player.id) {
                buffer += "Freekick taker";
            }

        }

        buffer += "</td><td>";

        if (this.my && $.season.getMatchdaysPlayed() === 0) {
            buffer += this.displayForm(player);
            buffer += "</td><td>";
            buffer += '<button onclick="$.team8.releasePlayer(' + player.id + ');">Release player</button>';

            buffer += "</td></tr>";
        }
        else {
            buffer += player.position;
            buffer += "</td><td /></tr>";
        }
        this.totalWage += player.wage;
    }, this);

    buffer += "</table>";
    buffer += "Totals: <table><tr><td>Goalkeeping</td><td>Defence</td><td>Midfield</td><td>Attack</td><td>Total Wage</td>";
    if (this.my) {
        buffer += "<td>Max Total Wage</td>";
    }
    buffer += "</tr>";
    buffer += "<tr><td>" + this.totalKeeperSkill + "</td><td>" + this.totalDefenderSkill + "</td><td>" +
        this.totalMidfielderSkill + "</td><td>" + this.totalStrikerSkill + "</td>";
    if (this.my && this.totalWage > this.maxWage) {
        buffer += "<td style='text-align: right; color: " + $.colors["red"] + "';>";
    }
    else {
        buffer += "<td>";
    }

    //if (this.totalWage >= 1000) {
       // this.totalwage = this.totalwage/1000 + "," + this.totalwage-(Math.floor(this.totalwage/1000)*1000);
    //}
    buffer += "£" + this.totalWage + " per week</td>";
    
    if (this.my) {
        buffer += "<td>£" + this.maxWage + " per week</td>";
    }
    buffer += "</tr>";

    return buffer;
//    document.getElementById('team').innerHTML = buffer;
};

$.Team.prototype.render = function () {
    document.getElementById('team').innerHTML = this.generateTeamTable();  
};


$.Team.prototype.displayForm = function (player) {
    var isSub = (player.position === "Substitute") ? "selected" : "";
    var isGoalkeeper = (player.position === "Goalkeeper") ? "selected" : "";
    var isDefender = (player.position === "Defender") ? "selected" : "";
    var isMidfielder = (player.position === "Midfielder") ? "selected" : "";
    var isStriker = (player.position === "Striker") ? "selected" : "";

    return '<form id="pos_' + player.id + '" onSubmit="return false;">' +
        '<select id="select_' + player.id + '" onchange="$.team8.setPosById(' + player.id + ');">' +
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

