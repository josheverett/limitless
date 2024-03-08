# Limitless

Limitless is a lovingly faithful recreation of the Halo Infinite menu in Next.js.

Most, but not all, menu screens are included.

A live [demo is available here](https://limitless-rho.vercel.app/).

## Controls

This app can be controlled with pretty much any input method, including:

- Xbox controllers (other controllers untested)
- Tabbed keyboard navigation + enter key
- Keyboard arrow keys etc. (QWERTY only, sorry Dvorak users!)
- Mouse
- Touch

Controller to keyboard mappings:

- D-Pad = Arrow Keys
- Start = `Space`
- Select = `Escape`
- Guide = `g`
- A / B / X / Y = `a` / `b` / `x` / `y`
- Left and Right Triggers = Left and Right `Shift`
- Left and Right Bumpers = `[` and `]`
- L3 and R3 = `,` and `.`

## why tho

The original objectives where:

- To learn new tools and frameworks, such as threejs, emotion css, gamecontroller.js, and framer motion.
- To experiment with building a relatively complex app that is obsessively fluid *and* responsive. It can be used on any device, orientation, and screen size.
- To make something of a portfolio piece that is clean, well structured, and accessible.
- To satisfy a lifelong desire to make video game menus, as silly as that sounds.
- To generally get weird and solve unexpected challenges I haven't encountered before.

Cool but unplanned things that happened along the way:

- A decent set of hooks for using gamecontroller.js in React, which I would like to improve and open source as `react-portal-gun`.  It can be used to instrument an existing React app simply by setting a few `tabIndex`s and defining "portals". Portals enable controller focus to `teleport()` to other components as needed.
- *Everything* is defined primarily with `vh` units, some `%` units, and the occasional `vw` units. The couple of instances of `px` units are for enforcing `min-*` properties that can otherwise fail to render sanely at certain viewpoint sizes (due to being <0.05px when rendered via `vh` or `vw` units).
- A slightly clever method of wrapping emotion css' `css` template tag with my own, that handles converting all `vh` and `vw` units to pixels when the "Force 4k" option is toggled. This option is necessary to ensure that everything matches up with the real menu, despite being fluid. Meanwhile wrapping emotion css was necessary due to the inherent conflict between `transform: scale(...)` and `vw` and `vh` units, as the app can be scaled, but not necessarily the viewport.
- The only media queries for responsiveness are `orientation` rules. There are no breakpoints.
- Lots of fun CSS tricks. The only jpegs in this app are the obvious ones, and the only icons use svgs. Everything else is pure CSS.

## Acknowledgements

- 343 for making an awesome Halo game and getting multiplayer into a really great spot before ceasing development. ❤️
- [McCarthy3D](https://sketchfab.com/joshuawatt811) (Spartan) and [Glitch5970](https://sketchfab.com/Glitch5970) (AR, BR, Sniper) for their 3D Halo models.

## Packages Used

- `@emotion/css`
- `@material-design-icons/svg`
- `@react-three` + `drei` + `fiber`
- `framer-motion`
- `gamecontroller.js`

## License

3D models are CC BY 4.0 DEED (see above), everything else is MIT.
