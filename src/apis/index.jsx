import fetch from 'isomorphic-fetch';
import {target} from '../utils/config';
import {tool} from '../utils/tool';
import request from 'superagent';


export function _fetch(path, postData, fn){

    let url = target + path + tool.paramType(postData);

    return fetch(url,{
        mode: 'cors',
        "Content-Type": "application/json",
    })
    .then(response => {
        if (response.ok) {
            response.json().then(json => { fn(false,json) })
        } else {
            fn(true, response.status);
        }
    })
    .catch(error => console.log(error))
}



export function question_classifications(data,callback){
  request
  	.post(`${target}/question/classifications`)
    //.set('Content-Type', 'application/json')
    //.send(data)
  	.end((err, res)=>{
  		if(err){
        console.log( err )
  			return
  		}
      return callback(JSON.parse(res.text))
  	})
}

export function question_id(data,callback){
  request
  	.get(`${target}/web/questions/${data.id}`)
    //.set('Content-Type', 'application/json')
    //.send(data)
  	.end((err, res)=>{
  		if(err){
        console.log( err )
  			return
  		}
      return callback(JSON.parse(res.text))
  	})
}


//首屏渲染
export function display_index(url,method,callback,data){
  request
    [ method ](`${target}${url}`)
    // .set('Content-Type', 'application/json')
    [method=="get"?"query":"send"](data)
  	.end((err, res)=>{
  		if(err){
        console.log( err )
  			return
  		}
      return callback(JSON.parse(res.text))
  	})
}


//帮助中心搜索
export function web_questions_search(data,callback){
  request
  	.get(`${target}/web/questions-search`)
    .query(data.query)
    .set('token', data.token)
  	.end((err, res)=>{
  		if(err){
        console.log( err )
  			return
  		}
      return callback(JSON.parse(res.text))
  	})
}
