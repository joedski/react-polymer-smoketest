
import { createStore /* , applyMiddleware */ } from 'redux';
import reducer from './reducers';

export default (hydrationData = null) => {
  const applyDevTools = window.devToolsExtension ? window.devToolsExtension() : a => a;

  const enhancer = store =>
    applyDevTools(store)
    ;

  // let enhancer = store =>
  //  applyMiddleware([
  //    /* ... */
  //  ])( applyDevTools( store ) )
  //  ;

  // let hydration = {};

  // let store = createStore( reducer, hydration, enhancer );
  const store = hydrationData
    ? createStore(reducer, hydrationData, enhancer)
    : createStore(reducer, enhancer)
    ;

  return store;
};
