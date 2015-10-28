var starMap = {
    starMesh : buildStarMapMesh()
}

function buildStarMapMesh(){
  var starGeometry  = new THREE.SphereGeometry(300, 32, 32);
  var starMaterial = new THREE.MeshBasicMaterial( {map: textures.starMap } );
  starMaterial.side = THREE.BackSide;
  starMesh = new THREE.Mesh(starGeometry, starMaterial);
  return starMesh;
}
