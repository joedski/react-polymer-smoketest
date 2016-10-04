export default new Promise((resolve) => {
  const componentsLink = document.getElementById('main-element-import');

  if (componentsLink.import && componentsLink.import.readyState === 'complete') {
    resolve();
  } else {
    componentsLink.addEventListener('load', () => resolve());
    // error?
  }
});
