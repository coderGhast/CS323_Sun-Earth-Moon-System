var eccentricityModifier = 50; // Make the eccentricities larger so we can actually see something with our weird-scale model.
var orbitSteps = 1000; // Used for making Elliptical orbits with Kepler's 2nd Law. Just the number of steps/points for an orbit.

var earthSize = 10; // from -> 1 * 5; 
var earthDistanceFromSun = 156; // from -> 23500 / 150; 
var earthOrbitRotationSpeed = 0.089; // from -> 365.26 / 4000; 
var earthAxisRotationSpeed= 4.5; // from -> 9.972 / 2; 
var earthAxialTilt = 23.44;
var earthOrbitEccentricity = 0.00167 * eccentricityModifier;

var moonSize = 6; // from -> 0.277 * 7;
var moonDistanceFromEarth = 40; // from -> 60.3 / 1.5;
var moonAxisRotationSpeed = 1.2; // from -> 2.732 / 2.4;
// No longer needed!
//var moonOrbitRotationSpeed = moonAxisRotationSpeed;
var moonOrbitEccentricity = 0.00549 * eccentricityModifier;
var moonAxialTilt = 1.593;
var moonOrbitalTilt = 5.145;

var sunSize = 20; // from -> 109 / 7;
var sunAxisRotationSpeed = 0.05; // from -> 0.25 / 4;

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
