// import ReactPolymer from 'react-polymer';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';
import PolymerWrapper from '../PolymerWrapper';

class App extends PolymerWrapper {
  constructor( props ) {
    super( props );
  }

  appDropdown( name, onSelectApp ) {
    let itemsJSON = JSON.stringify(
      this.props.apps.map( a => ({
        key: a.id, val: a.name
      }))
    );

    let selectedApp = this.props.apps.find( a => a.id === this.props.selectedAppId );
    let selectedName = selectedApp ? selectedApp.name : '';

    return (
      <px-dropdown
        display-value={ selectedName }
        selected-key={ selectedApp.id }
        ref={ this.polymerEvents( name, {
          'selected-key-changed': onSelectApp,
        })}
        >
        <px-dropdown-content
          items={ itemsJSON }/>
      </px-dropdown>
    );
  }

  render() {
    return (
      <div className="do-something">
        {this.appDropdown( 'dropdown', event => {
          console.log( `dropdown => ${event.target.selectedKey}` );
          this.props.onSelectApp( event.target.selectedKey );
        })}

        <div className="items">
          {[0,1,2].map(index => (
            <div className="item" key={index}>
              {this.appDropdown( `dropdown#${index}`, event => {
                console.log( `dropdown#${index} => ${event.target.selectedKey}` );
                this.props.onSelectApp( event.target.selectedKey );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  apps: PropTypes.array,
  selectedAppId: PropTypes.string,
  onSelectApp: PropTypes.func
};



const mapState = state => ({
  apps: state.apps,
  selectedAppId: state.selection.selectedAppId
});

const mapDispatch = dispatch => ({
  onSelectApp: appId => dispatch( Actions.selectApp( appId ) )
});



export default connect( mapState, mapDispatch )( App );

