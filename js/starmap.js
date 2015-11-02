var starMap = {
    starMesh : buildStarMapMesh()
}

function buildStarMapMesh(){
  var starGeometry  = new THREE.SphereGeometry(500, 32, 32);
  var starTexture = textures.starMap;
  starTexture.wrapS = starTexture.wrapT = THREE.RepeatWrapping; 
  var starMaterial = new THREE.MeshBasicMaterial( {map: starTexture } );
  starMaterial.side = THREE.BackSide;
  starMesh = new THREE.Mesh(starGeometry, starMaterial);
  return starMesh;
}
