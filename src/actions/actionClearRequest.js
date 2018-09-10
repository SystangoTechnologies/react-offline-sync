export function clearPendingRequest(index) {
	return {
        type: 'REMOVE_PENDING_REQUEST',
        index: index
	};
};