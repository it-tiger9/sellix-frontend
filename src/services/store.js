import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducer'
import { createLogger } from 'redux-logger'
const logger = createLogger({
    collapsed: true
});

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function configureStore(initialState={}) {
  return createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk, logger)
      )
  )
}