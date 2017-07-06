export const SAVE_USER = 'SAVE_USER';
export const DELETE_USER = 'DELETE_USER';

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';


//获取用户信息
export function saveUser(user) {
	return { type: SAVE_USER ,user};
}

//初始化用户信息
export function deleteUser() {
	return { type: DELETE_USER };
}

//发起请求
export function fetch_posts_request() {
  return { type: FETCH_POSTS_REQUEST }
}

//请求失败
export function fetch_posts_failure() {
  return { type: FETCH_POSTS_FAILURE, error: 'Oops' }
}

//请求成功
export function fetch_posts_success(json) {
  return { type: FETCH_POSTS_SUCCESS, response: { ...json } }
}

//异步获取数据
export const fetchPosts = postTitle => (dispatch, getState) => {
  dispatch(fetch_posts_request());

  setTimeout(function(){
    dispatch(fetch_posts_success({ mask: "ok" }));
  },5000)

};
