'use strict'
var Map = require("harmony-collections").Map;
var Set = require("harmony-collections").Set;
var parse = require('parse-svg-path');

var range = require('./utilities.js').range;

var Point = require('./point.js');

var random = Math.random;

var nbRandomPoints = 60;
var nbStartPoints = 20;

var nbCity = 2;

var textMesh = true;

// Frame definition
var xInit = 0, yInit = 0;
var w = 1,
    h = 1;

var svgString = "m 1246.3864,422.67046 c -32.6566,-3.05977 -80.9202,-1.60892 -64,-49.23572 -1.4759,-17.26999 -2.9389,-34.52697 19.6179,-27.76428 28.2051,-7.71782 5.6299,36.53428 29.3821,44 15.6401,11.08789 36.8268,15.16788 55.7601,11.43591 18.9333,-3.73198 35.6132,-15.27593 42.2399,-35.43591 11.114,-30.53447 -5.455,-63.66997 -34.7792,-76 -21.2379,-12.18874 -45.1963,-24.31647 -65.5186,-39.83315 -20.3223,-15.51668 -37.0085,-34.42231 -43.7022,-60.16685 -5.2777,-23.82651 1.2957,-47.48151 15.0269,-66.10238 13.7312,-18.62088 34.6201,-32.207623 57.9731,-35.897619 19.5714,-4.408067 39.5199,-4.455217 59.3132,-2.055584 19.7933,2.399634 39.4313,7.246051 58.3817,12.62512 1.5096,19.173023 5.7329,49.670133 -0.3128,65.430463 -16.657,-0.26915 -39.1842,5.88414 -31.6548,-19 -1.6482,-23.82053 -21.3427,-36.82701 -42.4938,-38.50012 -21.1511,-1.67312 -43.7588,7.98715 -51.2335,29.50012 -14.1826,27.84603 4.1914,57.9202 30,70 19.9649,13.49423 43.5526,24.76438 64.3552,38.77589 20.8027,14.01152 38.8202,30.7644 47.6448,55.22411 8.8577,24.73667 4.7321,50.90082 -7.7951,72.42372 -12.5272,21.5229 -33.456,38.40456 -58.2049,44.57628 -25.5516,8.81359 -53.4285,7.61391 -80,6 z m -502.75004,-4.49583 c -14.49634,-20.16798 -29.05177,-40.31989 -43.66494,-60.44416 -14.61316,-20.12428 -29.28404,-40.22091 -44.01126,-60.27834 -14.72723,-20.05744 -29.51079,-40.07567 -44.34931,-60.04313 -14.83851,-19.96747 -29.73199,-39.88417 -44.67904,-59.73854 0.085,67.94114 -2.59454,136.28635 1.45455,204 2.37361,21.33297 41.95968,2.60802 32,29.23572 -5.68484,10.73778 -30.97918,1.86608 -44.5036,4.76428 -19.16547,0 -38.33093,0 -57.4964,0 -12.17745,-31.99983 32.34126,-11.09351 34,-38 0.9227,-19.95147 1.50618,-39.93087 1.84747,-59.92634 0.34129,-19.99547 0.44039,-40.00702 0.39435,-60.02281 -0.0461,-20.01579 -0.23725,-40.03582 -0.47657,-60.04824 -0.23931,-20.01242 -0.52674,-40.01724 -0.76525,-60.00261 10.20299,-32.81396 -63.88039,-18.66932 -25.06566,-45.731739 23.84724,1.313312 50.33669,-2.975416 73.00768,1.582846 14.56739,20.242453 29.23861,40.419643 43.95531,60.568633 14.71671,20.14899 29.47889,40.26977 44.2282,60.39943 14.74931,20.12965 29.48574,40.26817 44.15094,60.45262 14.66519,20.18445 29.25916,40.41483 43.72353,60.72821 0.83332,-70.07002 2.82145,-140.78692 -1,-210.54546 -10.39601,-9.71246 -51.54014,-21.85965 -24.14642,-33.454539 30.9003,0.49167 61.92696,-1.293841 92.71785,1.42857 12.44918,33.638319 -51.66003,12.223739 -34.00692,55.415179 -0.24121,22.59532 -0.38824,45.19117 -0.47532,67.78734 -0.0871,22.59618 -0.11419,45.19267 -0.11559,67.7893 -10e-4,22.59662 0.0229,45.19336 0.0387,67.79003 0.0158,22.59667 0.0231,45.19326 -0.0123,67.78958 -15.5356,-0.53883 -31.43722,1.23098 -46.75,-1.49583 z M 132.38637,405.67046 c -2.30195,-19.38098 35.20853,-6.01885 35.99999,-32 10.6943,-23.20341 21.35806,-46.41833 32.00899,-69.63818 10.65093,-23.21985 21.28905,-46.44461 31.93207,-69.6677 10.64303,-23.22308 21.29096,-46.44449 31.96154,-69.65761 10.67058,-23.21313 21.3638,-46.41797 32.0974,-69.607939 14.00633,-14.784664 31.06301,-3.589508 34,14.571429 9.47589,20.50998 18.90267,41.04032 28.32168,61.57386 9.41901,20.53355 18.83027,41.07031 28.27512,61.59315 9.44485,20.52284 18.92331,41.03177 28.47672,61.50964 9.55341,20.47788 19.18179,40.9247 28.92648,61.32335 8.94847,18.57494 17.97684,44.59976 44,40 6.95283,23.21831 -11.22619,21.30477 -28.79645,20 -17.53393,0 -35.06785,0 -52.60178,0 -17.53392,0 -35.06785,0 -52.60177,0 -13.61053,-31.56953 34.86478,-11.43099 30,-37 -7.96326,-20.44937 -16.90067,-40.88219 -27.17188,-60.1481 -22.69835,-0.30159 -45.74783,-1.00478 -68.70149,-1.13746 -22.95367,-0.13269 -45.81153,0.30513 -68.12663,2.28556 -10.15614,23.48394 -27.65652,46.62921 -26.57143,72.57143 21.87983,-9.59529 37.44237,23.82765 14.09999,23.42857 -25.17618,0 -50.35237,0 -75.52855,0 0,-3.33333 0,-6.66667 0,-10 z m 213.99999,-112 c -9.85189,-19.92913 -19.12968,-40.10864 -28.4649,-60.26037 -9.33521,-20.15173 -18.72785,-40.27567 -28.8094,-60.09366 -8.0471,4.62582 -13.12108,26.97607 -19.7257,38.35403 -12.60829,27.21944 -25.26661,54.41816 -37,82 18.19346,1.65846 37.60009,2.48757 57.00505,2.48751 19.40495,-6e-5 38.80822,-0.82929 56.99495,-2.48751 z m 582,112 c -1.2337,-21.88184 52.78642,-3.94103 39.43532,-42.15625 0.24195,-20.8192 0.38925,-41.63897 0.47635,-62.45909 0.0871,-20.82012 0.11398,-41.64058 0.1151,-62.46118 10e-4,-20.8206 -0.0235,-41.64134 -0.0394,-62.46199 -0.0159,-20.82065 -0.0232,-41.64122 0.0127,-62.46149 -26.37832,2.29828 -55.93232,-6.20371 -79.85787,6.80589 -1.50256,28.04473 -4.68344,46.64651 -35.23142,39.19411 -7.11643,-15.54116 -0.90104,-46.83584 -1.48214,-66.571429 25.02495,-0.70812 50.0617,-1.115779 75.10565,-1.337873 25.04395,-0.222093 50.0951,-0.258621 75.14885,-0.224476 25.0538,0.03414 50.1101,0.138961 75.1645,0.199555 25.0544,0.06059 50.1067,0.07697 75.1525,-0.06578 0,22.666673 0,45.333333 0,68.000003 -11.5708,-3.09584 -38.1128,8.77945 -32,-12 6.3763,-41.53883 -40.2943,-34.36261 -67.7072,-34 -23.6002,-7.69784 -14.9407,16.86409 -16.2929,31.41431 0.1745,19.75739 0.1467,39.53024 0.067,59.30763 -0.08,19.77738 -0.2116,39.5593 -0.2452,59.33481 -0.034,19.77551 0.031,39.54462 0.3439,59.29638 0.3129,19.75176 0.8743,39.48618 1.8343,59.19232 6.3204,22.76756 50.3983,0.0574 38.0001,33.45455 -24.6667,0 -49.3333,0 -74,0 -24.66671,0 -49.3334,0 -74.00007,0 0,-3.33333 0,-6.66667 0,-10 z";


//var svgString = "m 979.07103,350.70321 c -15.89142,-5.85316 -30.97305,-13.6682 -44.3926,-23.85957 7.75724,-16.48178 17.17978,-31.76383 24.4232,-47.05212 18.77991,13.88496 39.5498,24.40529 60.57897,29.97765 22.5636,5.61935 46.1724,5.71757 66.6418,-0.97765 14.2804,-6.92169 17.3033,-19.64436 13.4946,-31.15028 -11.7972,-24.44285 -37.4528,-28.00725 -59.6921,-33.96069 -11.0924,-2.96235 -22.334,-5.81526 -33.0931,-9.45439 -22.07499,-7.35217 -42.44565,-20.26865 -53.70937,-38.43464 -9.83657,-23.38973 -9.02665,-47.23528 0.30787,-68.75069 10.90238,-22.52727 28.46583,-39.383207 50.6921,-46.249313 12.1821,-4.024145 24.8777,-6.357009 37.6988,-7.121901 26.5465,-1.202199 52.5846,3.66994 75.3282,13.239851 11.7709,5.013764 22.8912,11.348885 32.973,18.882053 -9.2264,14.54878 -15.2348,30.77003 -25.2587,43.41697 -15.0728,-11.15158 -33.5009,-20.54491 -52.6114,-24.91726 -19.1105,-4.37235 -38.9034,-3.72372 -56.7058,5.20861 -10.0321,7.02789 -13.3348,18.84695 -11.1561,29.53596 8.2669,24.19706 33.1702,27.83391 53.8421,33.44595 22.4826,6.12582 45.4171,11.24681 64.3695,22.05664 21.7523,13.46401 34.3101,30.65145 37.5268,54.66544 2.1004,24.34461 -4.4723,47.67975 -19.3227,64.97603 -18.9396,19.68039 -45.1963,27.39692 -69.9565,29.24774 -31.8701,2.17304 -64.224,-2.65054 -91.97857,-12.72439 z m -878.74861,8.08831 c 36.79582,-93.72853 76.99672,-195.03913 110.6614,-280.993723 12.99923,-3.357855 36.09221,-2.399326 45.66045,-0.04229 33.60115,76.567143 80.36216,199.341173 111.67815,281.036013 -22.70615,10.93611 -53.29916,19.07137 -55.15636,0.21333 -6.55202,-17.37997 -21.76816,-50.66545 -27.47423,-66.98013 -33.61042,-1.14101 -73.27543,-7.93663 -103.36941,3.19537 -8.53979,22.52579 -16.30488,44.88745 -24.54688,65.70828 -19.70144,1.60407 -39.10379,0.58497 -57.45312,0.86313 l 0,-2.19791 z m 174,-109 c -11.28546,-39.41028 -28.29031,-81.92753 -38.57143,-114 -13.40959,33.30997 -53.42765,116.91851 -35.61082,114.52606 22.87389,-0.92513 53.06087,3.59108 74.18225,-0.52606 z m 126,-174.000003 c 14.64729,1.05313 31.03193,-2.08808 44.60679,1.55415 54.43659,67.452473 98.13155,121.991023 146.39321,184.445853 1.80482,-63.02795 0.70441,-125.10223 0.99997,-186.000003 19.2332,0 38.12247,0 56,0 0,96.143823 0,191.483173 0,286.000003 -14.6441,-1.05348 -31.026,2.08847 -44.59764,-1.55416 -51.45123,-60.69006 -96.46209,-121.61641 -146.86903,-180.44584 -0.90366,61.68318 -0.40641,122.41241 -0.53329,182 -9.33333,0 -18.66667,0 -28,0 -9.33333,0 -18.66666,0 -28,0 0,-93.41696 -10e-6,-193.61517 -10e-6,-286.000003 z m 374.52606,48.000003 c -19.88686,-11.19703 -65.34503,0 -90.52606,0 0,-16.4856 0,-32.6764 0,-48.000003 80.0078,0 159.34614,0 238,0 0,16.485599 0,32.676403 0,48.000003 -23.52292,2.9447 -89.16068,-8.36216 -90,1.47394 -0.54085,78.58227 1.38039,157.45947 -1.42863,235.09749 -11.93418,-1.67345 -53.14305,7.8044 -54.57143,-2.96725 1.103,-78.58465 -1.06452,-156.29105 -1.47388,-233.60418 z"
//var svgString = "m 376,24 c 0,-19.83334 0,-39.66667 0,-59.5 0,-19.83333 0,-39.66666 0,-59.5 -15.33334,0 -30.66667,0 -46,0 -15.33333,0 -30.66667,0 -46,0 0,-16 0,-32.000003 0,-48.000003 19.83333,0 39.66667,0 59.5,0 19.83333,0 39.66667,0 59.5,0 19.83333,0 39.66667,0 59.5,0 19.83333,0 39.66667,0 59.5,0 0,16 0,32.000003 0,48.000003 -15,0 -30,0 -45,0 -15,0 -30,0 -45,0 -0.14707,19.71176 -0.13037,39.43185 -0.0675,59.1545 0.0629,19.72265 0.17199,39.44785 0.20971,59.16984 0.0377,19.72199 0.004,39.44075 -0.21855,59.15053 -0.22261,19.70977 -0.63417,39.41055 -1.35226,59.09656 -14.79248,-1.99928 -46.24135,7.86759 -54.57143,-2.96725 0,-19.1007 0,-38.20139 0,-57.30209 0,-19.1007 0,-38.2014 0,-57.30209 z"
 
function svgToPoints(svgString) {
    var points = [];
    //var edges = [];

    var edges = new Map(); // pointId -> pointId on border
    var beginingPath;

    var X = 0;
    var Y = 0;
    var nbPoints = 0;
    var prevPoint;

    var commands = parse(svgString)
    for (var i=0; i<commands.length; i++){
        var command = commands[i];
        switch (command[0]) {
            case "m":
                X += command[1];
                Y += command[2];
                prevPoint = undefined;
                beginingPath = nbPoints;
                break;
            case "M":
                X = command[1];
                Y = command[2];
                prevPoint = undefined;
                beginingPath = nbPoints;
                break;  
            case "c":
                X += command[5];
                Y += command[6];
                points.push({id:nbPoints, x:X, y:Y});
                // nbPoints++;
                // if (prevPoint) {
                //     edges.push([prevPoint, nbPoints]);
                //     prevPoint = nbPoints;
                // }
                if (prevPoint != undefined) {
                    edges.set(prevPoint, nbPoints);
                }
                prevPoint = nbPoints;
                nbPoints++;
                break;
            case "z":
                edges.set(prevPoint, beginingPath);
                beginingPath = undefined;
                prevPoint = undefined;
                break;    
        }
    }
    return {points : points, edges : edges};
}

// initialize points
var points = [];
var forcedEdges;
var citySet;

if (textMesh){

    var myText = svgToPoints(svgString);
    points = myText.points;
    forcedEdges = myText.edges;
    citySet = new Set(range(0, points.length));

    var scaleX = 0.4;
    var scaleY = 0.2;

    // scale points to [0,1] + scale
    var maxX = Math.max.apply(Math, points.map(function(p){return p.x}));
    var minX = Math.min.apply(Math, points.map(function(p){return p.x}));
    var maxY = Math.max.apply(Math, points.map(function(p){return p.y}));
    var minY = Math.min.apply(Math, points.map(function(p){return p.y}));
    points = points.map(function(p){
        var x = scaleX * (p.x-minX)/(maxX-minX)+0.25;
        var y = scaleY * (p.y-minY)/(maxY-minY)+0.25;
        var newPoint = new Point(x, y);
        newPoint.id = p.id;

        return newPoint;
    });

    // only add random points
    var nbPoints = points.length;
    for(var i=0; i<nbRandomPoints; ++i) {

        //var x = random() * w + xInit;
        //var y = random() * h + yInit;

        var x = random();
        var y = random();

        var newPoint = new Point(x, y);
        newPoint.id = nbPoints;

        points.push(newPoint);

        nbPoints++;
    }

} else {
    //add random points

    var nbPoints = 0;
    for(var i=0; i<nbRandomPoints; ++i) {

        var x = random();
        var y = random();

        var newPoint = new Point(x, y);
        newPoint.id = nbPoints;

        points.push(newPoint);
        
        nbPoints++;
    }

    citySet = new Set(range(0, nbCity));
}


// initialize start points
var possibleStartPointsId = [];

for (var i = 0; i < nbStartPoints; i++)
{
    possibleStartPointsId.push(Math.floor(nbRandomPoints * random()));
}



module.exports = {
    textMesh: textMesh,
    points: points,
    citySet: citySet,
    possibleStartPointsId: possibleStartPointsId,
    nbRandomPoints: nbRandomPoints,
    forcedEdges: forcedEdges
}