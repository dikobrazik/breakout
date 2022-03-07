import { useEffect, useRef, useState } from "preact/hooks";
import game from "./game";

export const App = () => {
  const gameContainerRef = useRef<HTMLDivElement>();
  const [world, setWorld] = useState<HTMLCanvasElement>();
  useEffect(() => {
    game.initWorld();
    gameContainerRef.current.appendChild(game.renderer.domElement);
    game.addControls();
    game.start();
  }, []);
  return <div ref={gameContainerRef}></div>;
};
