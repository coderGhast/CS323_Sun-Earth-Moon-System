var sunGlow;
var sunFadeGlow;

var sun = {
    sunMesh : buildSunMesh,
    computableSunVertices : [],
    updateSun : function(){
        computableSunVertices = updateRotation(sunAxisRotationSpeed * (Math.PI / 180), sunMesh.geometry, computableSunVertices);
    }
}

function buildSunMesh(){
  var sunGeometry = new THREE.SphereGeometry(sunSize, 32, 32 );
  var sunMaterial = new THREE.MeshPhongMaterial( {map: textures.sunDiffuse} );
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



