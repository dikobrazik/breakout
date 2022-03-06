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
    ballBouncingFromBounds(ball);

    for (const vector of ["x", "y"] as const) {
      const diff = new THREE.Vector3();
      diff[vector] += BALL_MOVE_DIFFERENCE[vector];

      const ballBox = new THREE.Box3().setFromObject(ball).translate(diff);

      const shouldChangeDirection = [];
      for (const child of scene.children.filter(
        (child) => !["ball"].includes(child.name)
      )) {
        const box = new THREE.Box3().setFromObject(child);
        if (box.intersectsBox(ballBox)) {
          shouldChangeDirection.push(true);
          if (!["paddle"].includes(child.name)) {
            child.removeFromParent();
          }
        }
      }

      if (shouldChangeDirection.length) {
        changeVectorDirection(vector);
      }
    }
    ball.position.x += BALL_MOVE_DIFFERENCE.x;
    ball.position.y += BALL_MOVE_DIFFERENCE.y;
  };
}

function ballBouncingFromBounds(
  ball: THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>
) {
  if (Math.abs(ball.position.x) > getWorldSize("x") - BALL_RADIUS) {
    changeVectorDirection("x");
  }
  if (Math.abs(ball.position.y) > getWorldSize("y") - BALL_RADIUS) {
    changeVectorDirection("y");
  }
}

function changeVectorDirection(vector: string) {
  BALL_MOVE_DIFFERENCE[vector] = -BALL_MOVE_DIFFERENCE[vector];
}
