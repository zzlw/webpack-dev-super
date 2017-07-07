import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { is, fromJS} from 'immutable';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions';
import { MusicBgCanvas } from '../../components';
import { Button, Icon, Input, AutoComplete, Table, Tag } from 'antd';
import { tool } from '../../utils/tool';
import template from '../../common/template';
const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;
const ButtonGroup = Button.Group;

import './index.scss';


class Main extends Component {
  constructor(props,context) {
    super(props,context);
    this.state= {
      current: 'mail',
      size: 'small',
      stop_state: true,
      selectedRowKeys: [],
    };
    this.click_stop_state= this.click_stop_state.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
      return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
  }


  handleClick(e) {
    this.setState({
      current: e.key,
    });
  }

  click_stop_state(){
    this.setState({
      stop_state: !this.state.stop_state,
    })
  }

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  }

  componentDidMount(){

    //音乐播放器

  }


  render() {

    if ( __DEV__ ){
      //  console.log(this.state.stop_state);
    }
    
    const { stop_state, size } = this.state;

    const dataSource = [{
      title: '音乐',
      children: [{
        title: '绅士',
        count: 10000,
      }, {
        title: '绅士 — 薛之谦',
        count: 10600,
      }],
    }, {
      title: 'MV',
      children: [{
        title: '绅士',
        count: 60100,
      }, {
        title: '绅士 — 迭名',
        count: 30010,
      }],
    }, {
      title: '艺人',
      children: [{
        title: 'Music - 开源音乐项目',
        count: 100000,
      }],
    }];

    function renderTitle(title) {
      return (
        <span>
          {title}
          <a
            style={{ float: 'right' }}
            href="https://www.google.com/search?q=antd"
            target="_blank"
            rel="noopener noreferrer"
          >更多
          </a>
        </span>
      );
    }

    const options = dataSource.map(group =>
      <OptGroup
        key={group.title}
        label={renderTitle(group.title)}
      >
        {group.children.map(opt =>
          <Option key={opt.title} value={opt.title}>
            {opt.title}
            <span className="certain-search-item-count">{opt.count} 人 关注</span>
          </Option>)
        }
      </OptGroup>).concat([
        <Option disabled key="all" className="show-all">
          <a
            href="https://www.google.com/search?q=antd"
            target="_blank"
            rel="noopener noreferrer"
          >查看所有结果</a>
        </Option>,
      ]);


      const dataTable = [{
        key: '1',
        collection: <ButtonGroup value={size} onChange={this.handleSizeChange}>
                      <Button value="small"><Icon type="play-circle-o" /></Button>
                      <Button value="small"><Icon type="plus-circle-o" /></Button>
                      <Button value="small"><Icon type="heart-o" /></Button>
                      <Button value="small"><Icon type="download" /></Button>
                    </ButtonGroup>,
        name: '薛之谦',
        age: '薛之谦',
        address: '绅士'
      }, {
        key: '2',
        collection: <ButtonGroup value={size} onChange={this.handleSizeChange}>
                      <Button value="small"><Icon type="play-circle-o" /></Button>
                      <Button value="small"><Icon type="plus-circle-o" /></Button>
                      <Button value="small"><Icon type="heart-o" /></Button>
                      <Button value="small"><Icon type="download" /></Button>
                      {
                        /* <Button value="small"><Icon type="delete" /></Button> */
                      }


                    </ButtonGroup>,
        name: '丑八怪',
        age: '薛之谦',
        address: '绅士'
      }];

      const columns = [{
        title: '歌曲',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '演唱',
        dataIndex: 'age',
        key: 'age',
      }, {
        title: '专辑',
        dataIndex: 'address',
        key: 'address',
      },{
        title: '控制',
        dataIndex: 'collection',
        key: 'collection',
      }];

    function removeByValue(arr, val) {
      for(var i=0; i < arr.length; i++) {
        if(arr[i] == val) {
          arr.splice(i, 1);
          break;
        }
      }
    }

    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
         //console.log(`selectedRowKeys: ${selectedRowKeys}`, `selectedRows: ${selectedRows}`);
      },
      onSelect: (record, selected, selectedRows) => {
        //console.log(selectedRows);
        if( !selected ){
          this.state.selectedRowKeys.push( record.key );
        }else {
          removeByValue( this.state.selectedRowKeys, record.key );
        }
        this.setState(this.state);

      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        if( selected ){
          this.setState({
            selectedRowKeys: [],
          });
        }else {
          this.setState({
            selectedRowKeys: ['1','2'],
          });
        }
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User',    // Column configuration not to be checked
      }),
    };

    return (
      <div className="music">
        { /*<MusicBgCanvas />*/ }
        <div className="music_box">
          <div className="music_box_search">
            <ButtonGroup value={this.state.size} >
              <Button value="small">添加</Button>
              <Button value="small">下载</Button>
            </ButtonGroup>
            <div className="certain-category-search-wrapper" style={{ width: 350 }}>
              <AutoComplete
                className="certain-category-search"
                dropdownClassName="certain-category-search-dropdown"
                dropdownMatchSelectWidth={false}
                dropdownStyle={{ width: 300 }}
                size="large"
                style={{ width: '100%' }}
                dataSource={options}
                placeholder="Serch"
                optionLabelProp="value"
              >
                <Input suffix={<Icon type="search" className="certain-category-icon" />} />
              </AutoComplete>
            </div>
          </div>
          <div className="music_box_con">
            {  <Table rowSelection= { rowSelection }  dataSource={dataTable} columns={columns} />  }
          </div>
        </div>
      </div>
    );
  }
}



// App.contextTypes = {
// 	router: React.PropTypes.object.isRequired
// };
//
//
// export default App;

export default template({
    id: 'collection',  //应用关联使用的redux
    component: Main,//接收数据的组件入口
    url: ''
});
