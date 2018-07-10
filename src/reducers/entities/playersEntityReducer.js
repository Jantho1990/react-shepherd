import {
  updateObject,
  updateItemInArray,
  createReducer
} from '../helpers'

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

export default createReducer([], {
  'ADD_PLAYER': addPlayer,
  'EDIT_PLAYER': editPlayer,
  'DELETE_PLAYER': deletePlayer
})