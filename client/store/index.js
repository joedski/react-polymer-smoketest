
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';

export function configureStore( hydrationData = null ) {
  let applyDevTools = window.devToolsExtension ? window.devToolsExtension() : a => a;

  let enhancer = store =>
    applyDevTools( store )
    ;

  // let enhancer = store =>
  //  applyMiddleware([
  //    /* ... */
  //  ])( applyDevTools( store ) )
  //  ;

  // let hydration = {};

  // let store = createStore( reducer, hydration, enhancer );
  let store = hydrationData
    ? createStore( reducer, hydrationData, enhancer )
    : createStore( reducer, enhancer )
    ;

  return store;
}
