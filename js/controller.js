var sunMesh;
var earthMesh;
var moonMesh;
var starMesh;
var computableEarthVertices;
var computableSunVertices;
var computableMoonVertices;

function initScene() {
  setup();     
}

function setup() {
  setupUI();
  setupScene();
}

function setupScene(){
  buildSunMesh();
  scene.add( sunMesh );
  buildEarthMesh();
  scene.add( earthMesh );
  buildMoonMesh();  
  scene.add( moonMesh );
  buildStarMapMesh();
  scene.add( starMesh );

  setupHomogeoneousCoordinates();
}

function buildSunMesh(){
  var sunGeometry = new THREE.SphereGeometry( 10, 32, 32 );
  var sunMaterial = new THREE.MeshPhongMaterial( {map: THREE.ImageUtils.loadTexture('images/sunmap.jpg')} );
  sunMesh = new THREE.Mesh( sunGeometry, sunMaterial );
  
}

function buildEarthMesh(){
  earthObject = new THREE.Object3D();
  var earthGeometry = new THREE.SphereGeometry(4, 64, 64);
  earthGeometry.dynamic = true;
  earthGeometry.verticesNeedUpdate = true;
  var earthDiffuseTexture = THREE.ImageUtils.loadTexture('images/earthmap1k.jpg');
  earthDiffuseTexture.minFilter = THREE.NearestFilter;
  var earthMaterial = new THREE.MeshPhongMaterial( {map: earthDiffuseTexture} );
  var earthBumpMap = THREE.ImageUtils.loadTexture('images/earthbump1k.jpg');
  earthBumpMap.minFilter = THREE.NearestFilter;
  earthMaterial.bumpMap = earthBumpMap;
  earthMaterial.bumpScale = 1;
  earthMaterial.specularMap = THREE.ImageUtils.loadTexture('images/earthspec1k.jpg');
  earthMaterial.specular = new THREE.Color('grey');
  earthMesh = new THREE.Mesh( earthGeometry, earthMaterial );
  earthMesh.position.x +=20;
}

function buildMoonMesh(){
  var moonGeometry = new THREE.SphereGeometry( 2, 32, 32 );
  var moonMaterial = new THREE.MeshPhongMaterial( {map: THREE.ImageUtils.loadTexture('images/moonmap1k.jpg')} );
  moonMesh = new THREE.Mesh( moonGeometry, moonMaterial );
  moonMesh.position.x += 32;
}

function buildStarMapMesh(){
  var starGeometry  = new THREE.SphereGeometry(150, 32, 32);
  var starMaterial = new THREE.MeshBasicMaterial( {map: THREE.ImageUtils.loadTexture('images/starmap_s.gif')} );
  starMaterial.side = THREE.BackSide;
  starMesh = new THREE.Mesh(starGeometry, starMaterial);
}

function setupHomogeoneousCoordinates(){
  computableSunVertices = convertPhysicalToHomogeneous(sunMesh.geometry.vertices);
  computableEarthVertices = convertPhysicalToHomogeneous(earthMesh.geometry.vertices);
  computableMoonVertices = convertPhysicalToHomogeneous(moonMesh.geometry.vertices);
}

function update() {
  updateSun();
  updateEarth();
  updateMoon();


}

function updateSun(){
  var transformationMatrix;
  computableSunVertices = multiplyMatrices(rotationYTransformation(sunAxisRotationSpeed), computableSunVertices);
  convertHomogeneousToPhysical(computableSunVertices, sunMesh.geometry.vertices);

  sunMesh.geometry.dynamic = true;
  sunMesh.geometry.verticesNeedUpdate = true;
}

var earthRotationAngle = 0.0;
function updateEarth(){
  var x = earthDistanceFromSun * -Math.cos(earthRotationAngle * (Math.PI / 180));
  var z = earthDistanceFromSun * -Math.sin(earthRotationAngle * (Math.PI / 180));
  earthRotationAngle-= earthOrbitRotationSpeed;
  var transformationMatrix;
  //transformationMatrix = multiplyMatrices(rotationZTransformation(23.5), rotationYTransformation(earthAxisRotationSpeed));
  transformationMatrix = rotationYTransformation(earthAxisRotationSpeed);
  computableEarthVertices = multiplyMatrices(transformationMatrix, computableEarthVertices);
  
  convertHomogeneousToPhysical(computableEarthVertices, earthMesh.geometry.vertices);

  earthMesh.position.x = sunMesh.position.x + x;
  earthMesh.position.z = sunMesh.position.z + z;
  earthMesh.rotation.x = earthMesh.rotation.x = (23.5/180)*Math.PI;

  earthMesh.geometry.dynamic = true;
  earthMesh.geometry.verticesNeedUpdate = true;
}

var moonRotationAngle = 0.0;
function updateMoon(){
  var x = moonDistanceFromEarth * -Math.cos(moonRotationAngle * (Math.PI / 180));
  var z = moonDistanceFromEarth * -Math.sin(moonRotationAngle * (Math.PI / 180));
  moonRotationAngle-= moonOrbitRotationSpeed;
  var transformationMatrix;

  transformationMatrix = rotationYTransformation(moonAxisRotationSpeed);
  computableMoonVertices = multiplyMatrices(transformationMatrix, computableMoonVertices);
  
  convertHomogeneousToPhysical(computableMoonVertices, moonMesh.geometry.vertices);

  moonMesh.position.x = earthMesh.position.x + x;
  moonMesh.position.z = earthMesh.position.z + z;

  moonMesh.geometry.dynamic = true;
  moonMesh.geometry.verticesNeedUpdate = true;
}


function renderScene() {
  requestAnimationFrame(renderScene); 
  update(); 
  renderer.render(scene, camera);
}
