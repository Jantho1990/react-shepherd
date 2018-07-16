import {
  updateObject,
  updateItemInArray,
  createReducer
} from '../helpers'
import cloneDeep from 'lodash.clonedeep'

export const defaultState = []

function addPlayer(state, action) {
  const {id, name} = action.payload
  const newPlayers = state.players.concat({
    id,
    name
  })

  return updateObject(state, {
    players: newPlayers
  })
}

function editPlayer(state, action) {
  const {id, name} = action.payload
  const newPlayers = updateItemInArray(state.players, id, player => {
    return updateObject(player, {
      name: name || player.name
    })
  })

  return updateObject(state, {
    players: newPlayers
  })
}

function deletePlayer(state, action) {
  const { id } = action.payload
  const newPlayers = state.players.filter(player => player.id !== id)

  return updateObject(state, { players: newPlayers })
}

export function playersEntitySelector(state) {
  return state.players.map(player => {
    return {
      ...player,
      answers: state.answerPlayers.filter(answerPlayer => {
        return answerPlayer.playerId === player.id
      }).map(answerPlayer => {
        return state.answers.find(answer => answer.id === answerPlayer.answerId)
      })
    }
  })
}

export function playerEntitySelector(state, id) {
  let player = state.players.find(player => player.id === id)
  player.answers = state.answerPlayers.filter(answerPlayer => {
    return answerPlayer.playerId === player.id
  }).map(answerPlayer => {
    return state.answers.find(answer => answer.id === answerPlayer.answerId)
  })
  return player
}

export default createReducer([], {
  'ADD_PLAYER': addPlayer,
  'EDIT_PLAYER': editPlayer,
  'DELETE_PLAYER': deletePlayer
})