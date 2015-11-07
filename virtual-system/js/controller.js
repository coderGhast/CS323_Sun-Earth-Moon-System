function initScene() {
  setup();     
}

function update() {
  sun.updateSun();
  updateSunGlow();
  earth.updateEarth();
  moon.updateMoon();
  moon.updateMoonOrbitLine();
}

function renderScene() {
  requestAnimationFrame(renderScene); 
  render();
  controls.update();
  if(!simulationPaused){
      update(); 
  }
}

function setup() {
  setupUI();
  setupScene();
}

function setupScene(){
  buildSunMesh();
  scene.add( sunMesh );

  buildSunGlow();

  buildEarthMesh();
  buildMoonMesh();  
  buildSunLight();

  var earthAndMoon = new THREE.Object3D();
  earthAndMoon.add(earthMesh);
  earthAndMoon.add(moonMesh);
  scene.add(earthAndMoon);

  scene.add( buildStarMapMesh() );

  earthOrbitLine = drawOrbitLine(earthOrbitPoints);
  moonOrbitLine = drawOrbitLine(moonOrbitPoints);

  setupHomogeoneousCoordinates();
}

function setupHomogeoneousCoordinates(){
  computableSunVertices = convertPhysicalToHomogeneous(sunMesh.geometry.vertices);
  computableEarthVertices = convertPhysicalToHomogeneous(earthMesh.geometry.vertices);
  computableMoonVertices = convertPhysicalToHomogeneous(moonMesh.geometry.vertices);
}

