# Route Transition

Portable full-screen route transition feature.

## Public integration

Wrap the site once:

```tsx
<RouteTransitionProvider
  contentByPath={routeTransitionContent}
  fallbackContent={fallbackRouteTransitionContent}
>
  <RouteTransitionStage mediaFill="var(--premium)">
    {site}
  </RouteTransitionStage>

  <YourTransitionLayer />
</RouteTransitionProvider>
```

Internal same-origin links are intercepted automatically. The engine runs the outgoing animation, calls `router.push()` only after the transition screen fully covers the old route, waits for the new pathname to commit, then runs the mirrored incoming animation.

Use `data-route-transition="off"` on an anchor to bypass interception.

## Media hooks

Mark the media container:

```html
<div data-transition-media>...</div>
```

If a media container also contains non-media UI/text, mark only the visual layer:

```html
<div data-transition-media>
  <img data-transition-media-content />
  <div>normal text</div>
</div>
```

Outgoing media wipes image -> fill from left to right. Incoming media mirrors it as fill -> image from left to right.

## Structure

- `core/`: pure timing, geometry, Bézier math and types.
- `effects/`: DOM media/text measurement and visual effects.
- `runtime/`: React state machine, App Router navigation interception and RAF engine.
- `components/`: generic moving page stage and transition-screen layer.

Brand-specific transition content, typography, colors and layout must stay outside this feature.

## Motion sequencing

Readable page text does not remain visible during the full-screen camera sweep. On exit, text fades while the page is stationary; the sweep starts after that fade. On enter, the page/media sweep settles first and text fades in afterward. This avoids dragging readable typography across the viewport and reduces motion blur/visual strain while preserving the cover transition.

The text fade window is controlled by `config.text.fadeWindowProgress`. The centered transition screen remains readable for `config.coverHoldMs` before the incoming sweep begins. Brand transition copy should remain stationary while readable; the Magnifier implementation reveals the whole text block only during the centered cover phase rather than animating individual characters while the screen is moving.

Use `data-transition-fade` on a composite UI component when the whole component should fade with page typography. This is useful for visual controls such as progress bars whose meaningful pixels are not all text nodes.

The engine also respects `prefers-reduced-motion: reduce`, completing route phases without the full-screen movement.


## Motion settling

The route camera and scan use an easing curve whose velocity approaches zero at the final coordinate. Scan lock/release sub-ranges are eased independently instead of ending on a linear segment. This prevents the visible "hard stop" that occurs when an element reaches its final position with non-zero velocity.


### Media settling

Per-media clip progress uses a smootherstep curve instead of a linear clamp. Image, video, and marked media-content wipes therefore approach both their hidden and visible boundaries with zero velocity and zero acceleration, preventing individual media masks from visibly hitting their endpoint while the overall camera is still settling.


### Scrollbar stability

Route transitions lock page scrolling without changing the document's effective content width. The root uses `scrollbar-gutter: stable`, so classic scrollbar space remains reserved while `overflow: hidden` is active. The runtime does not add manual scrollbar-width padding, avoiding double compensation. The original inline overflow value is restored when the transition returns to idle.


### Small-viewport scaling

Transition duration no longer shrinks linearly all the way down with viewport width. The desktop motion still scales from the 1440px / 1200ms reference, but a configurable `minimumDurationMs` floor keeps phone transitions readable and prevents the fade/scan sequence from collapsing into a few hundred milliseconds. The Magnifier transition screen also switches to balanced wrapping, smaller type, safe-area-aware vertical padding, and full layer-height centering below 30rem.
