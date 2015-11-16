// Large, so we can actually see something with our model. This controls the scaling of the Earth and Moon's orbital eccentricity.
var eccentricityModifier = 50;

// Size of the Earth, scaled larger for the visualisation.
var earthSize = 10; // from -> 1 * 10; 
// The distance between the Sun and Earth, scaled for the visualisation.
var earthDistanceFromSun = 156; // from -> 23500 / 150; 
// The orbital period of the Earth around the Sun (365 days).
var earthOrbitalPeriod = 365;
// The 'speed' of the rotation of the Earth on its axis - The period of time (9.9 days) it takes to complete a full orbital rotation.
var earthAxisRotationSpeed= 9.972; 
var earthAxialTilt = 23.44;
var earthOrbitEccentricity = 0.00167 * eccentricityModifier;

// Size of the Moon, scaled larger for the visualisation.
var moonSize = 6; // from -> 0.277 * 21;
// The distance between the Moon and Earth, scaled for the visualisation.
var moonDistanceFromEarth = 40; // from -> 60.3 / 1.5; 
// The orbital period of the Moon around the Earth (365 / 12.175 days, the Moon completes a full orbital rotation in roughly 28 days).
var moonOrbitalPeriod = 365.26 / 12.175;

var moonOrbitEccentricity = 0.00549 * eccentricityModifier;
var moonAxialTilt = 1.593;
var moonOrbitalTilt = 5.145;

// Size of the Moon, scaled smaller for the visualisation.
var sunSize = 20; // from -> 109 / 7;
var sunAxisRotationSpeed = 0.25;

var starMapSize = 500;

// The 'speed' of the animation. Increasing/decreasing this scales the time of the animation through the orbital and axial rotations.
var speed = 1;

var simulationPaused = false;

var controlValues = {
    earthAxisRotationSpeed : earthAxisRotationSpeed * speed,
    sunAxisRotationSpeed : sunAxisRotationSpeed * speed
}

function updateControlValues(speedAdjust){
    speed = speedAdjust;
	controlValues.earthAxisRotationSpeed = earthAxisRotationSpeed * speed;
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
