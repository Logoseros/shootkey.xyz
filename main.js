import './style.css'
import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#c1')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);


//geometry
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
//const material = new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } );
// use MeshStandardMaterial for light reflection
const material = new THREE.MeshStandardMaterial( { color: 0xabff00, } );
const torus = new THREE.Mesh( geometry, material );
scene.add( torus );

//point-light
const pointLight = new THREE.PointLight(0xc7234c);
pointLight.position.set(10,7,11);

//ammbient-light
const ambientLight = new THREE.AmbientLight(0x96a6dd);

scene.add(pointLight, ambientLight);

//helpers
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,30);
scene.add(lightHelper, gridHelper);

//orbit controls with cursor
//don't forget to (1)import and (2)add << controls.update() >> 
  //inside rendering function below
const controls = new OrbitControls(camera, renderer.domElement);



//rendering
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.005;

  controls.update();

  //render
  renderer.render(scene, camera);
}

animate()