var earthAxisHelper;
var moonAxisHelper;
var sunAxisHelper;

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
        bumpScale: 0.7,
        specularMap: textures.earthSpecularMap,
         } );

      earthMesh = new THREE.Mesh( earthGeometry, earthMaterial );
      earthMesh.castShadow = true;
      earthMesh.receiveShadow = true;

      earthMesh.rotation.x = (earthAxialTilt/180)*Math.PI;

      earthAxisHelper = new THREE.AxisHelper( earthSize * 2 );
      earthAxisHelper.visible = false;
      earthMesh.add( earthAxisHelper );
      return earthMesh;
    }

var moonStep = 0;
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
        moonOrbitLine.position.x = earthMesh.position.x;
        moonOrbitLine.position.z = earthMesh.position.z;
    }
}

function buildMoonMesh(){
    var moonGeometry = new THREE.SphereGeometry( moonSize, 32, 32 );
    var moonMaterial = new THREE.MeshPhongMaterial( {
        map: textures.moonDiffuse,
        bumpMap: textures.moonBumpMap,
        bumpScale: 0.3
    } );
    moonMesh = new THREE.Mesh( moonGeometry, moonMaterial );
    moonMesh.castShadow = true;
    moonMesh.receiveShadow = true;
    moonMesh.rotation.x = (moonAxialTilt/180)*Math.PI;

    moonAxisHelper = new THREE.AxisHelper( moonSize * 2 );
    moonAxisHelper.visible = false;
    moonMesh.add( moonAxisHelper );
    return moonMesh;
}

var sunGlow;
var sunFadeGlow;

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
  sunAxisHelper.visible = false;
  sunMesh.add(sunAxisHelper);
  return sunMesh;
}

function buildSunGlow(){
  var customMaterial = new THREE.ShaderMaterial( 
  {
      uniforms: 
    { 
      "c":   { type: "f", value: 0.1 },
      "p":   { type: "f", value: 2 },
      glowColor: { type: "c", value: new THREE.Color(0xeb7d30) },
      viewVector: { type: "v3", value: camera.position }
    },
    vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
    side: THREE.FrontSide,
    blending: THREE.AdditiveBlending,
    transparent: true
  }   );


  sunGlow = new THREE.Mesh( sunMesh.geometry.clone(), customMaterial.clone() );
    sunGlow.position = sunMesh.position;
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


function buildStarMapMesh(){
  var starGeometry  = new THREE.SphereGeometry(500, 32, 32);
  var starTexture = textures.starMap;
  starTexture.wrapS = starTexture.wrapT = THREE.RepeatWrapping; 
  var starMaterial = new THREE.MeshBasicMaterial( {map: starTexture } );
  starMaterial.side = THREE.BackSide;
  var starMesh = new THREE.Mesh(starGeometry, starMaterial);
  return starMesh;
}