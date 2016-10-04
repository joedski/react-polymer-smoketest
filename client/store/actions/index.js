
export const SELECT_APP = 'SELECT_APP';
export const selectApp = ( appId, meta = {} ) => ({
	type: SELECT_APP,
	payload: { appId },
	meta
});
