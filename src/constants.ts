export const FOV = 75;

export const BALL_RADIUS = 1;

export const DX = 1;
export const DY = 1;

export const PADDLE_HEIGHT = 2;

export const WINDOW_WIDTH = window.innerWidth;
export const WINDOW_HEIGHT = window.innerHeight;

export let SCALED_WINDOW_WIDTH = 0;
export let SCALED_WINDOW_HEIGHT = 0;

export function initializeScaledWindowSizes(width: number, height: number) {
  SCALED_WINDOW_WIDTH = width;
  SCALED_WINDOW_HEIGHT = height;
}

export const EMPTY_BRICK = 0;
export const BRICKS_PADDING = 1;
