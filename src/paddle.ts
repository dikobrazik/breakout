// three.js
import * as THREE from "three";
import {
  PADDLE_HEIGHT,
  WINDOW_WIDTH,
  SCALED_WINDOW_WIDTH,
  SCALED_WINDOW_HEIGHT,
} from "./constants";

export function createPaddle(renderer: THREE.Renderer) {
  renderer.domElement.addEventListener("mousemove", onMove, false);
  renderer.domElement.addEventListener("touchmove", onMove, false);

  function onMove(event: MouseEvent) {
    const positionX =
      (event.clientX / WINDOW_WIDTH) * SCALED_WINDOW_WIDTH -
      SCALED_WINDOW_WIDTH / 2;
    if (Math.abs(positionX) < SCALED_WINDOW_WIDTH / 2 - 5) {
      paddle.position.x = positionX;
      line.position.x = positionX;
    }
  }

  const geometry = new THREE.BoxGeometry(10, PADDLE_HEIGHT, 1);
  const material = new THREE.MeshBasicMaterial();
  const paddle = new THREE.Mesh(geometry, material);

  const edges = new THREE.EdgesGeometry(geometry);
  const line = new THREE.LineSegments(
    edges,
    new THREE.LineBasicMaterial({ color: 0x000 })
  );

  paddle.position.y = -(SCALED_WINDOW_HEIGHT - PADDLE_HEIGHT) / 2;
  line.position.y = paddle.position.y;
  paddle.name = "paddle";
  line.name = "paddle";
  return [paddle, line];
}
