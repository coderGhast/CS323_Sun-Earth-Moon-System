function updateYRotation(rotation, geometry, computableVertices){
    computableVertices = multiplyMatrices(rotationYTransformation(rotation), computableVertices);
    applyHomogeneousToPhysical(computableVertices, geometry.vertices);
    var normalMatrix = tempMatrix3.getNormalMatrix(rotationYMatrix4(rotation));
    updateFacesAndNormals(normalMatrix, geometry);
    geometry.verticesNeedUpdate = true;
    geometry.normalsNeedUpdate = true;

    return computableVertices;
}

function updateFacesAndNormals(normalMatrix, geometry){
    for ( var i = 0, il = geometry.faces.length; i < il; i ++ ) {
        var face = geometry.faces[ i ];
        face.normal.applyMatrix3( normalMatrix ).normalize();
        for ( var j = 0, jl = face.vertexNormals.length; j < jl; j ++ ) {
            face.vertexNormals[ j ].applyMatrix3( normalMatrix ).normalize();
        }
    }

    if ( geometry.boundingBox !== null ) {
        geometry.computeBoundingBox();
    }
    if ( geometry.boundingSphere !== null ) {
        geometry.computeBoundingSphere();
    }
}

function rearrangeVertices(coordinateArray){
    var result = [];
    for(var x = 0; x < 3; x++){
        result[x] = [];    
        for(var y = 0; y < coordinateArray.length; y++){ 
            result[x][y] = 0;
        }  
    } 

    for(var i=0; i < coordinateArray.length; i++){
        result[0][i] = coordinateArray[i].x;
    }
    for(var i=0; i < coordinateArray.length; i++){
        result[1][i] = coordinateArray[i].y;
    }
    for(var i=0; i < coordinateArray.length; i++){
        result[2][i] = coordinateArray[i].z;
    }

    return result;
}

function convertPhysicalToHomogeneous(coordinateArray){
    var result = rearrangeVertices(coordinateArray);
    result[3] = [];
    for(var i=0; i < result[0].length; i++){
        result[3][i] = 1;
    }

    return result;
}

function applyHomogeneousToPhysical(homogeneous, physical){
    for(var x = 0; x < homogeneous[0].length; x++){
        physical[x].setX(homogeneous[0][x]);
        physical[x].setY(homogeneous[1][x]);
        physical[x].setZ(homogeneous[2][x]); 
    }
}

function multiplyMatrices(matrixOne, matrixTwo){
    if(matrixOne[0].length != matrixTwo.length){
        alert("MatrixOne columns do not match MatrixTwo rows. Cannot compute!");
    } else {
        var result = [];
    for(var x = 0; x < matrixOne.length; x++){
        result[x] = [];    
        for(var y = 0; y < matrixTwo[0].length; y++){ 
            result[x][y] = 0;    
        }    
    }

    for(var r=0; r < matrixTwo.length; r++){
        for(var c=0; c < matrixTwo[0].length; c++){
            for(var i=0; i < matrixOne[0].length; i++){
                result[r][c] += (matrixOne[r][i] * matrixTwo[i][c]);
            }
        }
    }

    return result;
    }
}
