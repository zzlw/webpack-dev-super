import App from '../containers/app';

const home= (nextState, cb)=> {
  require.ensure([], (require) => {
    cb(null, require("../containers/home").default )
  }, 'home')
}

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
		indexRoute:{ getComponent: home },
    childRoutes: [
        {path: 'home', getComponent: home},
				{path: 'music', getComponent: music},
				{path: 'collection', getComponent: collection},
		]
	}
];
