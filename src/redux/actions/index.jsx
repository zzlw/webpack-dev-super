import request from 'superagent';
import {target} from '../../utils/config'
import {tool} from '../../utils/tool'
import { display_index } from '../../apis';

export const SAVE_USER = 'SAVE_USER';
export const DELETE_USER = 'DELETE_USER';

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'


//获取用户信息
export function saveUser(user) {
	return { type: SAVE_USER ,user};
}

//初始化用户信息
export function deleteUser() {
	return { type: DELETE_USER };
}


//开始获取数据
const requestPosts = path => {
  return {
    type: REQUEST_POSTS,
    path
  }
}

//获取数据成功
const receivePosts = (path, json) => {
  return {
        type: RECEIVE_POSTS,
        path,
        json
    }
}


// 页面初次渲染时获取数据
export const fetchPosts = (path, postData, method) => {
    return dispatch => {
        dispatch(requestPosts(postData));
        return display_index(path,method,data => dispatch(receivePosts(path, data)),postData);
    }
}
