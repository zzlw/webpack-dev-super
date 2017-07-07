import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { is, fromJS} from 'immutable';
import * as Actions from '../../redux/actions';
import { MyComponent } from '../../components';
import { BgCanvas } from '../../components';
import { tool } from '../../utils/tool';
import template from '../../common/template';

import './index.scss';

class Main extends Component {
  constructor( props, context ) {
    super( props, context );
    this.state= {
      current: 'mail',
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
      return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
  }


  handleClick(e){
    this.setState({
      current: e.key,
    });
  }

  componentDidMount(){
    // let { fetchPosts } = this.props;
    // fetchPosts();
  }

  render() {
    let { fetchData }= this.props;

    if ( __DEV__ ){
      if( !fetchData.isFetching ){
        console.log( fetchData.data );
      }
    }

    return (
      <div className="home">
        <BgCanvas title="fff"/>
        <p className="home_title">{ fetchData.isFetching?"正在拉去数据！":"成功！" }</p>
        <p className="home_title">欢迎和我一起维护这个音乐项目！</p>
        <p className="home_text">
          <a className="home_text_a" href="http://github.com/zzlw/webpack-dev-super" target="_blank">{"http://github.com/zzlw/webpack-dev-super"}</a>
        </p>
      </div>
    );
  }
}

export default template({
    id: 'home',  //应用关联使用的redux
    component: Main,//接收数据的组件入口
    url: '/topics'
});
