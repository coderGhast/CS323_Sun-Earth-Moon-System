var sunLight;
var sunCentreLight;

function buildSunLight(){
  var ambientLight = new THREE.AmbientLight(0x222222);
  scene.add(ambientLight);

  sunLight = new THREE.SpotLight(0xfff0e6, 1, 0);
  sunLight.castShadow = true;
  sunLight.position.set(0, 0, 0);
  sunLight.target = earthMesh;    
  sunMesh.add(sunLight);
}
