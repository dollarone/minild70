"use strict";

$.util = {};

window.requestAnimFrame = (function(){
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame    || 
    window.oRequestAnimationFrame      || 
    window.msRequestAnimationFrame     || 
    function( callback ){
        window.setTimeout(callback, 1000 / 60);
    };
})();


$.util.randomInRange= function (min, max) {
    return Math.random() * ( max - min ) + min;
};

$.util.randomIntInRange= function (min, max) {
    return Math.floor( Math.random() * ( max - min ) + min);
};

$.util.pickRandomFromObject = function (obj) {
    var keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]];
};

$.util.rndSeed = function(s) {
    return function() {
        s = Math.sin(s) * 10000; return s - Math.floor(s);
    };
};


$.util.bound = function(x, min, max) {
    return Math.max(min, Math.min(max, x));
};
