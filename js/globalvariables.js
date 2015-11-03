var eccentricityModifier = 50; // Make the eccentricities larger so we can actually see something with our weird-scale model.
var orbitSteps = 1000; // Used for making Elliptical orbits with Kepler's 2nd Law. Just the number of steps/points for an orbit.

var earthSize = 5; /*1 * 5; */
var earthDistanceFromSun = 156; /*23500 / 150; */
var earthOrbitRotationSpeed = 0.089; /* 365.26 / 4000; */
var earthAxisRotationSpeed= 4.5; /* 9.972 / 2; */
var earthAxialTilt = 23.44;
var earthOrbitEccentricity = 0.00167 * eccentricityModifier;

var moonSize = 3; /*0.277 * 7; */
var moonDistanceFromEarth = 30; /* 60.3 / 2; */
var moonAxisRotationSpeed = 1.2; /* 2.732 / 2.4; */
var moonOrbitRotationSpeed = moonAxisRotationSpeed;
var moonOrbitEccentricity = 0.00549 * eccentricityModifier;
var moonAxialTilt = 1.593;
var moonOrbitalTilt = 5.145;

var sunSize = 20; /* 109 / 7; */
var sunAxisRotationSpeed = 0.05; /* 0.25 / 4; */

var starMapSize = 500;

var simulationPaused = false;
var speed = 1;

var controlValues = {
    earthOrbitRotationSpeed : earthOrbitRotationSpeed * speed,
    earthAxisRotationSpeed : earthAxisRotationSpeed * speed,

    moonAxisRotationSpeed : moonAxisRotationSpeed * speed,
    moonOrbitRotationSpeed : moonAxisRotationSpeed * speed,

    sunAxisRotationSpeed : sunAxisRotationSpeed * speed
}

function updateControlValues(speedAdjust){
    speed = speedAdjust;
	controlValues.earthOrbitRotationSpeed = earthOrbitRotationSpeed * speed;
	controlValues.earthAxisRotationSpeed = earthAxisRotationSpeed * speed;

	controlValues.moonAxisRotationSpeed = moonAxisRotationSpeed * speed;
	controlValues. moonOrbitRotationSpeed = moonAxisRotationSpeed * speed;

	controlValues.sunAxisRotationSpeed = sunAxisRotationSpeed * speed;
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
