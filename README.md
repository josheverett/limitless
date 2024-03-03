# Limitless

Limitless is a lovingly faithful recreation of the Halo Infinite menu in Next.js.

Most, but not all, menu screens are included.

A live [demo is available here](https://limitless-rho.vercel.app/).

## why tho

The original objectives where:

- To learn new tools and frameworks, such as threejs, emotion css, gamecontroller.js, and framer motion.
- To satisfy a lifelong dream to make video game menus, as silly as that sounds.
- To experiment with building a relatively complex app that is obsessively fluid *and* responsive. Unlike the real menu by 343, it can be used on any device, orientation, and screen size.
- To make something of a portfolio piece that is clean, well structured, and very accessible.
- To generally get weird and solve unexpected challenges I haven't encountered before.

Cool things that happened along the way:

- A decent set of hooks for using gamecontroller.js in React, which I would like to improve and open source as `portal-gun`.  It can be used to instrument an existing React app simply by setting a few `tabIndex`s and defining "portals". Portals enable controller focus to `teleport()` to other components as needed.
- A slightly clever method of wrapping emotion css' `css` template tag with my own, that handles converting all `vh` and `vw` units to pixels when the "Force 4k" option is toggled. This option is necessary to ensure that everything matches up with the real menu, despite being fluid. Meanwhile wrapping emotion css was necessary due to the inherent conflict between `transform: scale(...)` and `vw` and `vh` units, as the app can be scaled, but not the viewport.
- The only media queries for responsiveness are `orientation` rules. There are no breakpoints

## Controls

This app can be controlled with pretty much any input method, including:

- Xbox controllers (other controllers untested)
- Tabbed keyboard navigation
- Keyboard arrow keys etc.
- Mouse
- Touch

## Acknowledgements

- 343 for making an awesome Halo game and getting multiplayer into a really great spot before ceasing development. ❤️
- [https://sketchfab.com/joshuawatt811](McCarthy3D) (Spartan), [https://sketchfab.com/Glitch5970](Glitch5970) (AR, BR), and [https://sketchfab.com/caitharper95](Caitlin Harper) (Sniper) for their 3D Halo models.

## Packages Used

- `@emotion/css`
- `@material-design-icons/svg`
- `@react-three` `drei` and `fiber`
- `framer-motion`
- `gamecontroller.js`
