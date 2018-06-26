import { compose, combineReducers, createStore } from 'redux'
import {
  answersReducer,
  gamesReducer,
  playersReducer,
  questionsReducer
} from 'src/reducers/'


export const configure = (initialState = {}) => {
  const reducer = combineReducers({
    answers: answersReducer,
    games: gamesReducer,
    players: playersReducer,
    questions: questionsReducer
  })
  
  const store = createStore(reducer, initialState, compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ))
  
  return store
}