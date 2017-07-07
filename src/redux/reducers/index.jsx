import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';
// import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';
import user from './user';
import posts from './posts';
// import routing from './router-reducer';


const rootReducer = combineReducers({
	user,
	posts
});

export default rootReducer;
