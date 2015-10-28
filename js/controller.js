var sunMesh;
var earthMesh;
var moonMesh;
var earthAndMoon;
var starMesh;
var computableEarthVertices;
var computableSunVertices;
var computableMoonVertices;
var sunLight;
var sunCentreLight;
var sunGlow;
var sunFadeGlow;
var customMaterial;

function initScene() {
  setup();     
}

function setup() {
  setupUI();
  var ambientLight = new THREE.AmbientLight(0x222222);
  scene.add(ambientLight);
  setupScene();
}

function setupScene(){
  buildSunMesh();
  scene.add( sunMesh );

  buildSunGlow();


  buildEarthMesh();
  buildMoonMesh();  
  buildSunLight();

  earthAndMoon = new THREE.Object3D();
  earthAndMoon.add( earthMesh )
  earthAndMoon.add( moonMesh );
  scene.add(earthAndMoon);

  buildStarMapMesh();
  scene.add( starMesh );

  setupHomogeoneousCoordinates();
}

function buildSunGlow(){
  customMaterial = new THREE.ShaderMaterial( 
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

function buildSunMesh(){
  var sunGeometry = new THREE.SphereGeometry(sunSize, 32, 32 );
  var sunTexture = THREE.ImageUtils.loadTexture('images/sunmap.jpg');
  sunTexture.minFilter = THREE.NearestFilter;
  var sunMaterial = new THREE.MeshPhongMaterial( {map: sunTexture} );
  sunMesh = new THREE.Mesh( sunGeometry, sunMaterial );
  sunMesh.position.set(0,0,0);
}

function buildSunLight(){
  sunLight = new THREE.SpotLight(0xfff0e6, 0.7, 0, Math.PI / 2, 0);
  sunLight.lookAt(earthMesh);
  sunLight.castShadow = true;
  sunLight.shadowBias = -0.0002;
  sunLight.shadowDarkness = 0.5;
  sunLight.shadowMapWidth = 1024;
  sunLight.shadowMapHeight = 1024;
  sunLight.onlyShadow = true;

  sunLight.shadowCameraNear = 20;
  sunLight.shadowCameraFar = 150;
  sunLight.shadowCameraFov = 300;
  // awesome for debugging - Shows the Shadow Camera lines
  sunLight.shadowCameraVisible = false;        
  scene.add(sunLight);

  sunCentreLight = new THREE.PointLight(0xfff0e6);
  sunCentreLight.position.set(0,0,0);
  scene.add(sunCentreLight);
}

function buildEarthMesh(){
  var earthGeometry = new THREE.SphereGeometry(earthSize, 32, 32);
  earthGeometry.dynamic = true;
  var earthDiffuseTexture = THREE.ImageUtils.loadTexture('images/earthmap1k.jpg');
  earthDiffuseTexture.minFilter = THREE.NearestFilter;
  var earthMaterial = new THREE.MeshPhongMaterial( {map: earthDiffuseTexture} );
  var earthBumpMap = THREE.ImageUtils.loadTexture('images/earthbump1k.jpg');
  earthBumpMap.minFilter = THREE.NearestFilter;
  earthMaterial.bumpMap = earthBumpMap;
  earthMaterial.bumpScale = 0.3;
  var earthSpecularMap = THREE.ImageUtils.loadTexture('images/earthspec1k.jpg');
  earthSpecularMap.minFilter = THREE.NearestFilter;
  earthMaterial.specularMap = earthSpecularMap;
  earthMaterial.specular = new THREE.Color(0x66A3FF);
  earthMaterial.shininess = 5;

  earthMesh = new THREE.Mesh( earthGeometry, earthMaterial );
  earthMesh.castShadow = true;
  earthMesh.receiveShadow = true;
}

function buildMoonMesh(){
  var moonGeometry = new THREE.SphereGeometry( moonSize, 32, 32 );
  var moonDiffuseTexture = THREE.ImageUtils.loadTexture('images/moonmap1k.jpg');
  moonDiffuseTexture.minFilter = THREE.NearestFilter;
  var moonMaterial = new THREE.MeshPhongMaterial( {map: moonDiffuseTexture} );
  moonMesh = new THREE.Mesh( moonGeometry, moonMaterial );
  moonMesh.geometry.dynamic = true;
  moonMesh.castShadow = true;
  moonMesh.receiveShadow = true;

}

function buildStarMapMesh(){
  var starGeometry  = new THREE.SphereGeometry(300, 32, 32);
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
  sunLight.target = earthMesh;
  updateEarth();
  updateMoon();


}

function updateSun(){
  var matrix = rotationYMatrix4(sunAxisRotationSpeed * (Math.PI / 180));
  var normalMatrix = new THREE.Matrix3().getNormalMatrix( matrix );

  var transformationMatrix;
  computableSunVertices = multiplyMatrices(rotationYTransformation(sunAxisRotationSpeed * (Math.PI / 180)), computableSunVertices);
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

var glowSize = 1.1;;
var fading = false;
function updateSunGlow(){
   sunGlow.material.uniforms.viewVector.value =  new THREE.Vector3().subVectors( camera.position, sunGlow.position );

   sunFadeGlow.material.uniforms.viewVector.value = new THREE.Vector3().subVectors( camera.position, sunFadeGlow.position );
}


var earthRotationAngle = 0.0;
function updateEarth(){
    var x = earthDistanceFromSun * -Math.cos(earthRotationAngle);
    var z = earthDistanceFromSun * -Math.sin(earthRotationAngle);
    earthRotationAngle-= earthOrbitRotationSpeed * (Math.PI / 180);

    earthAndMoon.position.x = sunMesh.position.x + x;
    earthAndMoon.position.z = sunMesh.position.z + z;
    earthMesh.rotation.x = (earthAxialTilt/180)*Math.PI;

    var matrix = rotationYMatrix4(earthAxisRotationSpeed* (Math.PI / 180));
    var normalMatrix = new THREE.Matrix3().getNormalMatrix( matrix );

    var transformationMatrix;
    transformationMatrix = rotationYTransformation(earthAxisRotationSpeed* (Math.PI / 180));
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
  var x = moonDistanceFromEarth * -Math.cos(moonRotationAngle);
  var z = moonDistanceFromEarth * -Math.sin(moonRotationAngle);
  var y = moonAxialTilt * Math.sin(moonOrbitalTilt) * moonRotationAngle;
  moonRotationAngle-= moonOrbitRotationSpeed;

  moonMesh.position.x = earthMesh.position.x + x;
  moonMesh.position.z = earthMesh.position.z + z;
  moonMesh.position.y = Math.cos(y);
  moonMesh.rotation.x = (moonAxialTilt/180)*Math.PI;

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

  moonMesh.geometry.normalsNeedUpdate = true;
  moonMesh.geometry.verticesNeedUpdate = true;
}


function renderScene() {
  requestAnimationFrame(renderScene); 
  update(); 
  renderer.render(scene, camera);
}
