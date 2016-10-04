
function initialState() {
	return {
		apps: [
			{ id: '1', name: "Fancy App", rating: 5, description: "This is a super fancy app." },
			{ id: '2', name: "Old App", rating: 1, description: "This is an old rickety app." },
			{ id: '3', name: "Another App", rating: 3, description: "It works, but it could be better." },
		],
		user: {
			name: "Gratia Example"
		}
	};
}

const reducer = ( state = initialState(), action ) => {
	switch( action.type ) {
		default: return state;
	}
}

export default reducer;
