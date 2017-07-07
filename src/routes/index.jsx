import React, {Component} from 'react';
import { Router, Route, Redirect, IndexRoute, browserHistory, hashHistory } from 'react-router';



import { App, Home } from '../containers';

const history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;

// const home= (nextState, cb)=> {
//   require.ensure([], (require) => {
//     cb(null, require("../containers/home").default )
//   }, 'home')
// }

const music= (nextState, cb)=> {
  require.ensure([], (require) => {
    cb(null, require("../containers/music").default )
  }, 'music')
}


const collection= (nextState, cb)=> {
  require.ensure([], (require) => {
    cb(null, require("../containers/collection").default )
  }, 'collection')
}


const RouteConfig = (
    <Router history={history}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="home" component={Home} />
            <Route path="music" getComponent={music} />
            <Route path="collection" getComponent={collection} />
            <Redirect from='*' to='/'  />
        </Route>
    </Router>
);


export default RouteConfig;
