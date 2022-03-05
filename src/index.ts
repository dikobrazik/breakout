// add styles
import "./style.css";
// three.js
import * as THREE from "three";
import { createPaddle } from "./paddle";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 100;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(...createPaddle(renderer));

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
