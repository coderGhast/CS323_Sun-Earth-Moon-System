var earthSize = 1 * 5;
var earthDistanceFromSun = 23500 / 150;
var earthOrbitRotationSpeed = 365.26 / 4000;
var earthAxisRotationSpeed= 9.972;
var earthAxialTilt = 23.44;
var earthOrbitEccentricity = 0.00167;

var moonSize = 0.277 * 7 ;
var moonDistanceFromEarth = 60.3 / 2;
var moonAxisRotationSpeed = 2.732 / 2.4;
var moonOrbitRotationSpeed = moonAxisRotationSpeed;
var moonOrbitEccentricity = 0.00549;
var moonAxialTilt = 1.593;
var moonOrbitalTilt = 5.145;

var sunSize = 109 / 7;
var sunAxisRotationSpeed = 0.25 / 4;

var simulationPaused = false;
var speed = 1;

function speedAdjustments(speedAdjust){
    speed = speedAdjust;
    updateControlValues(speedAdjust);
}

var controlValues = {
    earthOrbitRotationSpeed : earthOrbitRotationSpeed * speed,
    earthAxisRotationSpeed : earthAxisRotationSpeed * speed,

    moonAxisRotationSpeed : moonAxisRotationSpeed * speed,
    moonOrbitRotationSpeed : moonAxisRotationSpeed * speed,

    sunAxisRotationSpeed : sunAxisRotationSpeed * speed
}

function updateControlValues(speedAdjust){
	controlValues.earthOrbitRotationSpeed = earthOrbitRotationSpeed * speedAdjust;
	controlValues.earthAxisRotationSpeed = earthAxisRotationSpeed * speedAdjust;

	controlValues.moonAxisRotationSpeed = moonAxisRotationSpeed * speedAdjust;
	controlValues. moonOrbitRotationSpeed = moonAxisRotationSpeed * speedAdjust;

	controlValues.sunAxisRotationSpeed = sunAxisRotationSpeed * speedAdjust;
}

var textures = {
    earthDiffuse : loadTexture('images/earthmap1k.jpg'),
    earthBumpMap : loadTexture('images/earthbump1k.jpg'),
    earthSpecularMap : loadTexture('images/earthspec1k.jpg'),
    moonDiffuse : loadTexture('images/moonmap1k.jpg'),
    moonBumpMap : loadTexture('images/moonbump1k.jpg'),
    starMap : loadTexture('images/starmap_s.png'),
    sunDiffuse : loadTexture('images/sunmap.jpg')
}

function loadTexture(texture){
    var textureLoader = new THREE.TextureLoader();
    return textureLoader.load(texture);
}