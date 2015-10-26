function applyMatrix(rawVertices, transformationMatrix){
    for(var i= 0; i < rawVertices.length; i++){
        var rawVerticesW = 1;

        rawVertices[i].x = rawVertices[i].x *transformationMatrix[0][0] +
                        rawVertices[i].y *transformationMatrix[0][1] +
                        rawVertices[i].z *transformationMatrix[0][2] +
                        1 * transformationMatrix[0][3];

        rawVertices[i].y = rawVertices[i].x *transformationMatrix[1][0] +
                        rawVertices[i].y *transformationMatrix[1][1] +
                        rawVertices[i].z *transformationMatrix[1][2] +
                        1 * transformationMatrix[1][3];

        rawVertices[i].z = rawVertices[i].x *transformationMatrix[2][0] +
                        rawVertices[i].y *transformationMatrix[2][1] +
                        rawVertices[i].z *transformationMatrix[2][2] +
                        1 * transformationMatrix[2][3];

        rawVerticesW =  rawVertices.x * transformationMatrix[3][0] +
                        rawVertices.y * transformationMatrix[3][1] +
                        rawVertices.z * transformationMatrix[3][2] +
                        1 * transformationMatrix[3][3];

        rawVertices.x = rawVertices.x / rawVerticesW;
        rawVertices.y = rawVertices.y / rawVerticesW;
        rawVertices.z = rawVertices.z / rawVerticesW;
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

function convertHomogeneousToPhysical(homogeneous, physical){
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
