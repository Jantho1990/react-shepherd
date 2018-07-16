import { compose, combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {
  entitiesReducer as entities
} from '../reducers/reducers'


export const configure = (initialState = {}) => {
  const reducer = combineReducers({
    entities
  })
  
  const store = createStore(reducer, initialState, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ))
  
  return store
}