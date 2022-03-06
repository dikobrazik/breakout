import * as THREE from "three";
import {
  BALL_RADIUS,
  DX,
  DY,
  PADDLE_HEIGHT,
  SCALED_WINDOW_WIDTH,
  SCALED_WINDOW_HEIGHT,
} from "./constants";

const BALL_MOVE_DIFFERENCE = {
  x: DX,
  y: DY,
};

function getWorldSize(vector: "x" | "y") {
  return (vector === "x" ? SCALED_WINDOW_WIDTH : SCALED_WINDOW_HEIGHT) / 2;
}

let animateVectorX: () => void;
let animateVectorY: () => void;

export function createBall() {
  const geometry = new THREE.SphereGeometry(BALL_RADIUS);
  const material = new THREE.MeshMatcapMaterial();
  const ball = new THREE.Mesh(geometry, material);
  ball.position.y = -(SCALED_WINDOW_HEIGHT / 2) + PADDLE_HEIGHT;
  animateVectorX = createBallVectorAnimation(ball, "x");
  animateVectorY = createBallVectorAnimation(ball, "y");
  return ball;
}

function createBallVectorAnimation(ball: THREE.Mesh, vector: "x" | "y") {
  return function () {
    if (Math.abs(ball.position[vector]) > getWorldSize(vector) - BALL_RADIUS) {
      BALL_MOVE_DIFFERENCE[vector] = -BALL_MOVE_DIFFERENCE[vector];
    }
    ball.position[vector] += BALL_MOVE_DIFFERENCE[vector];
  };
}

export function animateBall(ball: THREE.Mesh) {
  animateVectorX();
  animateVectorY();
}
