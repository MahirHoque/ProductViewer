/////////////////////////////////////////
// Scene Setup
/////////////////////////////////////////
// scripts

var scene, camera, renderer, controls;

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(
  10,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.set(-7, 12, 8);
camera.lookAt(scene.position);

renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

/////////////////////////////////////////
// Trackball Controller
/////////////////////////////////////////

controls = new THREE.TrackballControls(camera);
controls.rotateSpeed = 5.0;
controls.zoomSpeed = 3.2;
controls.panSpeed = 0.8;
controls.noZoom = true;
controls.noPan = true;
controls.staticMoving = false;
controls.dynamicDampingFactor = 0.2;

/////////////////////////////////////////
// Lighting
/////////////////////////////////////////

var iphone_color = "#FAFAFA",
  ambientLight = new THREE.AmbientLight("#EEEEEE"),
  hemiLight = new THREE.HemisphereLight(iphone_color, iphone_color, 0),
  light = new THREE.PointLight(iphone_color, 1, 100);

hemiLight.position.set(0, 50, 0);
light.position.set(0, 20, 10);

scene.add(ambientLight);
scene.add(hemiLight);
scene.add(light);

/////////////////////////////////////////
// Utilities
/////////////////////////////////////////

/////////////////////////////////////////
// Render Loop
/////////////////////////////////////////

function renderPhone() {
  renderer.render(scene, camera);
}

// Render the scene when the controls have changed.
// If you don’t have other animations or changes in your scene,
// you won’t be draining system resources every frame to render a scene.
controls.addEventListener("change", renderPhone);

// Avoid constantly rendering the scene by only
// updating the controls every requestAnimationFrame
function animationLoop() {
  requestAnimationFrame(animationLoop);
  controls.update();
}

animationLoop();

/////////////////////////////////////////
// Window Resizing
/////////////////////////////////////////

window.addEventListener(
  "resize",
  function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls.handleResize();
    renderPhone();
  },
  false
);

/////////////////////////////////////////
// Object Loader
/////////////////////////////////////////

var dae,
  loader = new THREE.ColladaLoader();

function loadCollada(collada) {
  dae = collada.scene;
  dae.position.set(0.4, 0, 0.8);
  scene.add(dae);
  renderPhone();
}

loader.options.convertUpAxis = true;
loader.load(
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/392/iphone6.dae",
  loadCollada
);

/*  This continuously renders the scene

function animate() {
  requestAnimationFrame(animate);

  dae.rotation.y += 0.001;

  renderer.render(scene, camera);
}

animate();
*/
/*
document.getElementById("reset").addEventListener("click", function() {
  controls.reset();
});
*/
