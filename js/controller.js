var sunMesh;
var earthMesh;
var moonMesh;
var starMesh;
var computableEarthVertices;
var computableSunVertices;
var computableMoonVertices;
var sunLight;
var sunGlow;
var customMaterial;

function initScene() {
  setup();     
}

function setup() {
  setupUI();
  var ambientLight = new THREE.AmbientLight(0x444444);
  scene.add(ambientLight);
  setupScene();
}

function setupScene(){
  buildSunMesh();
  scene.add( sunMesh );

  buildSunGlow();

  buildSunLight();
  buildEarthMesh();
  scene.add( earthMesh );
  buildMoonMesh();  
  scene.add( moonMesh );
  buildStarMapMesh();
  scene.add( starMesh );

  setupHomogeoneousCoordinates();
}

function buildSunGlow(){
  customMaterial = new THREE.ShaderMaterial( 
  {
      uniforms: 
    { 
      "c":   { type: "f", value: 0.2 },
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
  sunGlow.scale.multiplyScalar(1.5);
  scene.add( sunGlow );
}

function buildSunMesh(){
  var sunGeometry = new THREE.SphereGeometry(sunSize, 32, 32 );
  //sunGeometry.position.set(0,0,0);
  var sunMaterial = new THREE.MeshPhongMaterial( {map: THREE.ImageUtils.loadTexture('images/sunmap.jpg')} );
  sunMesh = new THREE.Mesh( sunGeometry, sunMaterial );
  
}

function buildSunLight(){
    // hex, intensity, distance, decay
    sunLight = new THREE.PointLight(0xFFE0CC, 10, 150, 5);
    sunLight.position.set( 0, 0, 0);
    scene.add(sunLight);

    var sunSelfIllumination = new THREE.PointLight(0xffffff, 10, 14, 0);
    sunSelfIllumination.position = sunMesh.position;
}

function buildEarthMesh(){
  var earthGeometry = new THREE.SphereGeometry(earthSize, 32, 32);
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
  earthMesh.castShadow = true;
  earthMesh.receiveShadow = true;
}

function buildMoonMesh(){
  var moonGeometry = new THREE.SphereGeometry( moonSize, 32, 32 );
  var moonMaterial = new THREE.MeshPhongMaterial( {map: THREE.ImageUtils.loadTexture('images/moonmap1k.jpg')} );
  moonMesh = new THREE.Mesh( moonGeometry, moonMaterial );
  moonMesh.castShadow = true;
  moonMesh.receiveShadow = true;
}

function buildStarMapMesh(){
  var starGeometry  = new THREE.SphereGeometry(150, 32, 32);
  var starMaterial = new THREE.MeshBasicMaterial( {map: THREE.ImageUtils.loadTexture('images/starmap_s.png')} );
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
  updateSunGlow();
  updateEarth();
  updateMoon();
}

function updateSun(){
  var matrix = rotationYMatrix4(sunAxisRotationSpeed);
  var normalMatrix = new THREE.Matrix3().getNormalMatrix( matrix );

  var transformationMatrix;
  computableSunVertices = multiplyMatrices(rotationYTransformation(sunAxisRotationSpeed), computableSunVertices);
  applyHomogeneousToPhysical(computableSunVertices, sunMesh.geometry.vertices);

    for ( var i = 0, il = sunMesh.geometry.faces.length; i < il; i ++ ) {

        var face = sunMesh.geometry.faces[ i ];
        face.normal.applyMatrix3( normalMatrix ).normalize();

        for ( var j = 0, jl = face.vertexNormals.length; j < jl; j ++ ) {

            face.vertexNormals[ j ].applyMatrix3( normalMatrix ).normalize();

        }

    }

    if ( sunMesh.geometry.boundingBox !== null ) {

        sunMesh.geometry.computeBoundingBox();

    }

    if ( sunMesh.geometry.boundingSphere !== null ) {

        sunMesh.geometry.computeBoundingSphere();

    }

  sunMesh.geometry.verticesNeedUpdate = true;
  sunMesh.geometry.normalsNeedUpdate = true;
}

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function updateSunGlow(){
    sunGlow.material.uniforms.viewVector.value = 
    new THREE.Vector3().subVectors( camera.position, sunGlow.position );
}


var earthRotationAngle = 0.0;
var delta = new Date().getTime();
function updateEarth(){
    var x = earthDistanceFromSun * -Math.cos(earthRotationAngle * (Math.PI / 180));
    var z = earthDistanceFromSun * -Math.sin(earthRotationAngle * (Math.PI / 180));
    earthRotationAngle-= earthOrbitRotationSpeed;

    earthMesh.position.x = sunMesh.position.x + x;
    earthMesh.position.z = sunMesh.position.z + z;
    earthMesh.rotation.x = earthMesh.rotation.x = (earthAxialTilt/180)*Math.PI;

    var matrix = rotationYMatrix4(earthAxisRotationSpeed);
    var normalMatrix = new THREE.Matrix3().getNormalMatrix( matrix );

    var transformationMatrix;
    transformationMatrix = rotationYTransformation(earthAxisRotationSpeed);
    computableEarthVertices = multiplyMatrices(transformationMatrix, computableEarthVertices);
    applyHomogeneousToPhysical(computableEarthVertices, earthMesh.geometry.vertices);


    for ( var i = 0, il = earthMesh.geometry.faces.length; i < il; i ++ ) {

        var face = earthMesh.geometry.faces[ i ];
        face.normal.applyMatrix3( normalMatrix ).normalize();

        for ( var j = 0, jl = face.vertexNormals.length; j < jl; j ++ ) {

            face.vertexNormals[ j ].applyMatrix3( normalMatrix ).normalize();

        }

    }

    if ( earthMesh.geometry.boundingBox !== null ) {

        earthMesh.geometry.computeBoundingBox();

    }

    if ( earthMesh.geometry.boundingSphere !== null ) {

        earthMesh.geometry.computeBoundingSphere();

    }

    earthMesh.geometry.verticesNeedUpdate = true;
    earthMesh.geometry.normalsNeedUpdate = true;
}

var moonRotationAngle = 0.0;
function updateMoon(){
  var x = moonDistanceFromEarth * -Math.cos(moonRotationAngle * (Math.PI / 180));
  var z = moonDistanceFromEarth * -Math.sin(moonRotationAngle * (Math.PI / 180));
  moonRotationAngle-= moonOrbitRotationSpeed;
  var transformationMatrix;

  var matrix = rotationYMatrix4(moonAxisRotationSpeed);
  var normalMatrix = new THREE.Matrix3().getNormalMatrix( matrix );
  
  applyHomogeneousToPhysical(computableMoonVertices, moonMesh.geometry.vertices);

  transformationMatrix = rotationYTransformation(moonAxisRotationSpeed);
  computableMoonVertices = multiplyMatrices(transformationMatrix, computableMoonVertices);

  for ( var i = 0, il = moonMesh.geometry.faces.length; i < il; i ++ ) {

        var face = moonMesh.geometry.faces[ i ];
        face.normal.applyMatrix3( normalMatrix ).normalize();

        for ( var j = 0, jl = face.vertexNormals.length; j < jl; j ++ ) {

            face.vertexNormals[ j ].applyMatrix3( normalMatrix ).normalize();

        }

    }

    if ( moonMesh.geometry.boundingBox !== null ) {

        moonMesh.geometry.computeBoundingBox();

    }

    if ( moonMesh.geometry.boundingSphere !== null ) {

        moonMesh.geometry.computeBoundingSphere();

    }

  moonMesh.position.x = earthMesh.position.x + x;
  moonMesh.position.z = earthMesh.position.z + z;
  moonMesh.rotation.x = moonMesh.rotation.x = (moonAxialTilt/180)*Math.PI;

  moonMesh.geometry.normalsNeedUpdate = true;
  moonMesh.geometry.verticesNeedUpdate = true;
}


function renderScene() {
  requestAnimationFrame(renderScene); 
  update(); 
  renderer.render(scene, camera);
}
