var moon = {
    moonMesh : buildMoonMesh(),
    computableMoonVertices : [],
    moonOrbitAngleThisStep : 0.0,
    updateMoon : function(){
        this.moonOrbitAngleThisStep-= controlValues.moonOrbitRotationSpeed * (Math.PI / 180);
        updateOrbit(moonMesh, earth.earthMesh.position, moonDistanceFromEarth, this.moonOrbitAngleThisStep);
        computableMoonVertices = updateRotation(controlValues.moonAxisRotationSpeed* (Math.PI / 180), moonMesh.geometry, computableMoonVertices);
    }
}

function buildMoonMesh(){
    var moonGeometry = new THREE.SphereGeometry( moonSize, 32, 32 );
    var moonMaterial = new THREE.MeshPhongMaterial( {map: textures.moonDiffuse} );
    moonMaterial.bumpMap = textures.moonBumpMap;
    moonMaterial.bumpScale = 0.3;
    moonMaterial.shininess = 0;
    moonMesh = new THREE.Mesh( moonGeometry, moonMaterial );
    moonMesh.geometry.dynamic = true;
    moonMesh.castShadow = true;
    moonMesh.receiveShadow = true;
    moonMesh.rotation.x = (moonAxialTilt/180)*Math.PI;
    return moonMesh;
}
