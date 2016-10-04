import ReactPolymer from 'react-polymer';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../../store/actions';

// // Doesn't seem to work with polymer's notify events.
// // I'm not sure if that can be made to work from the attributes.
// // Twiddling such on the DOM didn't work, and the Polymer docs state
// // that you have to do addEventListener for these events too,
// // so it's probably restricted to that.
// ReactPolymer.registerEvent( 'selected-key-changed', { onSelectedKeyChanged: true }, { onSelectedKeyChangedCapture: true });

class App extends React.Component {
	// This feels backboneish.

	componentDidMount() {
		// So, I'm guessing what's happening here is that Polymer's notify events
		// do not have matching dom-attrs, so we have to just listen directly.
		// How annoying.
		// Also, not sure why this didn't work in ealier tests.
		// NOTE: prop selectedKey only exists in px-dropdown 0.12.x.
		// If this listener gives you no joy, make sure you have that version and not 0.10.x or something.
		// 0.10.x does have .value at least, which is the `name` prop of the supplied data.
		this.dropdown.addEventListener( 'selected-key-changed', event => {
			console.log( 'selected-key-changed:', event.target.selectedKey );
			this.props.onSelectApp( event.target.selectedKey );
		});
	}

	// To automate this some, we'd need to take into account that the ref function can be called many times.
	// This is only really a concern when we're deing with collections, since those can be changed many times.
	// I guess we'd have to check with an updater.
	// Given ref already added?  No need ot worry about events.
	// Given ref being removed?  Remove event listeners. (Check if necessary.  They might run through all their listeners and autoremove.)
	// Since React always calls the ref function with null before calling it with a new value,
	// we don't need to check if prevRef !== nextRef.
	// Real question is whether or not that's actually worth making a thing.

	render() {
		// let itemsJSON = JSON.stringify([
		// 	{ key: '1', val: "Beep" },
		// 	{ key: '2', val: "Booper" },
		// 	{ key: '3', val: "Bibblybop" },
		// ]);

		let itemsJSON = JSON.stringify(
			this.props.apps.map( a => ({
				key: a.id, val: a.name
			}))
		);

		let selectedApp = this.props.apps.find( a => a.id === this.props.selectedAppId );
		let selectedName = selectedApp ? selectedApp.name : '';

		return (
			<div className="do-something">
				<px-dropdown
					display-value={ selectedName }
					selected-key={ selectedApp.id }
					ref={ ref => {
						this.dropdown = ref;
					}}
					// Although it seems like it should work based on the react-polymer example,
					// I can't get this to work here.
					// Only manually calling addEventListener seems to work.  Alas.
					// onSelectedKeyChanged={ event => {
					// 	console.log( 'onSelectedKeyChanged:', event.target.selectedKey );
					// }}
					>
					<px-dropdown-content
						items={ itemsJSON }/>
				</px-dropdown>
			</div>
		);
	}
}

const mapState = state => ({
	apps: state.apps,
	user: state.user,
	selectedAppId: state.selection.selectedAppId
});

const mapDispatch = dispatch => ({
	onSelectApp: appId => dispatch( Actions.selectApp( appId ) )
});

export default connect( mapState, mapDispatch )( App );
