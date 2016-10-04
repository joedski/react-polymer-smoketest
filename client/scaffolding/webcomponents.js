
export default new Promise((resolve) => {
  if (
    'registerElement' in document
    && 'import' in document.createElement('link')
    && 'content' in document.createElement('template')
  ) {
    // do nothing.
    resolve();
  } else {
    // polyfill web components
    const polyfill = document.createElement('script');
    polyfill.async = true;
    polyfill.src = './bower_components/webcomponentsjs/webcomponents-lite.min.js';
    polyfill.onload = () => resolve();
    document.head.appendChild(polyfill);
  }
});
