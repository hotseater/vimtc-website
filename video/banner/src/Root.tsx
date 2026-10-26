import { Composition } from "remotion";
import { Banner, FPS, DURATION_FRAMES } from "./Banner";

export const Root = () => (
  <Composition
    id="Banner"
    component={Banner}
    durationInFrames={DURATION_FRAMES}
    fps={FPS}
    width={1920}
    height={1080}
  />
);
