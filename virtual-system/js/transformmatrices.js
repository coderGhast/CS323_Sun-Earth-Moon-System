var tempMatrix3 = new THREE.Matrix3();
var tempMatrix4 = new THREE.Matrix4();

var rotationYTransformation = function (angle) {
    return [
        [Math.cos(angle), 0, Math.sin(angle), 0],
        [0,1,0,0],
        [-Math.sin(angle), 0, Math.cos(angle), 0],
        [0,0,0,1]
    ]; 
}

var rotationYMatrix3 = function (angle) {
        tempMatrix3.set(
            Math.cos(angle), 0, Math.sin(angle),
            0,1,0,
            -Math.sin(angle), 0, Math.cos(angle),
            0,0,0
            );
        
        return tempMatrix3;
}

var rotationYMatrix4 = function (angle) {     
        tempMatrix4.set(
            Math.cos(angle), 0, Math.sin(angle), 0,
            0,1,0,0,
            -Math.sin(angle), 0, Math.cos(angle), 0,
            0,0,0,1
            );
        
        return tempMatrix4;
}

var rotationXTransformation = function (angle) {
    return [
        [Math.cos(angle), -Math.sin(angle), 0, 0],
        [Math.sin(angle), Math.cos(angle), 0, 0],
        [0,0,1,0],
        [0,0,0,1]
    ];
}

var rotationXMatrix4 = function (angle) {        
        tempMatrix4.set(
            Math.cos(angle), -Math.sin(angle), 0, 0,
            Math.sin(angle), Math.cos(angle), 0, 0,
            0,0,1,0,
            0,0,0,1
            );
        
        return tempMatrix4;
}

var rotationZTransformation = function (angle) {
    return [
        [Math.cos(angle), -Math.sin(angle), 0, 0],
        [Math.sin(angle), Math.cos(angle), 0, 0],
        [0,0,1,0],
        [0,0,0,1]
    ];
}

var rotationZMatrix3 = function (angle) {     
        tempMatrix4.set(
            Math.cos(angle), -Math.sin(angle), 0,
            -Math.sin(angle), Math.cos(angle), 0,
            0,0,1,
            0,0,0
            );
        
        return tempMatrix4;
}

var rotationZMatrix4 = function (angle) {     
        tempMatrix4.set(
            Math.cos(angle), -Math.sin(angle), 0, 0,
            -Math.sin(angle), Math.cos(angle), 0, 0,
            0,0,1,0,
            0,0,0,1
            );
        
        return tempMatrix4;
}
