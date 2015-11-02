var WIDTH  = window.innerWidth;
var HEIGHT = window.innerHeight;

var renderer = createRenderer();
var scene = createScene();
var camera = createCamera();
var controls;
function unloadScrollBars() {
    document.documentElement.style.overflow = 'hidden';  // firefox, chrome
    document.body.scroll = "no"; // ie only
}

function render(){
    renderer.render(scene, camera);
}

function createRenderer(){
    var renderer = new THREE.WebGLRenderer({ antialias:true }); 
    renderer.setClearColor(0x000000, 1);
    renderer.setSize(WIDTH, HEIGHT);      
    renderer.shadowMap.enabled = true;
    return renderer;
}


function createScene(){     
    var scene = new THREE.Scene();
    return scene;
}

function createCamera(){
    var camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 0.1, 1000);
    camera.position.y = 150;
    camera.position.z = 150;
    camera.lookAt(scene.position);
    return camera;
}


function setupUI(){
    document.getElementById("threeCanvas").appendChild(renderer.domElement);
    scene.add(camera);
    unloadScrollBars();
    setupControls();
    setupGUI();
}

function setupControls(){
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.maxDistance = 300;
    controls.minDistance = 10;
}

var resetCamera = function(){
    controls.reset()
}


var params = {
    "speed": 1,
    "cameraFocus": 0,
    "resetCamera" : resetCamera,
    "pause": false,
    "orbitHelpers": true,
    "axisHelpers": false
};


function setupGUI() {
    
    var gui = new dat.GUI();

    gui.add( params, "speed" ).min(0).max(10).step(1).onChange( function( value ) {
        
        updateControlValues(value);
        
    } );

    gui.add( params, 'cameraFocus', {Sun: 0, Earth: 1, Moon: 2} ).onChange( function(value) {
      if(value == 0){
        controls.target = sunMesh.position;
      } else if(value == 1){
        controls.target = earthMesh.position;
      } else if(value == 2){
        controls.target = moonMesh.position;
      }
    });

    gui.add(params, 'resetCamera');

    gui.add(params, 'pause').onChange( function( value ){
        simulationPaused = value;
    });
    
    gui.add(params, 'orbitHelpers').onChange( function( value ){
        earthOrbitLine.visible = value;
        moonOrbitLine.visible = value;
    });

    gui.add(params, 'axisHelpers').onChange( function( value ){
        earthAxisHelper.visible = value;
        moonAxisHelper.visible = value;
        sunAxisHelper.visible = value;
    });    
}