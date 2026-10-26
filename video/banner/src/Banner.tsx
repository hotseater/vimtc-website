import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, Easing } from "remotion";

/**
 * Ten photographs from the college's own banner. Each one is shown for HOLD seconds,
 * drifting right-to-left at a constant speed with a slow push-in, and dissolves into the
 * next over FADE seconds. The first slide re-enters at the end so frame 0 equals the last
 * frame: the file loops seamlessly in a <video loop>.
 */
export const FPS = 30;
const SLIDES = 10;
const HOLD = 5;         // seconds each slide owns
const FADE = 1.2;       // seconds of dissolve between slides
const PAN_PX = 560;     // horizontal drift per slide, in source pixels (3456 x 1080 frames)
const ZOOM = 0.045;     // push-in over the slide's visible life
export const DURATION_FRAMES = SLIDES * HOLD * FPS;

const W = 1920, H = 1080, IMG_W = 3456;

const Slide = ({ index, startSec }: { index: number; startSec: number }) => {
  const frame = useCurrentFrame();
  const t = frame / FPS - startSec;                 // seconds since this slide began fading in
  const life = HOLD + FADE;                         // visible for hold + one fade
  if (t < 0 || t > life) return null;
  const fadeIn = startSec <= 0 ? 1 : interpolate(t, [0, FADE], [0, 1], { extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) });
  const fadeOut = interpolate(t, [life - FADE, life], [1, 0], { extrapolateLeft: "clamp", easing: Easing.inOut(Easing.quad) });
  const opacity = Math.min(fadeIn, fadeOut);
  const pan = interpolate(t, [0, life], [0, PAN_PX]);  // linear, constant speed
  const scale = 1 + interpolate(t, [0, life], [0, ZOOM]);
  // keep the drift inside the frame: start centred minus half the pan
  const x = -(IMG_W - W) / 2 + PAN_PX / 2 - pan;
  const file = `slides/slide-${String(index + 1).padStart(2, "0")}.jpg`;
  return (
    <AbsoluteFill style={{ opacity, overflow: "hidden" }}>
      <Img
        src={staticFile(file)}
        style={{ position: "absolute", top: 0, left: 0, width: IMG_W, height: H, transform: `translateX(${x}px) scale(${scale})`, transformOrigin: "50% 45%", willChange: "transform" }}
      />
    </AbsoluteFill>
  );
};

export const Banner = () => {
  const slides = [];
  for (let i = 0; i < SLIDES; i++) slides.push(<Slide key={i} index={i} startSec={i * HOLD - FADE} />);
  // the loop seam: slide 0 fades back in under slide 9
  slides.push(<Slide key="loop" index={0} startSec={SLIDES * HOLD - FADE} />);
  return <AbsoluteFill style={{ backgroundColor: "#24272D" }}>{slides}</AbsoluteFill>;
};
