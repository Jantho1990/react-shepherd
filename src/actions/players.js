let playerId = 0
// The following is for testing purposes only.
export const setPlayerId = id => playerId = id

export const addPlayer = player => {
  return {
    type: 'ADD_PLAYER',
    payload: {
      id: playerId++,
      name: player.name
    }
  }
}

export const editPlayer = updatedPlayer => {
  return {
    type: 'EDIT_PLAYER',
    payload: updatedPlayer
  }
}

export const deletePlayer = id => {
  return {
    type: 'DELETE_PLAYER',
    payload: { id }
  }
}

export default {
  add: addPlayer,
  edit: editPlayer,
  delete: deletePlayer
}