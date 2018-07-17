import { createReducer } from '../helpers'
import answers from './answersEntityReducer'
import answersPlayers from './answersPlayersEntityReducer'
import players from './playersEntityReducer'
import questions from './questionsEntityReducer'

function combineReducerFunctions(collection, reducers) {
  let ret = {
    ...collection
  }
  Object.keys(reducers).forEach(action => {
    const refFunc = reducers[action]
    if (collection[action] === undefined) {
      ret[action] = function(state, action) {
        return refFunc(state, action)
      }
    } else {
      const retFunc = ret[action]
      ret[action] = function(state, action) {
        return refFunc(retFunc(state, action), action)
      }
    }
  })
  return ret
}

const reducerFunctionGroups = [
  answers,
  answersPlayers,
  players,
  questions
]

let combinedReducerFunctions = {}
reducerFunctionGroups.forEach(reducerFunctions => {
  combinedReducerFunctions = combineReducerFunctions(combinedReducerFunctions, reducerFunctions)
})

export default createReducer({
  answers: [],
  answersPlayers: [],
  players: [],
  questions: []
}, {
  ...combinedReducerFunctions
})