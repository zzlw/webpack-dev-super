import Immutable from 'immutable';
import {
	SAVE_USER,
	DELETE_USER
} from '../actions';


//存储token
const initialState = Immutable.fromJS({token: null});
export const user = (state = initialState,action) => {
	switch (action.type){
		case SAVE_USER:
			return state.set('token',action.token);
		case DELETE_USER:
			return initialState;
		default:
			return state;
	}
}



import {
	REQUEST_POSTS,
	RECEIVE_POSTS
} from '../actions';

//首次渲染时获取数据
const defaultlState = Immutable.fromJS({data: {}, isFetching: false})
export const fetchData = (state = defaultlState , action = {}) => {
    switch(action.type){
        case REQUEST_POSTS:
            return state.set('isFetching',true);
        case RECEIVE_POSTS:
            return Immutable.Map({'data':action.json,'isFetching':false});//返回一个新的state
        default:
            return state
    }
}


// import {
//   FETCH_POSTS_REQUEST,
//   FETCH_POSTS_FAILURE,
//   FETCH_POSTS_SUCCESS
// } from '../actions';
//
//
// const subreddit = Immutable.fromJS({
//   isFetching: false,
//   didInvalidate: false,
//   lastUpdated: Date.now()
// });
//
// export const posts = (state = subreddit, action) => {
// 	switch (action.type){
// 		case FETCH_POSTS_REQUEST:
// 			return state.set('isFetching',true);
// 		case FETCH_POSTS_FAILURE:
// 			return state.set('didInvalidate',true);
//     case FETCH_POSTS_SUCCESS:
// 			return state.merge({isFetching: false}, ...action.response);
// 		default:
// 			return state;
// 	}
// }
