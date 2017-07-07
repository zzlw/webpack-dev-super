import { App, Home } from '../containers';


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

export const RouterConfig = [
	{
		path: '/',
		component: App,
		indexRoute:{ component: Home },
    childRoutes: [
        {path: 'home', component: Home },
				{path: 'music', getComponent: music },
				{path: 'collection', getComponent: collection },
		]
	}
];
