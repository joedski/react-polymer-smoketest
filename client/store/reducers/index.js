
import * as Actions from '../actions';

function initialState() {
	return {
		apps: [],
		user: {
			name: ""
		},
		selection: {
			selectedAppId: ''
		}
	};
}

const reducer = ( state = initialState(), action ) => {
	switch( action.type ) {
		case Actions.SELECT_APP: {
			return {
				...state,
				selection: {
					...state.selection,
					selectedAppId: action.payload.appId
				}
			};
		}

		default: return state;
	}
}

export default reducer;
