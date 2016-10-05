React Polymer Test Bed
======================

A simple test bed for our app.

- React + Redux manages the over all layout, handles mapping state to props and mapping events to action dispatches.
- Polymer handles low level DOM components and all that dirty work.
- React-Polymer helps with gluing the two together.  Though, since it's Polymer, it's more like bonding the two together with resin or cyanoacrylate or something.
	- The Components that React-Polymer comes with can be used as guidance for binding Polymer stuff to React.

- npm handles React deps.
- bower handles web components.  Maybe with time (and HTTP2) all client deps will move there...



Installation
------------

Download, cd into, then `npm run install && npm run build`.



Build Process
-------------

There are a few different parts.
- React is usually compiled using a bundler such as Webpack or Browserify.  The latter is used here.
	- We're using ES6 and JSX to follow standard React practices.
	- Stage 0 is used for the spread operator and some other niceties, but babel-shim is NOT included.
- Web Components can be compiled/bundled via Vulcanize, but don't need to be during dev.
	- Promise are available via webcomponent and can be imported that way.
- Some things may be inlineable, using `gulp-inline`.  This can be used to reduce requests or do some basic bundling in non-HTTP2 builds.
- The Predix Seed App uses Sass for variables, so gulp-sass is included.  Further processing is handled by postcss and it's friends.
	- Some postcss things:
		- autoprefixer
		- ... some shortcut niceties.
		- cssnano

Considerations:
- We should probably shim in some/all ES5 features.
	- The loader currently assumes the presence of Promise, though it could be rewritten into callback form.



Analysis
--------

React-Polymer only works with actual declared events, I guess, however `{prop}-changed` events do not count it seems.  Or do but I just can't use them correctly?  I dunno.  I tried to follow the example set in their inputs wrappers, some which have `bind-value-changed`, but it didn't work for me with the `px-dropdown` and `selected-key-changed`.  I had to resort to refs and manually adding the events.

The big problem is that you can't even attach the `{prop}-changed` events through attrs in Polymer, it states you have to use `addEventListener` there.

Take a look at the `paper-inputs` to see if they differ somehow from how the `px-things` are setup, and see if that's why Polymer-React can bind it just using props rather than refs.  Also, check if it matters where I call `reactPolymer.registerEvent`.  I don't know why it should matter, but maybe it does?

This can probably be eased in a React Class, though, but that adds some complication.  Still, it'd be necessary when handling list items anyway.



Loading Process
---------------

React Polymer needs React and Polymer to be loaded first.  in React's case, this isn't so bad, but Polymer is.

... stuff.
