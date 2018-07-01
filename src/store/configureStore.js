import { compose, combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {
  answersReducer,
  gamesReducer,
  playersReducer,
  questionsReducer
} from '../reducers/reducers'


export const configure = (initialState = {}) => {
  const reducer = combineReducers({
    answers: answersReducer,
    games: gamesReducer,
    players: playersReducer,
    questions: questionsReducer
  })
  
  const store = createStore(reducer, initialState, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ))
  
  return store
}