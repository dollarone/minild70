"use strict";

$.staticPlayerId = 0;

$.Player = function(name, age, keeper, defence, midfield, attack, trait, wage) {

    this.id = $.staticPlayerId++;
    this.name = name;
    this.age = age;
    this.keeper = keeper;
    this.defence = defence;
    this.midfield = midfield;
    this.attack = attack;
    this.trait = trait;
    this.wage = wage;
};

$.Player.prototype.oldConstructor = function(keeper, star) {

    this.id = $.staticPlayerId++;
    this.name = $.playerNames[this.id];
    this.position = "Substitute";
    this.age = 28;
    this.wage = "200";

/*    this.trait = "";
    if (this.id === 3) {
        this.trait = "Freekick expert";
    }
    if (this.id === 4) {
        this.trait = "Fast runner";
    }
    if (this.id === 2) {
        this.trait = "Excellent header";
    }
    
    if (this.id === 1) {
        this.trait = "Great tackler";
    }
    // TODO:
    if (this.id === 5) {
        //this.trait = "Dirty player";
    }
    if (this.id === 5) {
        this.trait = "Amazing dribbler";
    }
  **/  

    this.color = 'rgba(3, 3, 3, 1)';
    var extra = 0;
    if (star) {
        extra = 2;
    }
    if(keeper) {
        this.keeper = $.util.randomIntInRange(6,9+extra);
        this.defence = $.util.randomIntInRange(0,5);
        this.midfield = $.util.randomIntInRange(0,2);
        this.attack = $.util.randomIntInRange(0,2);
    }
    else {
        this.keeper =  $.util.randomIntInRange(0,2);
        this.defence = $.util.randomIntInRange(0,7);
        this.midfield = $.util.randomIntInRange(0,7);
        this.attack = $.util.randomIntInRange(0,7);
        if (star) {
            if (this.defence > this.midfield && this.defence > this.attack) {
                this.defence = $.util.randomIntInRange(6,9) + extra;
            }
            else if (this.midfield > this.defence && this.midfield > this.attack) {
                this.midfield = $.util.randomIntInRange(6,9) + extra;
            }
            else {
                this.attack = $.util.randomIntInRange(6,9) + extra;
            }
        }
    }
};


$.Player.prototype.render = function (x, y) {

    $.Draw.fillText("Keeper: " + this.keeper + "\nDefence: " + this.defence + "\nMidfield: " + this.midfield + 
        "\nAttack: " + this.attack, x, y, "30px Arial");
    

};


$.Player.prototype.update = function () {

};

