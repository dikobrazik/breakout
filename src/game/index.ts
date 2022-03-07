import * as THREE from "three";
import { createPaddle } from "./paddle";
import { animateBall, createBall } from "./ball";
import { createBricks } from "./bricks";
import {
  FOV,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  initializeScaledWindowSizes,
} from "./constants";

class Game {
  public scene: THREE.Scene;
  public renderer: THREE.WebGLRenderer;
  public camera: THREE.PerspectiveCamera;
  public initWorld = () => {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      FOV,
      WINDOW_WIDTH / WINDOW_HEIGHT,
      0.1,
      1000
    );
    this.camera.position.z = 100;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(WINDOW_WIDTH, WINDOW_HEIGHT);
    this.renderer.setClearColor("white");
    // document.body.appendChild(this.renderer.domElement);

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
      visibleWidthAtZDepth(this.camera),
      visibleHeightAtZDepth(this.camera)
    );
    return this.renderer.domElement;
  };

  addControls() {
    this.scene.add(...createPaddle(this.renderer));

    this.scene.add(
      ...createBricks([
        [1, 0, 1],
        [0, 1, 0],
        [1, 1, 0],
      ])
    );

    const ball = createBall();
    this.scene.add(ball);
  }

  public reset = () => {
    this.scene.clear();
    this.addControls();
  };

  public start = () => {
    const animate = () => {
      requestAnimationFrame(animate);
      animateBall(this.scene);
      this.renderer.render(this.scene, this.camera);
    };
    animate();
  };
}

const game = new Game();

export default game;
