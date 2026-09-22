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
