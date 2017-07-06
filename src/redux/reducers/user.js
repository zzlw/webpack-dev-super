import Immutable from 'immutable';
import {
	SAVE_USER,
	DELETE_USER
} from '../actions';

const initialState = Immutable.fromJS({token: null});

function user (state = initialState,action){
	console.log(state);
	switch (action.type){
		case SAVE_USER:
			return state.set('token',action.token);
		case DELETE_USER:
			return initialState;
		default:
			return state;
	}

}

export default user;
