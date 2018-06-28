export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_QUESTION':
      return [
        ...state,
        action.question
      ]
    case 'EDIT_QUESTION':
      return state.map(item => {
        if (item.id === action.question.id) {
          return action.question
        }
        return item
      })
    case 'DELETE_QUESTION':
      return state.filter(item => item.id !== action.id)
    default:
      return state
  }
}