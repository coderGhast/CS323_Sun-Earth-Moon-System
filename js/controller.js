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
  if(!simulationPaused){
      update(); 
  }
  controls.update();
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

  buildEarthMesh();
  buildMoonMesh();  
  buildSunLight();

  scene.add(earthMesh);
  scene.add(moonMesh);

  buildStarMapMesh();
  scene.add( starMesh );

  earthOrbitLine = drawOrbitLine(earthOrbitPoints);
  moonOrbitLine = drawOrbitLine(moonOrbitPoints);

  setupHomogeoneousCoordinates();
}

function setupHomogeoneousCoordinates(){
  computableSunVertices = convertPhysicalToHomogeneous(sunMesh.geometry.vertices);
  computableEarthVertices = convertPhysicalToHomogeneous(earthMesh.geometry.vertices);
  computableMoonVertices = convertPhysicalToHomogeneous(moonMesh.geometry.vertices);
}

