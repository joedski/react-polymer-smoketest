React Polymer Test Bed
======================

A simple test bed for our app.

- React + Redux manages the over all layout, handles mapping state to props and mapping events to action dispatches.
- Polymer handles low level DOM components and all that dirty work.
- React-Polymer helps with gluing the two together.  Though, since it's Polymer, it's more like bonding the two together with resin or cyanoacrylate or something.
	- The Components that React-Polymer comes with can be used as guidance for binding Polymer stuff to React.

- npm handles React deps.
- bower handles web components.  Maybe with time (and HTTP2) all client deps will move there...



Analysis
--------

React-Polymer only works with actual declared events, I guess, however `{prop}-changed` events do not count it seems.  Or do but I just can't use them correctly?  I dunno.  I tried to follow the example set in their inputs wrappers, some which have `bind-value-changed`, but it didn't work for me with the `px-dropdown` and `selected-key-changed`.  I had to resort to refs and manually adding the events.

The big problem is that you can't even attach the `{prop}-changed` events through attrs in Polymer, it states you have to use `addEventListener` there.

Take a look at the `paper-inputs` to see if they differ somehow from how the `px-things` are setup.

This can probably be eased in a React Class, though, but that adds some complication.  Still, it'd be necessary when handling list items anyway.



Loading Process
---------------

React Polymer needs React and Polymer to be loaded first.  in React's case, this isn't so bad, but Polymer is.

... stuff.
