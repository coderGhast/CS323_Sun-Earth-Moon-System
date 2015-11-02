var earth = {
  earthMesh : buildEarthMesh(),
  computableEarthVertices : [],

  earthOrbitAngleThisStep : 0.0,
    updateEarth : function(){
        this.earthOrbitAngleThisStep-= controlValues.earthOrbitRotationSpeed * (Math.PI / 180);
        updateOrbit(earthMesh, sunMesh.position, earthDistanceFromSun, this.earthOrbitAngleThisStep);
        computableEarthVertices = updateRotation(controlValues.earthAxisRotationSpeed * (Math.PI / 180), earthMesh.geometry, computableEarthVertices);
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
      return earthMesh;
    }

var moon = {
    moonMesh : buildMoonMesh(),
    computableMoonVertices : [],
    moonOrbitAngleThisStep : 0.0,
    updateMoon : function(){
        this.moonOrbitAngleThisStep-= controlValues.moonOrbitRotationSpeed * (Math.PI / 180);
        updateOrbit(moonMesh, earthMesh.position, moonDistanceFromEarth, this.moonOrbitAngleThisStep);
        computableMoonVertices = updateRotation(controlValues.moonAxisRotationSpeed* (Math.PI / 180), moonMesh.geometry, computableMoonVertices);
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
    return moonMesh;
}

var sunGlow;
var sunFadeGlow;

var sun = {
    sunMesh : buildSunMesh,
    computableSunVertices : [],
    updateSun : function(){
        computableSunVertices = updateRotation(controlValues.sunAxisRotationSpeed * (Math.PI / 180), sunMesh.geometry, computableSunVertices);
    }
}

function buildSunMesh(){
  var sunGeometry = new THREE.SphereGeometry(sunSize, 32, 32 );
  var sunMaterial = new THREE.MeshPhongMaterial( {emissive: 0xeb7d30, emissiveMap: textures.sunDiffuse} );
  sunMesh = new THREE.Mesh( sunGeometry, sunMaterial );
  sunMesh.position.set(0,0,0);
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