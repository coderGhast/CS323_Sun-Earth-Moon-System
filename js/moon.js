var moon = {
    moonMesh : buildMoonMesh(),
    computableMoonVertices : [],
    moonOrbitAngleThisStep : 0.0,
    updateMoon : function(){
        this.moonOrbitAngleThisStep-= controlValues.moonOrbitRotationSpeed * (Math.PI / 180);
        updateOrbit(moonMesh, earthMesh.position, moonDistanceFromEarth, this.moonOrbitAngleThisStep);
        computableMoonVertices = updateRotation(controlValues.moonAxisRotationSpeed* (Math.PI / 180), moonMesh.geometry, computableMoonVertices);
    }
}

function buildMoonMesh(){
    var moonGeometry = new THREE.SphereGeometry( moonSize, 32, 32 );
    var moonMaterial = new THREE.MeshPhongMaterial( {
        map: textures.moonDiffuse,
        bumpMap: textures.moonBumpMap,
        bumpScale: 0.3
    } );
    moonMesh = new THREE.Mesh( moonGeometry, moonMaterial );
    moonMesh.castShadow = true;
    moonMesh.receiveShadow = true;
    moonMesh.rotation.x = (moonAxialTilt/180)*Math.PI;
    return moonMesh;
}
