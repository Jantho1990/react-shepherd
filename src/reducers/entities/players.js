import {
  updateObject,
  updateItemInArray,
  createReducer
} from '../helpers'

function addPlayer(state, action) {
  const newPlayers = state.players.concat({
    id: action.id,
    text: action.text,
    players: action.players
  })

  return updateObject(state, {
    players: newPlayers
  })
}

function editPlayer(state, action) {
  const newPlayers = updateItemInArray(state.players, action.id, player => {
    return updateObject(player, {
      text: action.text,
      players: action.players
    })
  })

  return updateObject(state, {
    players: newPlayers
  })
}

function deletePlayer(state, action) {
  const newPlayers = state.players.filter(player => player.id === action.id)

  return updateObject(state, {
    players: newPlayers
  })
}

function associateAnswer(state, action) {
  const newPlayers = updateItemInArray(state.players, action.playerId, player => {
    return updateObject(player, {
      ...player,
      answers: [
        ...player.answers,
        action.id
      ]
    })
  })

  return updateObject(state, {players: newPlayers})
}

function disassociateAnswer(state, action) {
  const newPlayers = updateItemInArray(state.players, action.playerId, player => {
    return updateObject(player, {
      ...player,
      answers: player.answers.filter(answerId => answerId !== action.id)
    })
  })

  return updateObject(state, {players: newPlayers})

export default playersReducer = createReducer(playersState = [], {
  'ADD_PLAYER': addPlayer,
  'EDIT_PLAYER': editPlayer,
  'DELETE_PLAYER': deletePlayer
})