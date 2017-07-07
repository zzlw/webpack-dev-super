import Immutable from 'immutable';
import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_SUCCESS
} from '../actions';


const subreddit = Immutable.fromJS({
  isFetching: false,
  didInvalidate: false,
  lastUpdated: Date.now()
});

function posts (state = subreddit, action){
	switch (action.type){
		case FETCH_POSTS_REQUEST:
			return state.set('isFetching',true);
		case FETCH_POSTS_FAILURE:
			return state.set('didInvalidate',true);
    case FETCH_POSTS_SUCCESS:
			return state.merge({isFetching: false}, ...action.response);
		default:
			return state;
	}
}


export default posts;
