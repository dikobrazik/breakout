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

export let animateBall: (scene: THREE.Scene) => void;

export function createBall() {
  const geometry = new THREE.SphereGeometry(BALL_RADIUS);
  const material = new THREE.MeshMatcapMaterial();
  const ball = new THREE.Mesh(geometry, material);
  ball.name = "ball";
  ball.position.y = -(SCALED_WINDOW_HEIGHT / 2) + PADDLE_HEIGHT;
  animateBall = createBallVectorAnimation(ball);
  return ball;
}

function createBallVectorAnimation(ball: THREE.Mesh) {
  return function (scene: THREE.Scene) {
    for (const vector of ["x", "y"] as const) {
      if (
        Math.abs(ball.position[vector]) >
        getWorldSize(vector) - BALL_RADIUS
      ) {
        changeVectorDirection(vector);
      }
      ball.position[vector] += BALL_MOVE_DIFFERENCE[vector];

      const ballBox = new THREE.Box3().setFromObject(ball);

      for (const child of scene.children.filter(
        (child) => !["ball"].includes(child.name)
      )) {
        const box = new THREE.Box3().setFromObject(child);
        if (box.intersectsBox(ballBox)) {
          changeVectorDirection(vector);
          if (!["paddle"].includes(child.name)) {
            child.removeFromParent();
          }
        }
      }
    }
  };
}
function changeVectorDirection(vector: string) {
  BALL_MOVE_DIFFERENCE[vector] = -BALL_MOVE_DIFFERENCE[vector];
}
