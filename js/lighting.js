var sunLight;
var sunCentreLight;

function buildSunLight(){
  var ambientLight = new THREE.AmbientLight(0x222222);
  scene.add(ambientLight);

  sunLight = new THREE.SpotLight(0xfff0e6, 0.7, 0, Math.PI / 2, 0);
  sunLight.lookAt(earth.earthMesh);
  sunLight.castShadow = true;
  sunLight.onlyShadow = true;
  sunLight.shadowBias = -0.0002;
  sunLight.shadowDarkness = 0.5;
  sunLight.shadowMapWidth = 300;
  sunLight.shadowMapHeight = 200;

  sunLight.shadowCameraNear = 20;
  sunLight.shadowCameraFar = 200;
  sunLight.shadowCameraFov = 300;
  // awesome for debugging - Shows the Shadow Camera lines
  sunLight.shadowCameraVisible = false;        
  scene.add(sunLight);

  sunCentreLight = new THREE.PointLight(0xfff0e6);
  sunCentreLight.position.set(0,0,0);
  scene.add(sunCentreLight);
}

function updateSunLight(){
  sunLight.target = earth.earthMesh;
}
