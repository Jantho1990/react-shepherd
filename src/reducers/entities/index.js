import { combineReducers } from 'redux'
import answers from './answersEntityReducer'
import answersPlayers from './answersPlayersEntityReducer'
import players from './playersEntityReducer'
import questions from './questionsEntityReducer'

export default combineReducers({
  answers,
  answersPlayers,
  players,
  questions
})