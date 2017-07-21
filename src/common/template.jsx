import React, { Component } from 'react';
// import pureRender from 'pure-render-decorator';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { is, fromJS} from 'immutable';
// import ImmutablePropTypes from 'react-immutable-proptypes';
import * as action from '../redux/actions/index';


const Main = mySeting => {
    let seting = {
        id: '', //应用唯一id表示
        url: '', //请求地址
        data: {}, //发送给服务器的数据
        method: "get",
        component: <div></div>, //数据回调给的组件
    };

    for (let key in mySeting) {
        seting[ key ]= mySeting[ key ];
    }

    class Index extends Component {
        static defaultProps = { seting }

        constructor(props,context) {
            super(props,context);
            this.props.seting.component.contextTypes = {
            	router: PropTypes.object.isRequired
            };
        }

        render() {
            return <this.props.seting.component {...this.props} />;
        }

        componentDidMount() {//获取数据
            if (this.props.seting.url) {
                this.props.fetchPosts(this.props.seting.url,this.props.seting.data,this.props.seting.method);
            }
        }

        componentWillReceiveProps(nextProps) {

        }

        shouldComponentUpdate(nextProps, nextState) {
            return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
        }
    }

    //mapStateToProps and mapDispatchToProps
    return connect(state => { //将顶层组件与模版绑定后return回去，配置路由的时候用的就是和redux绑定的组件，所以其实每个路由匹配的都是同一个组件，只不过这个组件的内容不同
        let { user, fetchData } = state;
        return {
          user: user.toJS(),
          fetchData: fetchData.toJS(),
        }
    }, action)(Index); //连接redux
}


export default Main;
