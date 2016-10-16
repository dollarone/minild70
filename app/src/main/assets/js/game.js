"use strict";

var $ = {};

$.version = "midfield challenge v2"

$.width = 800;
$.height = 500;

$.playerLastNames = {
    0:"Singh", 
    1:"Bernson",
    2:"Larsen", 
    3:"Johnson",
    4:"Smith", 
    5:"Welberg",
    6:"Cornwall", 
    7:"White",
    8:"Berg", 
    9:"Larsson",
    10:"Grant", 
    11:"McArthur",
    12:"Green", 
    13:"McLintock",
    14:"Groves", 
    15:"Dyer",
    16:"Taylor", 
    17:"Williams",
    18:"Bradley", 
    19:"Higgins",
    20:"Hansen", 
    21:"Jones",
    22:"Brown", 
    23:"Kolle",
    24:"Davies", 
    25:"Evans",
    26:"Wilson", 
    27:"Wood",
    28:"Lewis", 
    29:"Roberts",
    30:"Green",
    31: "Martin",
    32: "Cooper",
    33: "Graham",
    34: "Stewart",
    35: "Wilkinson",
    36: "George",
    37: "Wells",
    38: "Chambers",
    39: "Atkinson",
    40: "Patel",
    41: "Campbell",
    42: "Allen",
    43: "Anderson",
    44: "James",
    45: "Lee",
    46: "King",
    47: "Hughes",
    48: "Leonardsen",
    49: "Scott",
    50: "Ward",
    51: "Hamilton",
    52: "Andrews",
    53: "Barnes",
    54: "Cole",
    55: "Bergkamp",
    56: "Ross",
    56: "Owen",
    57: "Knight",
    58: "Khan",
    59: "Hunt",
    60: "Carlos",
    61: "Gordon",
    62: "Gibson",
    63: "Armstrong",
    64: "Ali",
    65: "Poole",
    66: "Cox",
    67: "McConnelly",
    68: "Harrison",
    69: "Parker",
    70: "Lane",
    71: "Hamm",
    72: "Gray",
    73: "Bender",
    74: "Cain",
    75: "Brunner",
    76: "Miller",
    77: "Hill",
    78: "Jackson"
};

$.playerFirstNames = {
    0:"Sadiq", 
    1:"John",
    2:"Frank", 
    3:"David",
    4:"Peter", 
    5:"Jack",
    6:"Carl", 
    7:"Alex",
    8:"Gunnar", 
    9:"Patrick",
    10:"Ben", 
    11:"Freddy",
    12:"Martin", 
    13:"Daniel",
    14:"Tom", 
    15:"Adam",
    16:"Sam ", 
    17:"Ryan",
    18:"Liam", 
    19:"Alf",
    20:"Connor", 
    21:"Harry",
    22:"Luke", 
    23:"Axel",
    24:"Albert", 
    25:"George",
    26:"William", 
    27:"Bob",
    28:"Christian", 
    29:"Jamie",
    30:"Jordan",
    31: "Joshua",
    32: "Oliver",
    33: "Henry",
    34: "Dan",
    35: "Matt",
    36: "Thomas",
    37: "Ethan",
    38: "Michael",
    39: "Charlie",
    40: "Raj",
    41: "Joe",
    42: "Sean",
    43: "Steven",
    44: "Mark",
    45: "Callum",
    46: "Nathan",
    47: "Owen",
    48: "Oyvind",
    49: "Toby",
    50: "Mike",
    51: "Jonathan",
    52: "Edward",
    53: "Kyle",
    54: "Tony",
    55: "Bradley",
    56: "Jay",
    57: "Zack",
    58: "Asif",
    59: "Nick",
    60: "Robert",
    61: "Lars",
    62: "Isaac",
    63: "Dennis"
};

$.teamNames = {
    0:"Woolwich Gunners",
    1:"AC Inter", 
    2:"Tigers FC",
    3:"Athletico Real",
    4:"Bargelona FC",
    5:"London Inc.", 
    6:"Celtic Rangers",
    7:"Sherwood Forest"
};

$.colors = {
    black: 'rgba(0, 0, 0, 1)',
    gray: 'rgba(157, 157, 157, 1)',
    white: 'rgba(255, 255, 255, 1)',
    red: 'rgba(190, 38, 51, 1)',
    pink: 'rgba(295, 99, 247, 1)',
    purple: 'rgba(91, 0, 110, 1)',
    darkbrown: 'rgba(73, 60, 43, 1)',
    brown: 'rgba(164, 100, 34, 1)',
    yellow: 'rgba(247, 226, 107, 1)',
    darkgreen: 'rgba(47, 72, 78, 1)',
    green: 'rgba(88, 167, 46, 1)',
    slimegreen: 'rgba(163, 206, 39, 1)',
    nightblue: 'rgba(27, 38, 50, 1)',
    seablue: 'rgba(0, 87, 132, 1)',
    skyblue: 'rgba(49, 162, 242, 1)',
    cloudblue: 'rgba(178, 220, 239, 1)',

};

$.red = 'rgba(190, 38, 51, 1)';
$.black = 'rgba(0, 0, 0, 1)';
$.gray ='rgba(157, 157, 157, 1)';

$.timer = 0;

$.timeout = 100;

$.entities = [];

$.stop = false;
$.current_player = 0;

var dt = 0;
var controls = { left: false, right: false, jump: false };

$.init = function () {
    /*
    $.canvas = document.getElementsByTagName('canvas')[0];
    $.canvas.width = $.width;
    $.canvas.height = $.height;
    $.ctx = $.canvas.getContext('2d');
*/
    $.players = [];
    
    $.generateRandomObjects();

    $.loop();
};



$.sloop = function () {
    $.render();
    $.update();

//    window.requestAnimFrame($.loop);
    $.loop();
};

$.loop = function () {

    var FPS = 30;
    setInterval(function() {
      $.render();
      $.update();
      //draw();
    }, 1000/FPS);
};
$.generateRandomObjects = function () {
    $.entities = [];
    $.team1 = $.generateTeam1();
    $.team2 = $.generateTeam2();
    $.team3 = $.generateTeam3();
    $.team4 = $.generateTeam4();
    $.team5 = $.generateTeam5();
    $.team6 = $.generateTeam6();
    $.team7 = $.generateTeam7();
    $.team8 = $.generateTeam8();
    
    $.team1.setMy(false);
    $.team2.setMy(false);
    $.team3.setMy(false);
    $.team4.setMy(false);
    $.team5.setMy(false);
    $.team6.setMy(false);
    $.team7.setMy(false);

    $.events = new $.Event();
   // $.match = new $.Match($.team1, $.team2, false);
/*
    $.table = new $.Table(6);
    $.table.addTeam($.team1);
    $.table.addTeam($.team2);
    $.table.addTeam($.team3);
    $.table.addTeam($.team4);
    $.table.addTeam($.team5);
    $.table.addTeam($.team6);
    $.table.addTeam($.team7);
    $.table.addTeam($.team8);
    $.table.updateTable();
*/
    $.season = new $.Season(4);
    $.season.addTeam($.team1);
    $.season.addTeam($.team2);
    $.season.addTeam($.team3);
    $.season.addTeam($.team8);

//    $.season.addTeam($.team5);
 //   $.season.addTeam($.team6);
  //  $.season.addTeam($.team7);
   // $.season.addTeam($.team8);
    $.season.generateMatches();
    
    $.team8.render();

    $.addPlayNextMatchButton();
    $.addPlaySeasonButton();

  //  $.table.updateTable();
    $.season.render();

    $.transfer = new $.Transfer();


    $.generateSpecificPlayer(32, 0, 0, 6, 0, "", 1500);
    $.generateSpecificPlayer(29, 0, 0, 0, 5, "", 1000);
    $.generateSpecificPlayer(33, 4, 0, 0, 0, "", 500);
    $.generateSpecificPlayer(27, 3, 1, 0, 0, "", 600);
    $.generateSpecificPlayer(33, 0, 4, 0, 0, "Excellent header", 1000);
    $.generateSpecificPlayer(23, 0, 3, 0, 0, "", 400);
    $.generateSpecificPlayer(19, 0, 0, 4, 0, "", 600);
    $.generateSpecificPlayer(27, 0, 0, 7, 0, "Freekick expert", 3100);
    $.generateSpecificPlayer(33, 0, 4, 0, 0, "", 500);
    $.generateSpecificPlayer(28, 0, 4, 2, 0, "Excellent header", 2100);
    $.generateSpecificPlayer(25, 0, 1, 4, 0, "Fast runner", 1500);
    $.generateSpecificPlayer(24, 0, 0, 0, 6, "", 1600);
    $.generateSpecificPlayer(33, 0, 3, 0, 0, "Freekick expert", 800);
    $.generateSpecificPlayer(32, 0, 3, 1, 0, "", 500);
    $.generateSpecificPlayer(22, 0, 7, 0, 0, "", 2600);
    $.generateSpecificPlayer(32, 6, 0, 0, 0, "", 1500);
    $.generateSpecificPlayer(34, 0, 0, 0, 2, "", 150);
    $.generateSpecificPlayer(32, 0, 5, 0, 0, "Fast runner", 1400);
    $.generateSpecificPlayer(29, 0, 0, 5, 0, "Amazing dribbler", 1500);
    $.generateSpecificPlayer(33, 0, 0, 3, 0, "", 300);
    $.generateSpecificPlayer(22, 0, 2, 4, 0, "", 1600);
    $.generateSpecificPlayer(21, 0, 6, 0, 0, "Great tackler", 2100);
    $.generateSpecificPlayer(37, 3, 0, 0, 0, "", 300);
    $.generateSpecificPlayer(29, 0, 0, 0, 6, "Excellent header", 2100);
    $.generateSpecificPlayer(34, 0, 2, 2, 1, "", 900);
    $.generateSpecificPlayer(33, 0, 1, 5, 0, "", 1500);
    $.generateSpecificPlayer(33, 0, 0, 1, 3, "", 500);
    $.generateSpecificPlayer(30, 0, 4, 0, 0, "", 600);
    $.generateSpecificPlayer(31, 0, 3, 3, 0, "Excellent header", 2000);
    $.generateSpecificPlayer(31, 0, 0, 0, 5, "", 900);
    $.generateSpecificPlayer(30, 5, 0, 0, 0, "", 1000);
    $.generateSpecificPlayer(21, 0, 4, 0, 0, "Fast runner", 1100);
    $.generateSpecificPlayer(32, 0, 1, 3, 0, "", 500);
    $.generateSpecificPlayer(20, 7, 0, 0, 0, "", 2600);
    $.generateSpecificPlayer(23, 0, 0, 5, 0, "", 1000);
    $.generateSpecificPlayer(25, 0, 0, 1, 4, "", 1000);
    $.generateSpecificPlayer(28, 0, 0, 1, 5, "Fast runner", 2100);
    $.generateSpecificPlayer(30, 2, 0, 0, 0, "", 200);
    $.generateSpecificPlayer(23, 0, 0, 5, 1, "", 1600);
    $.generateSpecificPlayer(34, 0, 0, 3, 0, "Excellent header", 800);
    $.generateSpecificPlayer(23, 0, 0, 0, 7, "Amazing dribbler", 3100);
    $.generateSpecificPlayer(30, 0, 2, 0, 0, "", 200);
    $.generateSpecificPlayer(31, 0, 2, 3, 2, "", 900);


    $.transfer.render();
};

$.generatePlayer = function() {
    var player = new $.Player($.playerFirstNames[$.current_player%64] + " " + $.playerLastNames[$.current_player%79], 27, 1, 4, 5, 4, "", 500);
    $.players.push(player);
    $.transfer.addPlayer(player);
    $.current_player++;
}

$.generateSpecificPlayer = function(age,keeper,defence,midfield,attack,trait,wage) {
    var player = new $.Player($.playerFirstNames[$.current_player%64] + " " + $.playerLastNames[$.current_player%79], age, keeper, defence, midfield, attack, trait, wage);
    $.players.push(player);
    $.transfer.addPlayer(player);
    $.current_player++;
}

$.speedHasChanged = function() {
    $.addPlaySeasonButton();
    $.addPlayNextMatchButton();
    $.season.finishMatchday();
    $.season.resetMatchdayData();
};


$.addPlaySeasonButton = function() {

    var buffer = "";
    if (parseInt($.season.getSpeed()) === 3) {
        buffer = '<button onclick="$.playSeason()">Play season</button>';
    }
    document.getElementById('playSeasonButton').innerHTML = buffer;    

};

$.addPlayNextMatchButton = function() {

    var buffer = "";
    if (parseInt($.season.getSpeed()) === 1 || parseInt($.season.getSpeed()) === 2) {
        buffer = '<button onclick="$.playNextMatchday()">Play next match</button>';
    }
    document.getElementById('playNextMatchButton').innerHTML = buffer;    

};

$.playNextMatchday = function() {
    $.season.simNextMatchday();
    $.renderAll();
};

$.renderAll = function() {
    $.team8.render();
    $.transfer.render();
    $.season.render();
};

$.playSeason = function() {
    $.season.simSeason();
    $.season.getNextMatchDay();
    $.renderAll();
    
};

$.generateRandomTeam2 = function() {

    var team = new $.Team();

    if (0 === $.util.randomIntInRange(0,6)) {
        $.players.push(new $.Player(true, true));
        $.players.push(new $.Player(false, false));
        team.addPlayer($.players[$.current_player]);
        team.setKeeper($.players[$.current_player++]);

        team.addPlayer($.players[$.current_player]);
        team.setDefender($.players[$.current_player++]);
    }
    else {
        $.players.push(new $.Player(true, false));
        $.players.push(new $.Player(false, true));
        team.addPlayer($.players[$.current_player]);
        team.setKeeper($.players[$.current_player++]);

        team.addPlayer($.players[$.current_player]);
        team.setDefender($.players[$.current_player++]);
    }
    for (var i=0; i<4; i++) {
        
        $.players.push(new $.Player(false, false));
    }
    team.addPlayer($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    team.addPlayer($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    team.addPlayer($.players[$.current_player]);
    team.setFreekicktaker($.players[$.current_player]);
    team.setStriker($.players[$.current_player++]);
    team.addPlayer($.players[$.current_player]);
    team.setSub($.players[$.current_player++]);

    return team;
};


$.generateTeam1 = function() {
    var team = new $.Team();
    var seed = Math.random();
    function random() {
        var x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    }
    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 28, 7, 0, 0, 0, "", 1600));
    team.addPlayer($.players[$.current_player]);
    team.setKeeper($.players[$.current_player++]);
    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 27, 0, 7, 0, 0, "", 2600));
    team.addPlayer($.players[$.current_player]);
    team.setDefender($.players[$.current_player++]);
    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 24, 0, 7, 0, 0, "", 1600));
    team.addPlayer($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 27, 0, 0, 5, 2, "Amazing dribbler", 2100));
    team.addPlayer($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 28, 0, 0, 0, 6, "Fast runner", 3100));
    team.addPlayer($.players[$.current_player]);
    team.setFreekicktaker($.players[$.current_player]);
    team.setStriker($.players[$.current_player++]);
    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 23, 0, 0, 3, 0, "", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setSub($.players[$.current_player++]);

    return team;

};

$.generateTeam2 = function() {
    var team = new $.Team();

    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 28, 6, 0, 0, 0, "", 1600));
    team.addPlayer($.players[$.current_player]);
    team.setKeeper($.players[$.current_player++]);
    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 25, 0, 7, 0, 0, "", 3100));
    team.addPlayer($.players[$.current_player]);
    team.setDefender($.players[$.current_player++]);
    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 28, 0, 6, 0, 0, "Excellent header", 1500));
    team.addPlayer($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 27, 0, 0, 5, 1, "Amazing dribbler", 2100));
    team.addPlayer($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 24, 0, 0, 0, 7, "Fast runner", 1500));
    team.addPlayer($.players[$.current_player]);
    team.setFreekicktaker($.players[$.current_player]);
    team.setStriker($.players[$.current_player++]);
    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 33, 0, 4, 0, 0, "", 500));
    team.addPlayer($.players[$.current_player]);
    team.setSub($.players[$.current_player++]);

    return team;
};


$.generateTeam3 = function() {
    var team = new $.Team();

    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 27, 4, 0, 0, 0, "", 600));
    team.addPlayer($.players[$.current_player]);
    team.setKeeper($.players[$.current_player++]);
    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 30, 0, 8, 0, 0, "", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 29, 0, 0, 5, 0, "Fast runner", 3100));
    team.addPlayer($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 23, 0, 0, 0, 7, "Amazing dribbler", 2100));
    team.addPlayer($.players[$.current_player]);
    team.setFreekicktaker($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 27, 0, 0, 0, 6, "Excellent header", 2100));
    team.addPlayer($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 32, 0, 4, 1, 0, "", 900));
    team.addPlayer($.players[$.current_player]);
    team.setSub($.players[$.current_player++]);

    return team;
};

$.generateTeam4 = function() {
    var team = new $.Team();

    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 33, 4, 1, 0, 0, "", 900));
    team.addPlayer($.players[$.current_player]);
    team.setKeeper($.players[$.current_player++]);
    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 27, 0, 6, 0, 0, "Excellent header", 2100));
    team.addPlayer($.players[$.current_player]);
    team.setDefender($.players[$.current_player++]);
    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 28, 0, 2, 5, 0, "Excellent header", 3100));
    team.addPlayer($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 27, 0, 1, 5, 0, "Excellent header", 2100));
    team.addPlayer($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 29, 0, 0, 1, 5, "", 1600));
    team.addPlayer($.players[$.current_player]);
    team.setFreekicktaker($.players[$.current_player]);
    team.setStriker($.players[$.current_player++]);
    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 34, 0, 0, 4, 0, "", 500));
    team.addPlayer($.players[$.current_player]);
    team.setSub($.players[$.current_player++]);

    return team;
};

$.generateTeam5 = function() {
    var team = new $.Team();

    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 28, 6, 0, 0, 0, "", 1600));
    team.addPlayer($.players[$.current_player]);
    team.setKeeper($.players[$.current_player++]);
    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 23, 0, 5, 0, 0, "Fast runner", 1500));
    team.addPlayer($.players[$.current_player]);
    team.setDefender($.players[$.current_player++]);
    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 27, 0, 6, 0, 0, "", 1600));
    team.addPlayer($.players[$.current_player]);
    team.setDefender($.players[$.current_player++]);
    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 26, 0, 0, 6, 0, "", 1600));
    team.addPlayer($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 22, 0, 0, 0, 6, "Fast runner", 2100));
    team.addPlayer($.players[$.current_player]);
    team.setFreekicktaker($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 29, 0, 0, 0, 5, "", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setSub($.players[$.current_player++]);

    return team;
};


$.generateTeam6 = function() {
    var team = new $.Team();

    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 25, 6, 0, 0, 0, "", 1600));
    team.addPlayer($.players[$.current_player]);
    team.setKeeper($.players[$.current_player++]);
    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 32, 0, 6, 0, 0, "Great tackler", 2000));
    team.addPlayer($.players[$.current_player]);
    team.setDefender($.players[$.current_player++]);
    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 28, 0, 6, 0, 0, "Excellent header", 2100));
    team.addPlayer($.players[$.current_player]);
    team.setDefender($.players[$.current_player++]);
    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 28, 0, 0, 6, 0, "", 1600));
    team.addPlayer($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 27, 0, 0, 1, 5, "Freekick expert", 2100));
    team.addPlayer($.players[$.current_player]);
    team.setFreekicktaker($.players[$.current_player]);
    team.setStriker($.players[$.current_player++]);
    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 33, 0, 3, 1, 0, "", 500));
    team.addPlayer($.players[$.current_player]);
    team.setSub($.players[$.current_player++]);

    return team;
};



$.generateTeam7 = function() {
    var team = new $.Team();

    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 27, 9, 0, 0, 0, "", 6800));
    team.addPlayer($.players[$.current_player]);
    team.setKeeper($.players[$.current_player++]);
    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 26, 0, 6, 0, 0, "Excellent header", 2100));
    team.addPlayer($.players[$.current_player]);
    team.setDefender($.players[$.current_player++]);
    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 27, 0, 2, 5, 0, "", 2600));
    team.addPlayer($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 24, 0, 0, 6, 1, "Amazing dribbler", 3100));
    team.addPlayer($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 23, 0, 0, 3, 4, "Fast runner", 3100));
    team.addPlayer($.players[$.current_player]);
    team.setFreekicktaker($.players[$.current_player]);
    team.setStriker($.players[$.current_player++]);
    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 29, 0, 0, 0, 4, "", 600));
    team.addPlayer($.players[$.current_player]);
    team.setSub($.players[$.current_player++]);

    return team;
};

$.generateTeam8 = function() {
    var team = new $.Team();

    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 30, 4, 0, 0, 0, "", 600));
    team.addPlayer($.players[$.current_player]);
    team.setKeeper($.players[$.current_player++]);
    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 29, 0, 5, 0, 0, "", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setDefender($.players[$.current_player++]);
    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 28, 0, 0, 5, 0, "", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 30, 0, 0, 3, 2, "", 1000));
    team.addPlayer($.players[$.current_player]);
    team.setMidfielder($.players[$.current_player++]);
    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 27, 0, 0, 0, 4, "", 600));
    team.addPlayer($.players[$.current_player]);
    team.setFreekicktaker($.players[$.current_player]);
    team.setStriker($.players[$.current_player++]);
    $.players.push(new $.Player($.playerFirstNames[$.current_player] + " " + $.playerLastNames[$.current_player], 34, 0, 0, 0, 2, "Amazing dribbler", 550));
    team.addPlayer($.players[$.current_player]);
    team.setSub($.players[$.current_player++]);

    return team;
};


$.update = function () {
    if ($.stop) return;

    $.timer++;
    if ($.timeout > 0) {
        $.timeout--;
    }
    else {
        if (controls.left) {
            if ($.current_player != 0) {
                $.current_player--;
                $.team1.removePlayer($.players[$.current_player]);
                $.timeout = 50;
            }
        }
        else if (controls.right) {
            if ($.current_player < $.players.length) {
                $.team1.addPlayer($.players[$.current_player]);
                $.current_player++;
                $.timeout = 50;
            }
        }
        else if (controls.up) {
            if ($.current_player < $.players.length) {
                $.team1.unsetPlayer($.players[$.current_player-1]);
                $.team1.setMidfielder($.players[$.current_player-1]);
                $.timeout = 50;
            }
        }
    }
    if ($.renderMatches) {
        $.match.update($.timer);
    }
    else {
        //$.match.fastSim();
    }

    $.events.update();
};

$.render = function () {
   // $.Draw.clear();

    for (var i=0; i<$.players.length; i++) {
  //      $.players[i].render(30, 50 + 30* i);
    }
    if ($.renderMatches) {
        //$.team1.render(5, 450);
        //$.team2.render(5, 500);
        //$.match.render(5, 370);
        //$.events.render();
       // $.season.render();
    }
    else {/*
        $.team1.render(5, 450);
        $.team2.render(5, 500);
        $.team3.render(5, 150);
        $.team4.render(5, 200);
        */
        //$.match.render(5, 370);        
        ///$.table.render();
      //  $.season.render();
    }
    $.events.render();
 

};

window.addEventListener('load', $.init, false);

window.addEventListener('keydown', function(ev) { return onkey(ev, ev.keyCode, true);  }, true);
window.addEventListener('keyup',   function(ev) { return onkey(ev, ev.keyCode, false); }, false);

function onkey(ev, key, down) {
    var KEY = { SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, X: 88 };

  switch(key) {
    case KEY.LEFT:  controls.left  = down; return false;
    case KEY.RIGHT: controls.right = down;  return false;
    case KEY.UP: controls.up  = down; return false;
    case KEY.DOWN: controls.down  = down; return false;
    case KEY.SPACE: controls.space = down; return false;
    case KEY.X: controls.x = down; return false;
  }
}
