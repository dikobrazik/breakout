// three.js
import * as THREE from "three";

export function createPaddle(renderer: THREE.Renderer) {
  renderer.domElement.addEventListener("mousemove", onMouseMove, false);

  function onMouseMove(event) {
    const positionX = (event.clientX / window.innerWidth) * 150;
    if (positionX >= 4 && positionX <= 146) {
      paddle.position.x = positionX - 75;
      line.position.x = positionX - 75;
    }
  }

  const geometry = new THREE.BoxGeometry(10, 2, 1);
  const material = new THREE.MeshBasicMaterial();

  const paddle = new THREE.Mesh(geometry, material);
  paddle.position.y = -75;
  const edges = new THREE.EdgesGeometry(geometry);
  const line = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ color: 0x000 })
  );
  line.position.y = -75;
  return [paddle, line];
}
