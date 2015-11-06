var sunLight;
var sunCentreLight;

function buildSunLight(){
  var ambientLight = new THREE.AmbientLight(0x222222);
  scene.add(ambientLight);

  sunLight = new THREE.SpotLight(0xfff0e6, 1, 0);
  sunLight.castShadow = true;

  sunLight.shadowCameraNear = 20;
  sunLight.shadowCameraFar = 190;
  sunLight.shadowCameraFov = 45;
  // awesome for debugging - Shows the Shadow Camera lines
   //scene.add(new THREE.CameraHelper( sunLight.shadow.camera ));

  sunLight.target = earthMesh;    
  sunLight.position.set(0, 0, 0);
  sunMesh.add(sunLight);

}
