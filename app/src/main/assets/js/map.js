
"use strict";

$.TILE_SIZE = 20;

$.Map = function(width, height, colors) {
    this.width = width;
    this.height = height;
    this.colors = colors;
    this.offset = 1;
    this.data = [width+1];
    for (var i = 0; i < width; i++) {
        this.data[i] = [height+1];


        for (var j = 0; j < height-1; j++) {
            this.data[0][j] = $.gray;

            this.data[i][j] = $.util.pickRandomFromObject($.colors);
            if (i>98 && i<104 && j>60 && j<65) this.data[i][j] = $.colors["yellow"];
            if (i==101 && j==65) this.data[i][j] = $.colors["yellow"];
            if (i>94 && i<102 && j>65 && j<68) this.data[i][j] = $.colors["yellow"];
            if (i==100 && j==60) this.data[i][j] = $.colors["yellow"];
            if (i>98 && i<101 && j>56 && j<60) this.data[i][j] = $.colors["yellow"];
            if (i==103 && j==60) this.data[i][j] = $.colors["yellow"];
            if (i>101 && i<105 && j>56 && j<60) this.data[i][j] = $.colors["yellow"];
            if (i==98 && j==62) this.data[i][j] = $.colors["yellow"];
            if (i>92 && i<98 && j>58 && j<65) this.data[i][j] = $.colors["yellow"];

            if (i>108 && i<112 && j>68 && j<72) this.data[i][j] = $.colors["darkbrown"];
            if (i==109 && j==69) this.data[i][j] = $.colors["purple"];
            if (i==110 && j==71) this.data[i][j] = $.colors["nightblue"];
            if (i==111 && j==71) this.data[i][j] = $.colors["darkgreen"];
            if (i==110 && j==69) this.data[i][j] = $.colors["darkgreen"];
            if (i==109 && j==71) this.data[i][j] = $.colors["nightblue"];
            if (i==110 && j==70) this.data[i][j] = $.colors["pink"];
            if (i>100 && i<106 && j==72) this.data[i][j] = $.colors["green"];
            if (i>103 && i<108 && j==73) this.data[i][j] = $.colors["green"];
            if (i>106 && i<113 && j==72) this.data[i][j] = $.colors["green"];
            if (i==98 && j>67 && j<72) this.data[i][j] = $.colors["green"];
            if (i>98 && i<102 && j==71) this.data[i][j] = $.colors["green"];
            if (i==112 && j>68 && j<72) this.data[i][j] = $.colors["green"];
            if (i>112 && i<118 && j==69) this.data[i][j] = $.colors["green"];
            if (i==117 && j>69 && j<71) this.data[i][j] = $.colors["green"];
            if (i>117 && i<126 && j==70) this.data[i][j] = $.colors["green"];
            if (i>124 && i<133 && j==71) this.data[i][j] = $.colors["green"];
            if (i>131 && i<137 && j==72) this.data[i][j] = $.colors["green"];
            if (i==136 && j>72 && j<75) this.data[i][j] = $.colors["green"];
            if (i>136 && i<139 && j==74) this.data[i][j] = $.colors["green"];
            if (i==138 && j>74 && j<80) this.data[i][j] = $.colors["green"];
            if (i>138 && i<144 && j==79) this.data[i][j] = $.colors["green"];
            if (i==143 && j>79 && j<85) this.data[i][j] = $.colors["green"];
            if (i==144 && j>83 && j<90) this.data[i][j] = $.colors["green"];
            if (i>144 && i<152 && j==89) this.data[i][j] = $.colors["green"];
            if (i>150 && i<153 && j==88) this.data[i][j] = $.colors["green"];
            if (i>151 && i<160 && j==87) this.data[i][j] = $.colors["green"];
            if (i>158 && i<165 && j==86) this.data[i][j] = $.colors["green"];
            if (i>163 && i<170 && j==87) this.data[i][j] = $.colors["green"];
            if (i>168 && i<172 && j==88) this.data[i][j] = $.colors["green"];
            if (i>170 && i<175 && j==89) this.data[i][j] = $.colors["green"];
            if (i>173 && i<178 && j==90) this.data[i][j] = $.colors["green"];
            if (i==177 && j>90 && j<93) this.data[i][j] = $.colors["green"];
            if (i>177 && i<182 && j==92) this.data[i][j] = $.colors["green"];
            if (i>180 && i<184 && j==93) this.data[i][j] = $.colors["green"];
            if (i>184 && i<196 && j>90 && j<96) this.data[i][j] = $.colors["yellow"];
            if (i==184 && j>91 && j<95) this.data[i][j] = $.colors["yellow"];
            if (i==196 && j>91 && j<95) this.data[i][j] = $.colors["yellow"];
            if (i>185 && i<195 && j==90) this.data[i][j] = $.colors["yellow"];
            if (i>185 && i<195 && j==96) this.data[i][j] = $.colors["yellow"];
            if (i>176 && i<186 && j>30 && j<38) this.data[i][j] = $.colors["yellow"];
            //if (i>10 && i<20 && j>10 && j<20) this.data[i][j] = $.colors["yellow"];
            if (i>0 && i<45 && j>26 && j<36) this.data[i][j] = $.red;
            if (i>15 && i<45 && j>25 && j<35) this.data[i][j] = $.red;
            if (i>30 && i<46 && j>0 && j<35) this.data[i][j] = $.red;

        }
        this.data[i][0] = $.gray;
        this.data[i][height-3] = $.gray;

    }
    for (var j = 0; j < height; j++) {
        this.data[width-3][j] = $.gray;
    }


    

};

$.Map.prototype.getData = function (x1, y2) {
    var x = parseInt(x1);
    var y = parseInt(y2);
    return this.data[x][y];
};

$.Map.prototype.getDataFromPixel = function (x,y) {
    if (x < 0)     return this.getData($.map_x - 1,$.map_y + parseInt(y/$.TILE_SIZE));
    if (y < 0)     return this.getData($.map_x + parseInt(x/$.TILE_SIZE),$.map_y - 1);

    return this.getData($.map_x + parseInt(x/$.TILE_SIZE),$.map_y + parseInt(y/$.TILE_SIZE));
}
$.Map.prototype.setData = function (x,y, col) {
    this.data[x][y] = col;
}

$.Map.prototype.render = function (x, y) {
    for (var i = x; i < x+40; i++) {
        for (var j = y; j < y+25; j++) {
            $.Draw.rectFill((i-x)*$.TILE_SIZE, (j-y)*$.TILE_SIZE, $.TILE_SIZE, $.TILE_SIZE, this.getData(i, j));
 
        }
    }

};

$.Map.prototype.isSolidAt = function (x,y) {
    return this.isSolid(this.getData(parseInt(x/20),parseInt(y/20)));
}

$.Map.prototype.isSolid = function (col) {
    return (col === $.colors["nightblue"] ||
           col === $.colors["darkbrown"] ||
           col === $.colors["purple"] ||
           col == $.gray ||
           col === $.colors["darkgreen"]);
};

$.Map.prototype.tile2pixel = function (x,y) {
    return [(x%40)*TILE_SIZE, (y%25)*TILE_SIZE];
};

$.Map.prototype.clamp = function (x,y) {
    return [parseInt(x/TILE_SIZE)*TILE_SIZE, parseInt(y/TILE_SIZE)*TILE_SIZE];
};
