var WIDTH  = window.innerWidth;
var HEIGHT = window.innerHeight;

var renderer = createRenderer();
var scene = createScene();
var camera = createCamera();
var controls = new THREE.OrbitControls( camera, renderer.domElement );
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
    renderer.shadowMapSoft = true;
    return renderer;
}


function createScene(){     
   // define a scene  
    var scene = new THREE.Scene();
    return scene;
}

function createCamera(){
    var camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 1000);
    camera.position.y = 150;
    camera.position.z = 150;
    camera.lookAt(scene.position);
    return camera;
}


function setupUI(){
    scene.add(camera);
    unloadScrollBars();
    document.getElementById("test").appendChild(renderer.domElement);
}


