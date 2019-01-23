import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducer'
import {middleware} from '../navigator/AppNavigator'

// 自己定义一个中间件
const logger = store => next => action => {
  if (typeof action === 'function') {
    // console.log('dispatching a function')
  } else {
    // console.log('dispatching', action)
  }

  const result = next(action)
  // console.log('nextState',store.getState());
}



const middlewares = [
  middleware,
  thunk,
  logger
];

/**
 * 创建store
 */
export default createStore(reducers, applyMiddleware(...middlewares));
