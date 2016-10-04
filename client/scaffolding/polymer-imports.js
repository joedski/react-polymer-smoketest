export default new Promise((resolve) => {
  const polymerLink = document.getElementById('polymer-import');

  if (polymerLink.import && polymerLink.import.readyState === 'complete') {
    resolve();
  } else {
    polymerLink.addEventListener('load', () => resolve());
    // error?
  }
});
