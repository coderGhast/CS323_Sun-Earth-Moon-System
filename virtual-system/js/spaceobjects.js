var earthAxisHelper;
var earthStep = 0;
var earthOrbitPoints = calculateOrbitalPoints(orbitSteps, earthOrbitEccentricity, earthDistanceFromSun);
var earth = {
  earthMesh : buildEarthMesh(),
  computableEarthVertices : [],
  updateEarth : function(){
    earthStep+= speed;
    if(earthStep >= earthOrbitPoints.length){
      earthStep = 0;
    }
    var currentPosition = earthOrbitPoints[Math.floor(earthStep)];
    earthMesh.position.set(currentPosition.x, currentPosition.y, currentPosition.z);
    computableEarthVertices = updateYRotation(controlValues.earthAxisRotationSpeed * (Math.PI / 180), earthMesh.geometry, computableEarthVertices);
    earthAxisHelper.applyMatrix(rotationYMatrix4(controlValues.earthAxisRotationSpeed * (Math.PI / 180)));
  }
};

function buildEarthMesh(){
  var earthGeometry = new THREE.SphereGeometry(earthSize, 32, 32);
  earthGeometry.dynamic = true;

  var earthMaterial = new THREE.MeshPhongMaterial( {
    map: textures.earthDiffuse,
    bumpMap: textures.earthBumpMap,
    bumpScale: 0.2,
    specularMap: textures.earthSpecularMap,
     } );

  earthMaterial.shininess = 1000;

  earthMesh = new THREE.Mesh( earthGeometry, earthMaterial );
  earthMesh.castShadow = true;
  earthMesh.receiveShadow = true;

  earthMesh.rotation.x = (earthAxialTilt/180)*Math.PI;

  earthAxisHelper = new THREE.AxisHelper( earthSize * 2 );
  earthAxisHelper.visible = true;
  earthMesh.add( earthAxisHelper );
  return earthMesh;
}

var moonStep = 0;
var moonAxisHelper;
var moonOrbitLine;
var moonOrbitPoints = calculateOrbitalPoints(orbitSteps, moonOrbitEccentricity, moonDistanceFromEarth);
for(var i = 0; i < moonOrbitPoints.length; i++){
  moonOrbitPoints[i].applyMatrix4(rotationZMatrix4(-(moonOrbitalTilt * (Math.PI / 180))));
}

var moon = {
    moonMesh : buildMoonMesh(),
    computableMoonVertices : [],
    moonOrbitAngleThisStep : 0.0,
    updateMoon : function(){
      moonStep+= speed * 15;
      if(moonStep >= moonOrbitPoints.length){
        moonStep = 0;
      }
      var currentPosition = moonOrbitPoints[Math.floor(moonStep)];
      moonMesh.position.set(currentPosition.x + earthMesh.position.x, currentPosition.y, currentPosition.z + earthMesh.position.z);
      // sneaky way of keeping the face of the Moon seen on Earth always the same.
      moonMesh.lookAt(earthMesh.position);
    },
    updateMoonOrbitLine: function(){
      // Keep the moon orbit around where the Earth is.
      // This could potentially be done by combining the Earth and Moon into one Object3D, rotating both, then rotating the moon around the centre of that Object.
      // However, for this simple simulation, this works well enough.
        moonOrbitLine.position.x = earthMesh.position.x;
        moonOrbitLine.position.z = earthMesh.position.z;
    }
}

function buildMoonMesh(){
    var moonGeometry = new THREE.SphereGeometry( moonSize, 32, 32 );
    var moonMaterial = new THREE.MeshPhongMaterial( {
        map: textures.moonDiffuse,
        bumpMap: textures.moonBumpMap,
        bumpScale: 0.1
    } );
    moonMesh = new THREE.Mesh( moonGeometry, moonMaterial );
    moonMesh.castShadow = true;
    moonMesh.receiveShadow = true;
    moonMesh.rotation.x = (moonAxialTilt/180) * Math.PI;

    moonAxisHelper = new THREE.AxisHelper( moonSize * 2 );
    moonAxisHelper.visible = true;
    moonMesh.add( moonAxisHelper );
    return moonMesh;
}

var sunGlow;
var sunFadeGlow;
var sunAxisHelper;
var sun = {
    sunMesh : buildSunMesh,
    computableSunVertices : [],
    updateSun : function(){
        computableSunVertices = updateYRotation(controlValues.sunAxisRotationSpeed * (Math.PI / 180), sunMesh.geometry, computableSunVertices);
        sunAxisHelper.applyMatrix(rotationYMatrix4(controlValues.sunAxisRotationSpeed * (Math.PI / 180)));
    }
}

function buildSunMesh(){
  var sunGeometry = new THREE.SphereGeometry(sunSize, 32, 32 );
  var sunMaterial = new THREE.MeshPhongMaterial( {emissive: 0xeb7d30, emissiveMap: textures.sunDiffuse} );
  sunMesh = new THREE.Mesh( sunGeometry, sunMaterial );
  sunMesh.position.set(0,0,0);

  sunAxisHelper = new THREE.AxisHelper(sunSize * 2);
  sunAxisHelper.visible = true;
  sunMesh.add(sunAxisHelper);
  return sunMesh;
}

function buildSunGlow(){
  var customMaterial = new THREE.ShaderMaterial( 
  {
      uniforms: 
    { 
      "c":   { type: "f", value: 1 },
      "p":   { type: "f", value: 0.8 },
      glowColor: { type: "c", value: new THREE.Color(0xeb7d30) },
      viewVector: { type: "v3", value: camera.position }
    },
    vertexShader: document.getElementById( 'vertexShader'   ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
    side: THREE.FrontSide,
    blending: THREE.AdditiveBlending,
    transparent: true
  });

  // Create 2 SunGlow in order to give the impression of light having a higher intensity at the source.
  sunGlow = new THREE.Mesh( sunMesh.geometry.clone(), customMaterial.clone() );
  sunGlow.position.set(sunMesh.position.x, sunMesh.position.y, sunMesh.position.z);
  sunGlow.scale.multiplyScalar(1.1);
  scene.add( sunGlow );

  sunFadeGlow = new THREE.Mesh( sunMesh.geometry.clone(), customMaterial.clone() );
  sunFadeGlow.position = sunMesh.position;
  sunFadeGlow.scale.multiplyScalar(1.2);
  scene.add( sunFadeGlow );
}

function updateSunGlow(){
   sunGlow.material.uniforms.viewVector.value =  new THREE.Vector3().subVectors( camera.position, sunGlow.position );
   sunFadeGlow.material.uniforms.viewVector.value = new THREE.Vector3().subVectors( camera.position, sunFadeGlow.position );
}

// Simple sphere that surrounds the simulation, to give the appearance that all takes place within the universe and the camera can move around it.
function buildStarMapMesh(){
  var starGeometry  = new THREE.SphereGeometry(starMapSize, 32, 32);
  var starTexture = textures.starMap;
  starTexture.wrapS = starTexture.wrapT = THREE.RepeatWrapping; 
  var starMaterial = new THREE.MeshBasicMaterial( {map: starTexture } );
  starMaterial.side = THREE.BackSide;
  var starMesh = new THREE.Mesh(starGeometry, starMaterial);
  return starMesh;
}
