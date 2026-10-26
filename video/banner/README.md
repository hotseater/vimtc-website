# Home banner video

Ten photographs from the college's banner, panning and dissolving in a seamless 50-second loop. Rendered with Remotion; the output is committed to `public/video/`.

```
cd video/banner
npm install
npm run render:mp4     # public/video/banner.mp4 (H.264, CRF 20)
npm run render:webm    # public/video/banner.webm (VP9)
npm run poster         # public/video/banner-poster.jpg (frame 0)
```

To change the photographs, replace the files in `public/slides/` (3456 x 1080, Lanczos-upscaled from the originals) and re-render. Timing lives at the top of `src/Banner.tsx`: 5 seconds per slide, 1.2 second dissolve, 560px drift, 4.5% push-in.
