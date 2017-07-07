import fetch from 'isomorphic-fetch'
import {target} from '../../utils/config'
import {tool} from '../../utils/tool'

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

// //发起请求
// export function fetch_posts_request() {
//   return { type: FETCH_POSTS_REQUEST }
// }

// //请求失败
// export function fetch_posts_failure() {
//   return { type: FETCH_POSTS_FAILURE, error: 'Oops' }
// }
//
// //请求成功
// export function fetch_posts_success(json) {
//   return { type: FETCH_POSTS_SUCCESS, response: { ...json } }
// }
//
// //异步获取数据
// export const fetchPosts = postTitle => (dispatch, getState) => {
//   dispatch(fetch_posts_request());
//
//   setTimeout(function(){
//     dispatch(fetch_posts_success({ mask: "ok" }));
//   },5000)
//
// };



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
        path ,
        json
    }
}


// 页面初次渲染时获取数据
export const fetchPosts = (path, postData) => {
    let url = target + path + tool.paramType(postData);
    return dispatch => {
        dispatch(requestPosts(postData));
        return fetch(url,{
            mode: 'cors',
            "Content-Type": "application/json",
        })
        .then(response => {
            if (response.ok) {
                response.json().then(json => dispatch(receivePosts(path, json)))
            } else {
                console.log("status", response.status);
            }
        })
        .catch(error => console.log(error))
    }
}
