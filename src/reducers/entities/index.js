import { combineReducers } from 'redux'
import answers from './answersEntityReducer'
import answersPlayers from './answersPlayersEntityReducer'
import players, {
  defaultState as playersDefaultState
} from './playersEntityReducer'
import questions from './questionsEntityReducer'

export const defaultState = {
  players: playersDefaultState
}

export default {
  answers,
  answersPlayers,
  players,
  questions
}