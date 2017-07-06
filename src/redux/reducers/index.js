import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';
// import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';
import user from './user.js';
import posts from './posts.js';
// import routing from './router-reducer.js';


const rootReducer = combineReducers({
	user,
	posts
});

export default rootReducer;
