// Kepler's 2nd Law calculations (for all points along an orbital rotation, in n (timeStep) steps).
function calculateOrbitalPoints(timeStep, eccentricity, semiMajorAxis){
	 // 2 * Pi is radians for 360 circle;
	var completeCircle = Math.PI * 2;
	var theta = 0;
	var r;
	var orbitPoints = [];

	// +1 to ensure a complete circle with no gaps.
	while(theta <= completeCircle){
		theta += calculateTheta(timeStep, eccentricity, theta);
		r = calculateR(semiMajorAxis, eccentricity, theta);
		orbitPoints.push(new THREE.Vector3(r * -Math.cos(theta), 0, r * Math.sin(theta)));
	}
	return orbitPoints;
}

function calculateTheta(timeStep, eccentricity, theta){
	return (2 / timeStep) * Math.pow((1 + eccentricity * Math.cos(theta)), 2) / Math.pow((1 - Math.pow(eccentricity), 2), (3 / 2));
}

function calculateR(semiMajorAxis, eccentricity, theta){
	var r = (semiMajorAxis * (1 - Math.pow(eccentricity, 2)) / (1 + eccentricity * Math.cos(theta)));
	return r;
}

function drawOrbitLine(vertices){
	var linemat = new THREE.LineBasicMaterial( { color: 0xffffff });
	var linegeo = new THREE.Geometry();
	linegeo.vertices = vertices;
	var orbitLine = new THREE.Line(linegeo, linemat);
	scene.add(orbitLine);
	return orbitLine;
}
