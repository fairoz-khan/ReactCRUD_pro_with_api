import _ from "lodash";
import {
	CREATE_STREAM,
	FETCH_STREAMS,
	FETCH_STREAM,
	DELETE_STREAM,
	EDIT_STREAM,
} from "../actions/types";

export default (state = {}, actions) => {
	switch (actions.type) {
		case FETCH_STREAMS:
			// return { ...state, ..._.mapKeys(state, actions.payload) }
			return actions.payload;
		case FETCH_STREAM:
			return { ...state, [actions.payload.id]: actions.payload };
		case CREATE_STREAM:
			console.log(actions.payload);
			return { ...state, [actions.payload.id]: actions.payload };
		case EDIT_STREAM:
			return { ...state, [actions.payload.id]: actions.payload };
		case DELETE_STREAM:
			return _.omit(state, actions.payload);
		default:
			return state;
	}
};
