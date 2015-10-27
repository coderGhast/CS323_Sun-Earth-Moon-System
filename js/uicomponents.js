// define global variables 
var scene; 
var camera;
var renderer;

// Hide scrollbars when moving about the screen
function unloadScrollBars() {
    document.documentElement.style.overflow = 'hidden';  // firefox, chrome
    document.body.scroll = "no"; // ie only
}

function setupUI(){
    renderer = new THREE.WebGLRenderer({ antialias:true }); 
                  
    var WIDTH  = window.innerWidth;
    var HEIGHT = window.innerHeight;
    
    renderer.setClearColor(0x000000, 1);
    renderer.setSize(WIDTH, HEIGHT);      
    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;

    unloadScrollBars();          
    
    //document.body.appendChild(renderer.domElement);
    document.getElementById("test").appendChild(renderer.domElement);
                
   // define a scene  
    scene = new THREE.Scene();

    // define a camera
    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 1000);
    camera.position.y = 150;
    camera.position.z = 150;
    camera.lookAt(scene.position);

    scene.add(camera);

    controls = new THREE.OrbitControls( camera, renderer.domElement );
}
