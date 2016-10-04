export default new Promise( ( resolve ) => {
  let polymerLink = document.getElementById( 'polymer-import' );

  if( polymerLink.import && polymerLink.import.readyState === 'complete' ) {
    resolve();
  }
  else {
    polymerLink.addEventListener( 'load', () => resolve() );
    // error?
  }
});
