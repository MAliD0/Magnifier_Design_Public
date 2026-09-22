# Route Transitions

## Purpose

Route transitions are a reusable site-wide navigation system. Contact will be the first destination to use it, but the architecture must also support Projects, Services, About, project detail pages, and future routes.

The transition is not only decorative. It deliberately creates a short **asset-loading window** between the user's click and the moment the destination page is visually revealed.

## Core sequence

1. User activates an internal transition link.
2. Prepare the current page for exit.
   - Lock page interaction and scrolling.
   - Replace visible image/video detail with stable solid primary-color surfaces.
   - Keep media boxes at the same dimensions so layout does not shift.
   - Start/refresh destination route prefetching.
3. Current page moves left and fades.
4. A full-screen transition panel enters from the right.
   - Primary-color background.
   - Destination-specific text.
   - Reusable hero-style animated headline.
5. While the panel covers the viewport, navigate to the destination route.
6. The destination page mounts behind the panel.
7. During this covered period, critical destination assets get time to request, download, decode, and render.
8. The transition panel continues left while destination content follows into view.
9. Restore interaction and finish in the idle state.

## Performance model

### The transition creates a loading window

The solid-color treatment is not intended to make images download faster.

Its purpose is to simplify what is being rendered while the old page exits and, more importantly, to give the browser a visually hidden period in which the destination route and its important assets can load before the user sees them.

The useful loading window is:

```text
click
  ↓
old page exit
  ↓
transition panel covers viewport
  ↓
destination route mounts behind panel
  ↓
critical destination media begins/continues loading
  ↓
panel leaves
  ↓
destination becomes visible
```

The panel therefore acts as a visual buffer between route activation and destination reveal.

### Route prefetching

Internal transition links must preserve Next.js `Link` behavior so normal production prefetching continues to work.

For important routes, the transition system may also call `router.prefetch(href)` on pointer enter/focus so route code/data has an even earlier opportunity to become available.

Prefetching is an optimization only. The transition state machine must still behave correctly on a cold cache or slow connection.

### Critical media loading

We should use the covered phase to give **above-the-fold destination media** time to load.

Implementation rule:

- Navigate while the transition panel is covering the viewport rather than after the panel has already left.
- Let the destination page mount behind the panel.
- Mark only genuinely important first-screen media as eager/preloaded.
- Keep below-the-fold galleries lazy.
- Do not intentionally preload every image on a destination page.

This gives critical media a useful head start without wasting bandwidth on content the user may never see.

### Destination media placeholders

Even with a loading window, media readiness cannot be guaranteed on every connection.

Every reusable image/video container should therefore have:

- stable dimensions or an aspect ratio;
- a primary-color fallback surface;
- media layered above that surface;
- a reveal/fade only when the media is ready.

If the panel leaves before an asset finishes, the user sees the designed primary-color surface rather than an empty or white rectangle.

### Outgoing media simplification

When the transition starts:

- image/video pixels may fade out;
- their existing containers remain in layout;
- the container background becomes the primary color;
- videos should pause where practical;
- movement should use `transform` and `opacity` rather than layout-changing properties.

Do not remove media nodes merely to create the solid-color effect. Keeping the same boxes avoids reflow and layout shift.

## Route-transition architecture

```text
src/components/system/route-transition/
├── index.ts
├── route-transition-provider.tsx
├── route-transition-context.ts
├── route-transition-link.tsx
├── route-transition-layer.tsx
├── route-transition-panel.tsx
├── route-transition.config.ts
├── route-transition.types.ts
├── use-route-transition.ts
└── route-transition.module.css
```

Destination-specific transition copy belongs in:

```text
src/data/route-transitions.ts
```

Hero text motion should be extracted into a reusable animated-headline UI component and shared between the home hero and transition panel rather than duplicated.

## State machine

Use explicit phases:

```ts
type TransitionPhase =
  | "idle"
  | "exit"
  | "cover"
  | "enter";
```

The transition system knows where navigation is going, but must not know the internal implementation of the destination page.

Do not add route-specific logic such as `animateContactForm()` to the global transition controller.

## Loading/readiness rules

The transition should have a configured minimum visual duration so very fast navigations do not flash.

It should **not** block forever waiting for every destination asset.

Initial implementation should use:

- route readiness;
- a minimum cover duration;
- normal critical-media loading;
- destination placeholders as the fallback.

Later, if needed, the transition configuration can support a small list of destination-specific critical assets/readiness signals. That should be reserved for truly above-the-fold media rather than becoming a general preload manifest.

## Reduced motion

When `prefers-reduced-motion: reduce` is active:

- skip large page translations;
- keep route navigation immediate or use a short opacity transition;
- preserve the same loading/fallback strategy;
- do not make the user wait only for decorative animation.

## Implementation order

1. Build the global provider, state machine, transition link, and panel.
2. Add solid primary-color outgoing media masking.
3. Navigate while the panel covers the viewport.
4. Add stable primary-color destination media placeholders.
5. Verify route/loading behavior under throttled network conditions.
6. Extract/reuse hero headline animation.
7. Tune timings and destination-specific transition text.


## Visual prototype status

The first visual-only implementation is now structured around the final system architecture.

Implemented visual pieces:

- global route-transition provider and explicit `idle / exit / cover / enter` phases;
- page stage exit and entry transforms;
- full-screen primary-color transition panel;
- destination-specific transition copy;
- shared animated character line extracted from the home hero and reused by the transition panel;
- solid primary-color media masking through `data-transition-media`;
- debug preview action for the Contact transition;
- all important visual timings and distances centralized in `route-transition.config.ts`.

The preview intentionally does **not** perform route navigation yet. It reuses the current page as the incoming page so motion, typography, masking, timing, and responsive behavior can be tuned before router synchronization is introduced.

Next implementation stage:

1. tune the visual transition;
2. add `RouteTransitionLink`;
3. prefetch destination routes;
4. perform navigation during `cover`;
5. wait for destination route readiness/minimum cover window;
6. reveal the real destination during `enter`.
