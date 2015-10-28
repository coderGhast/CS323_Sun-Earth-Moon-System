var earthAndMoon;
var earth = {
  earthMesh : buildEarthMesh(),
  computableEarthVertices : [],

  earthOrbitAngleThisStep : 0.0,
    updateEarth : function(){
        this.earthOrbitAngleThisStep-= controlValues.earthOrbitRotationSpeed * (Math.PI / 180);
        updateOrbit(earthAndMoon, sunMesh.position, earthDistanceFromSun, this.earthOrbitAngleThisStep);
        computableEarthVertices = updateRotation(controlValues.earthAxisRotationSpeed * (Math.PI / 180), earthMesh.geometry, computableEarthVertices);
    }
  };

function buildEarthMesh(){
      var earthGeometry = new THREE.SphereGeometry(earthSize, 32, 32);
      earthGeometry.dynamic = true;

      var earthMaterial = new THREE.MeshPhongMaterial( {map: textures.earthDiffuse } );
      earthMaterial.bumpMap = textures.earthBumpMap;
      earthMaterial.bumpScale = 0.1;
      earthMaterial.specularMap = textures.earthSpecularMap;
      earthMaterial.specular = new THREE.Color(0x66A3FF);
      earthMaterial.shininess = 5;

      earthMesh = new THREE.Mesh( earthGeometry, earthMaterial );
      earthMesh.castShadow = true;
      earthMesh.receiveShadow = true;

      earthMesh.rotation.x = (earthAxialTilt/180)*Math.PI;
      return earthMesh;
    }
