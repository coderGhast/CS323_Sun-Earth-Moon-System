var earthSize = 1 * 10;
var earthDistanceFromSun = 23500 / 200;
var earthOrbitRotationSpeed = 365.26 / 4000;
var earthAxisRotationSpeed= 9.972 / 4;
var earthAxialTilt = 23.44;

var moonSize = 0.277 * 15 ;
var moonDistanceFromEarth = 60.3;
var moonAxisRotationSpeed = 2.732 / 4;
var moonOrbitRotationSpeed = moonAxisRotationSpeed;
var moonAxialTilt = 1.593;
var moonOrbitalTilt = 5.145;

var sunSize = 109 / 5;
var sunAxisRotationSpeed = 0.25 / 4;

function speedAdjustments(speedAdjust){
    speed = speedAdjust;
}

var speed = 1;
var controlValues = {
    earthOrbitRotationSpeed : earthOrbitRotationSpeed * speed,
    earthAxisRotationSpeed : earthAxisRotationSpeed * speed,

    moonAxisRotationSpeed : moonAxisRotationSpeed * speed,
    moonOrbitRotationSpeed : moonAxisRotationSpeed * speed,

    sunAxisRotationSpeed : sunAxisRotationSpeed * speed
}
