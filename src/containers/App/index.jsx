import React, { Component } from 'react';
import { MyComponent } from '../../components';

import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <MyComponent />
        <p>
          欢迎在github上一起维护这个脚手架项目<br />
          https://github.com/GuoYongfeng
        </p>
      </div>
    );
  }
}

export default App;
