import * as THREE from "three";
import { BRICKS_PADDING, FOV } from "./constants";

export function createBricks(scheme: number[][]): any {
  let bricksLines: any = [];
  for (const bricksLineScheme of scheme) {
    let bricksLine: any = [];
    const brickOnLineCount = bricksLineScheme.length;
    const brickWidth = FOV / brickOnLineCount;
    for (
      let brickSchemeIndex = 0,
        brickScheme = bricksLineScheme[brickSchemeIndex];
      brickSchemeIndex < brickOnLineCount;
      brickSchemeIndex++
    ) {
      const geometry = new THREE.BoxGeometry(brickWidth, 3, 1);
      //   const material = new THREE.MeshBasicMaterial();
      //   const brick = new THREE.Mesh(geometry, material);

      const edges = new THREE.EdgesGeometry(geometry);
      const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: 0x000 })
      );

      //   brick.position.y = FOV;
      line.position.y = FOV;
      //   brick.position.x =
      //     brickWidth * (brickSchemeIndex + 1) -
      //     FOV +
      //     BRICKS_PADDING * brickSchemeIndex;
      line.position.x =
        brickWidth * brickSchemeIndex - FOV + BRICKS_PADDING * brickSchemeIndex;
      bricksLine = bricksLine.concat(line);
    }
    bricksLines = bricksLines.concat(bricksLine);
  }
  return bricksLines;
}
