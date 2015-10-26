var sunMesh;
var earthMesh;
var moonMesh;
var starMesh;
var computableEarthVertices;
var computableSunVertices;
var computableMoonVertices;
var earthFaces;

function initScene() {
  setup();     
}

function setup() {
  setupUI();
  var ambientLight = new THREE.AmbientLight(0xdddddd);
  scene.add(ambientLight);
  setupScene();
}

function setupScene(){
  buildSunMesh();
  scene.add( sunMesh );
  buildSunLight();
  buildEarthMesh();
  scene.add( earthMesh );
  buildMoonMesh();  
  scene.add( moonMesh );
  buildStarMapMesh();
  scene.add( starMesh );

  setupHomogeoneousCoordinates();
  getFaces();
}

function buildSunMesh(){
  var sunGeometry = new THREE.SphereGeometry( 10, 32, 32 );
  //sunGeometry.position.set(0,0,0);
  var sunMaterial = new THREE.MeshPhongMaterial( {map: THREE.ImageUtils.loadTexture('images/sunmap.jpg')} );
  sunMesh = new THREE.Mesh( sunGeometry, sunMaterial );
  
}

function buildSunLight(){
    // hex, intensity, distance, decay
    var sunLight = new THREE.PointLight(0xffffff, 10, 0, 20);
    sunLight.position.set( 0, 0, 0 );
    scene.add(sunLight);

    var sphereSize = 1;
    var pointLightHelper = new THREE.PointLightHelper( sunLight, sphereSize );
    scene.add( pointLightHelper );

    var sunSelfIllumination = new THREE.PointLight(0xffffff, 10, 14, 0);
    sunSelfIllumination.position = sunMesh.position;
}

function buildEarthMesh(){
  var earthGeometry = new THREE.SphereGeometry(4, 32, 32);
  earthGeometry.dynamic = true;
  earthGeometry.verticesNeedUpdate = true;
  var earthDiffuseTexture = THREE.ImageUtils.loadTexture('images/earthmap1k.jpg');
  earthDiffuseTexture.minFilter = THREE.NearestFilter;
  var earthMaterial = new THREE.MeshPhongMaterial( {map: earthDiffuseTexture} );
  //var earthBumpMap = THREE.ImageUtils.loadTexture('images/earthbump1k.jpg');
  //earthBumpMap.minFilter = THREE.NearestFilter;
  //earthMaterial.bumpMap = earthBumpMap;
  //earthMaterial.bumpScale = 1;
  //earthMaterial.specularMap = THREE.ImageUtils.loadTexture('images/earthspec1k.jpg');
  //earthMaterial.specular = new THREE.Color('grey');
  earthMesh = new THREE.Mesh( earthGeometry, earthMaterial );
  earthMesh.castShadow = true;
}

function buildMoonMesh(){
  var moonGeometry = new THREE.SphereGeometry( 2, 32, 32 );
  var moonMaterial = new THREE.MeshPhongMaterial( {map: THREE.ImageUtils.loadTexture('images/moonmap1k.jpg')} );
  moonMesh = new THREE.Mesh( moonGeometry, moonMaterial );
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

function getFaces(){
    earthFaces = earthMesh.geometry.faces;
}

function update() {
  updateSun();
  updateEarth();
  updateMoon();
}

function updateSun(){
  var transformationMatrix;
  //computableSunVertices = multiplyMatrices(rotationYTransformation(sunAxisRotationSpeed), computableSunVertices);
  //applyHomogeneousToPhysical(computableSunVertices, sunMesh.geometry.vertices);

    for(var i=0; i< sunMesh.geometry.vertices.length; i++){
        sunMesh.geometry.vertices[i].applyMatrix4(rotationYMatrix4(sunAxisRotationSpeed));
    }
    for(var i=0; i< sunMesh.geometry.faces.length; i++){
        sunMesh.geometry.faces[i].normal.applyMatrix4(rotationYMatrix4(sunAxisRotationSpeed));
    }

  sunMesh.geometry.dynamic = true;
  sunMesh.geometry.verticesNeedUpdate = true;
  sunMesh.geometry.normalsNeedUpdate = true;
}



var earthRotationAngle = 0.0;
function updateEarth(){
    var x = earthDistanceFromSun * -Math.cos(earthRotationAngle * (Math.PI / 180));
    var z = earthDistanceFromSun * -Math.sin(earthRotationAngle * (Math.PI / 180));
    earthRotationAngle-= earthOrbitRotationSpeed;

    earthMesh.position.x = sunMesh.position.x + x;
    earthMesh.position.z = sunMesh.position.z + z;
    earthMesh.rotation.x = earthMesh.rotation.x = (23.5/180)*Math.PI;

    var matrix = rotationYMatrix4(earthRotationAngle);
    var normalMatrix = new THREE.Matrix3().getNormalMatrix( matrix );

        for ( var i = 0, il = earthMesh.geometry.vertices.length; i < il; i ++ ) {

            var vertex = earthMesh.geometry.vertices[ i ];
            vertex.applyMatrix4( matrix );

        }

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

    // var transformationMatrix;
    // transformationMatrix = rotationYTransformation(earthAxisRotationSpeed);
    // computableEarthVertices = multiplyMatrices(transformationMatrix, computableEarthVertices);
    // applyHomogeneousToPhysical(computableEarthVertices, earthMesh.geometry.vertices);

    // updateFaceNormals(normalMatrix, earthMesh.geometry.faces);

    // if ( earthMesh.geometry.boundingBox !== null ) {
    //     earthMesh.geometry.computeBoundingBox();
    // }

    // if (earthMesh.geometry.boundingSphere !== null ) {
    //     earthMesh.geometry.computeBoundingSphere();
    // }

    // earthMesh.geometry.verticesNeedUpdate = true;
    // earthMesh.geometry.normalsNeedUpdate = true;
}

var moonRotationAngle = 0.0;
function updateMoon(){
  var x = moonDistanceFromEarth * -Math.cos(moonRotationAngle * (Math.PI / 180));
  var z = moonDistanceFromEarth * -Math.sin(moonRotationAngle * (Math.PI / 180));
  moonRotationAngle-= moonOrbitRotationSpeed;
  var transformationMatrix;

  transformationMatrix = rotationYTransformation(moonAxisRotationSpeed);
  computableMoonVertices = multiplyMatrices(transformationMatrix, computableMoonVertices);
  
  applyHomogeneousToPhysical(computableMoonVertices, moonMesh.geometry.vertices);

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
