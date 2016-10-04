
// import scaffold from '../scaffolding';
import webcomponents from '../scaffolding/webcomponents';
import componentImports from '../scaffolding/component-imports';
import polymerImports from '../scaffolding/polymer-imports';
import app from '../scaffolding/app';

// scaffold.then( app );

Promise.all([
  webcomponents,
  componentImports,
  polymerImports,
])
.then(app)
;
