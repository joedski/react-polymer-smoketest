React Polymer Test Bed
======================

A simple test bed for our app.

- React + Redux manages the over all layout, handles mapping state to props and mapping events to action dispatches.
- Polymer handles low level DOM components and all that dirty work.
- React-Polymer helps with gluing the two together.  Though, since it's Polymer, it's more like bonding the two together with resin or cyanoacrylate or something.
	- The Components that React-Polymer comes with can be used as guidance for binding Polymer stuff to React.

- npm handles React deps.
- bower handles web components.  Maybe with time (and HTTP2) all client deps will move there...



Loading Process
---------------

React Polymer needs React and Polymer to be loaded first.  in React's case, this isn't so bad, but Polymer is.
