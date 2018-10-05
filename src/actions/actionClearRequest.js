export function clearPendingRequest(index) {
	return {
        type: 'REMOVE_PENDING_REQUEST',
        index: index
	};
};
export function clearRequest() {
	return {
		type: 'CLEAR_REQUEST'
	}
}