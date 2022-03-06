import * as THREE from "three";
import {
  BRICKS_PADDING,
  SCALED_WINDOW_WIDTH,
  SCALED_WINDOW_HEIGHT,
} from "./constants";

export function createBricks(scheme: number[][]): any {
  let bricksLines: any = [];
  const brickOnLineCount = Math.max(...scheme.map((line) => line.length));
  for (let lineIndex = 0; lineIndex < scheme.length; lineIndex++) {
    const bricksLineScheme = scheme[lineIndex];
    let bricksLine: any = [];
    const brickHeight = 3;
    const brickWidth =
      (SCALED_WINDOW_WIDTH - BRICKS_PADDING * (brickOnLineCount + 1)) /
      brickOnLineCount;
    for (
      let brickSchemeIndex = 0;
      brickSchemeIndex < brickOnLineCount;
      brickSchemeIndex++
    ) {
      const brickScheme = bricksLineScheme[brickSchemeIndex];
      if (!brickScheme) {
        continue;
      }
      const geometry = new THREE.BoxGeometry(brickWidth, brickHeight, 1);
      const material = new THREE.MeshBasicMaterial({ color: "purple" });
      const brick = new THREE.Mesh(geometry, material);

      const edges = new THREE.EdgesGeometry(geometry);
      const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: 0x000 })
      );

      line.position.y = calculateY(brickHeight, lineIndex);
      line.position.x = calculateX(brickWidth, brickSchemeIndex);
      brick.position.y = calculateY(brickHeight, lineIndex);
      brick.position.x = calculateX(brickWidth, brickSchemeIndex);
      bricksLine = bricksLine.concat(line, brick);
    }
    bricksLines = bricksLines.concat(bricksLine);
  }
  return bricksLines;
}
function calculateX(brickWidth: number, brickSchemeIndex: number): number {
  return (
    brickWidth * brickSchemeIndex -
    brickWidth +
    BRICKS_PADDING * brickSchemeIndex
  );
}

function calculateY(brickHeight: number, lineIndex: number): number {
  return (
    SCALED_WINDOW_HEIGHT / 2 -
    brickHeight / 2 -
    brickHeight * lineIndex -
    BRICKS_PADDING * (lineIndex + 1)
  );
}
