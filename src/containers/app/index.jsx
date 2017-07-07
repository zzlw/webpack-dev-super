import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { is, fromJS} from 'immutable';
import { Link, browserHistory } from 'react-router';
import * as Actions from '../../redux/actions';
import { Button, Icon, Input } from 'antd';
const ButtonGroup = Button.Group;
import QueueAnim from 'rc-queue-anim';
import classnames from 'classnames';
import { tool } from '../../utils/tool';
import template from '../../common/template';
//背景canvas动画

import './index.scss';

class Main extends Component {
  constructor(props,context) {
    super(props,context);
    this.state= {
      size: 'default',
      stop_state: true,
      show: true,
    };
    this.click_stop_state= this.click_stop_state.bind(this);
    this._pathname = props.location.pathname;
  }

  shouldComponentUpdate(nextProps, nextState) {
      return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
  }


  handleClick(path) {

    this.context.router.push(path);

  }

  click_stop_state(){
    this.setState({
      stop_state: !this.state.stop_state,
    })
  }

  render() {
    const { stop_state, size } = this.state.size;
    const { user, children, saveUser, posts, fetchPosts } = this.props;

    return (
      <div className="app">
            <QueueAnim className="app_left_box" component="ul">
              {this.state.stop_state ? [
            <li className="app_left_box_logo" key="app_left_box_logo">
              <div className="app_left_box_logo_box">
                <svg className="app_left_box_logo_box_svg" dangerouslySetInnerHTML={{__html: '<use xlink:href="#icon-changpian-1" />' }} />
              </div>
            </li>,
            <li className="app_left_box_child" key="app_left_box_child">
              <ul className="app_left_box_child_ul">
                <li className="app_left_box_child_ul_li">
                  <Link className="app_left_box_child_ul_li_box" onClick={ this.handleClick.bind(this,"/home") } >
                    <svg className="app_left_box_child_ul_li_box_svg" dangerouslySetInnerHTML={{__html: '<use xlink:href="#icon-changpian-1" />' }} />
                    <p className={ classnames(( (this.props.location.pathname == "/home") || (this.props.location.pathname == "/") )?"app_left_box_child_ul_li_box_hover app_left_box_child_ul_li_box_p":"app_left_box_child_ul_li_box_p") } >Home</p>
                  </Link>
                </li>
                <li className="app_left_box_child_ul_li">
                  <Link className="app_left_box_child_ul_li_box" onClick={ this.handleClick.bind(this,"/music") } >
                    <svg className="app_left_box_child_ul_li_box_svg" dangerouslySetInnerHTML={{__html: '<use xlink:href="#icon-changpian-1" />' }} />
                    <p className={ classnames(this.props.location.pathname=="/music"?"app_left_box_child_ul_li_box_hover app_left_box_child_ul_li_box_p":"app_left_box_child_ul_li_box_p") } >Music</p>
                  </Link>
                </li>
                {
                  // <li className="app_left_box_child_ul_li">
                  //   <Link className="app_left_box_child_ul_li_box" onClick={ this.handleClick.bind(this,"/collection") } >
                  //     <svg className="app_left_box_child_ul_li_box_svg" dangerouslySetInnerHTML={{__html: '<use xlink:href="#icon-changpian-1" />' }} />
                  //     <p className={ classnames(this.props.location.pathname=="/collection"?"app_left_box_child_ul_li_box_hover app_left_box_child_ul_li_box_p":"app_left_box_child_ul_li_box_p") } >Collection</p>
                  //   </Link>
                  // </li>
                  // <li className="app_left_box_child_ul_li">
                  //   <Link className="app_left_box_child_ul_li_box" onClick={ this.handleClick.bind(this,"/about") } >
                  //     <svg className="app_left_box_child_ul_li_box_svg" dangerouslySetInnerHTML={{__html: '<use xlink:href="#icon-changpian-1" />' }} />
                  //     <p className={ classnames(this.props.location.pathname=="/about"?"app_left_box_child_ul_li_box_hover app_left_box_child_ul_li_box_p":"app_left_box_child_ul_li_box_p") } >About</p>
                  //   </Link>
                  // </li>
                  // <li className="app_left_box_child_ul_li">
                  //   <Link className="app_left_box_child_ul_li_box" onClick={ this.handleClick.bind(this,"/my") } >
                  //     <svg className="app_left_box_child_ul_li_box_svg" dangerouslySetInnerHTML={{__html: '<use xlink:href="#icon-changpian-1" />' }} />
                  //     <p className={ classnames(this.props.location.pathname=="/my"?"app_left_box_child_ul_li_box_hover app_left_box_child_ul_li_box_p":"app_left_box_child_ul_li_box_p") } >My</p>
                  //   </Link>
                  // </li>
                }

              </ul>
            </li>,
            <li className="app_left_box_copyright" key="app_left_box_copyright">
              <div className="app_left_box_copyright_box">
                <span className="app_left_box_copyright_box_span">Copyright&nbsp;</span>
                <svg className="app_left_box_copyright_box_svg_cr app_left_box_copyright_box_svg" dangerouslySetInnerHTML={{__html:'<use xlink:href="#icon-copyrighted" />' }} />
                <span className="app_left_box_copyright_box_span">&nbsp;2017</span>
                <span className="app_left_box_copyright_box_span">{`${"Made"} ${"with"}`}&nbsp;</span>
                <svg className="app_left_box_copyright_box_svg_xin app_left_box_copyright_box_svg" dangerouslySetInnerHTML={{__html:'<use xlink:href="#icon-bqxin" />' }} />
                <span className="app_left_box_copyright_box_span app_left_box_copyright_box_name">&nbsp;{`${"by"} ${"Andy"}`}</span>
              </div>
            </li>
          ] : null}
         </QueueAnim>
        <div className="app_right">
            <div className="app_right_nav">
              <div className="app_right_nav_left app_right_nav_box">
                <Button className="app_right_nav_left_button app_right_nav_box_button" ghost type="primary" icon={ this.state.stop_state?"menu-fold":"menu-unfold" }  size={size} onClick={ this.click_stop_state }  ></Button>
              </div>
              <div className="app_right_nav_right app_right_nav_box">
                <ButtonGroup className="app_right_nav_box_box" >
                  <Button ghost type="primary" icon="menu-fold" size={size} >Login</Button>
                  <Button ghost type="primary" icon="logout" size={size}  >Register</Button>
                </ButtonGroup>
              </div>
            </div>
            {
              this.props.children
            }
        </div>
      </div>
    );
  }
}

export default template({
    id: 'app',  //应用关联使用的redux
    component: Main,//接收数据的组件入口
    url: ''
});
