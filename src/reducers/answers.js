export default (state = {}, action) => {
  switch (action.type) {
    case 'ADD_ANSWER':
      return [
        ...state,
        action.answer
      ]
    case 'EDIT_ANSWER':
      return state.map(item => {
        if (item.id === action.answer.id) {
          return action.answer
        }
        return item
      })
    case 'DELETE_ANSWER':
      return state.filter(item => item.id !== action.id)
    default:
      return state
  }
}