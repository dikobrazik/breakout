import * as THREE from "three";
import {
  BRICKS_PADDING,
  SCALED_WINDOW_WIDTH,
  SCALED_WINDOW_HEIGHT,
} from "./constants";

export function createBricks(scheme: number[][]): any {
  let bricksLines: any = [];
  for (const bricksLineScheme of scheme) {
    let bricksLine: any = [];
    const brickOnLineCount = bricksLineScheme.length;
    const brickHeight = 3;
    const brickWidth =
      (SCALED_WINDOW_WIDTH - BRICKS_PADDING * (brickOnLineCount + 1)) /
      brickOnLineCount;
    for (
      let brickSchemeIndex = 0,
        brickScheme = bricksLineScheme[brickSchemeIndex];
      brickSchemeIndex < brickOnLineCount;
      brickSchemeIndex++
    ) {
      const geometry = new THREE.BoxGeometry(brickWidth, brickHeight, 1);
      //   const material = new THREE.MeshBasicMaterial();
      //   const brick = new THREE.Mesh(geometry, material);

      const edges = new THREE.EdgesGeometry(geometry);
      const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: 0x000 })
      );

      line.position.y =
        SCALED_WINDOW_HEIGHT / 2 - brickHeight / 2 - BRICKS_PADDING;
      line.position.x =
        brickWidth * brickSchemeIndex -
        brickWidth +
        BRICKS_PADDING * brickSchemeIndex;
      bricksLine = bricksLine.concat(line);
    }
    bricksLines = bricksLines.concat(bricksLine);
  }
  return bricksLines;
}
