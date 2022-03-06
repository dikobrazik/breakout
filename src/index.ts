// add styles
import "./style.css";
// three.js
import * as THREE from "three";
import { createPaddle } from "./paddle";
import { animateBall, createBall } from "./ball";
import { createBricks } from "./bricks";
import {
  EMPTY_BRICK,
  FOV,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  initializeScaledWindowSizes,
} from "./constants";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  FOV,
  WINDOW_WIDTH / WINDOW_HEIGHT,
  0.1,
  1000
);
camera.position.z = 100;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(WINDOW_WIDTH, WINDOW_HEIGHT);
renderer.setClearColor("white");
document.body.appendChild(renderer.domElement);

const visibleHeightAtZDepth = (camera: THREE.PerspectiveCamera) => {
  const cameraOffset = camera.position.z;
  const vFOV = (camera.fov * Math.PI) / 180;
  return 2 * Math.tan(vFOV / 2) * Math.abs(-cameraOffset);
};

const visibleWidthAtZDepth = (camera: THREE.PerspectiveCamera) => {
  const height = visibleHeightAtZDepth(camera);
  return height * camera.aspect;
};

initializeScaledWindowSizes(
  visibleWidthAtZDepth(camera),
  visibleHeightAtZDepth(camera)
);

scene.add(...createPaddle(renderer));

scene.add(...createBricks([[1, EMPTY_BRICK, 1]]));

const ball = createBall();
scene.add(ball);

function animate() {
  requestAnimationFrame(animate);
  animateBall(ball);
  renderer.render(scene, camera);
}
animate();
