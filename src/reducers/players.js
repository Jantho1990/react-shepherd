export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_PLAYER':
      return [
        ...state,
        action.player
      ]
    case 'EDIT_PLAYER':
      return state.map(item => {
        if (item.id === action.player.id) {
          return action.player
        }
        return item
      })
    case 'DELETE_PLAYER':
      return state.filter(item => item.id !== action.id)
    default:
      return state
  }
}