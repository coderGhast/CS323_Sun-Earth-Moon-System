var shiftByXMatrix = function (amount) {
    /*var shiftMatrix = new THREE.Matrix4();
    
    shiftMatrix.set(
        1, 0, 0, amount,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
        );
    
    return shiftMatrix; */

    return [
        [1, 0, 0, amount],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ];
}

var shiftByYMatrix = function (amount) {
    return [
        [1, 0, 0, 0],
        [0, 1, 0, amount],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ];

    // var shiftMatrix = new THREE.Matrix4();
    
    // shiftMatrix.set(
    //     1, 0, 0, 0,
    //     0, 1, 0, amount,
    //     0, 0, 1, 0,
    //     0, 0, 0, 1
    //     );
    
    // return shiftMatrix;
}

var shiftByZMatrix = function (amount) {
    return [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, amount],
        [0, 0, 0, 1]
    ];

    // var shiftMatrix = new THREE.Matrix4();
    
    // shiftMatrix.set(
    //     1, 0, 0, 0,
    //     0, 1, 0, 0,
    //     0, 0, 1, amount,
    //     0, 0, 0, 1
    //     );
    
    // return shiftMatrix;
}

var rotationYTransformation = function (theta) {
var angle = theta * (Math.PI / 180);
    return [
        [Math.cos(angle), 0, Math.sin(angle), 0],
        [0,1,0,0],
        [-Math.sin(angle), 0, Math.cos(angle), 0],
        [0,0,0,1]
    ]; 
}

var rotationMatrix3 = new THREE.Matrix4();
var rotationYMatrix3 = function (theta) {
    var angle = theta * (Math.PI / 180);
        
        rotationMatrix4.set(
            Math.cos(angle), 0, Math.sin(angle),
            0,1,0,
            -Math.sin(angle), 0, Math.cos(angle),
            0,0,0
            );
        
        return rotationMatrix3;
}

var rotationMatrix4 = new THREE.Matrix4();
var rotationYMatrix4 = function (theta) {
    var angle = theta * (Math.PI / 180);
        
        rotationMatrix4.set(
            Math.cos(angle), 0, Math.sin(angle), 0,
            0,1,0,0,
            -Math.sin(angle), 0, Math.cos(angle), 0,
            0,0,0,1
            );
        
        return rotationMatrix4;
}

var rotationXTransformation = function (angle) {
    var theta = angle * (Math.PI / 180);

    return [
        [Math.cos(theta), -Math.sin(theta), 0, 0],
        [Math.sin(theta), Math.cos(theta), 0, 0],
        [0,0,1,0],
        [0,0,0,1]
    ];
}

var rotationZTransformation = function (angle) {
    var theta = angle  * (Math.PI/ 180)

    return [
        [Math.cos(theta), -Math.sin(theta), 0, 0],
        [Math.sin(theta), Math.cos(theta), 0, 0],
        [0,0,1,0],
        [0,0,0,1]
    ];
}

var switchOperatorMatrix = function(){
    return [
        [0,0,1,0],
        [1,0,0,0],
        [0,1,0,0],
        [0,0,0,1]
    ]
}

var identityMatrix = function(){
    return [
        [1,0,0,0],
        [0,1,0,0],
        [0,0,1,0],
        [0,0,0,1]
    ];
}
