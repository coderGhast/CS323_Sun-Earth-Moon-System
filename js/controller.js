function initScene() {
  setup();     
}

function update() {
  sun.updateSun();
  updateSunGlow();
  updateSunLight();
  earth.updateEarth();
  moon.updateMoon();
}

function renderScene() {
  requestAnimationFrame(renderScene); 
  speedAdjustments(20);
  update(); 
  render();
}

function setup() {
  setupUI();
  setupScene();
}

function setupScene(){
  buildSunMesh();
  scene.add( sunMesh );

  buildSunGlow();

  buildMoonMesh();  
  buildSunLight();

  earthAndMoon = new THREE.Object3D();
  earthAndMoon.add( earth.earthMesh )
  earthAndMoon.add( moonMesh );
  scene.add(earthAndMoon);

  buildStarMapMesh();
  scene.add( starMesh );

  setupHomogeoneousCoordinates();
}

function setupHomogeoneousCoordinates(){
  computableSunVertices = convertPhysicalToHomogeneous(sunMesh.geometry.vertices);
  computableEarthVertices = convertPhysicalToHomogeneous(earth.earthMesh.geometry.vertices);
  computableMoonVertices = convertPhysicalToHomogeneous(moonMesh.geometry.vertices);
}

