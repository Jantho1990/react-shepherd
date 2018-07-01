export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_QUESTION':
      console.log('barf', action.question)
      return [
        ...state,
        action.question
      ]
    case 'EDIT_QUESTION':
      return state.map(item => {
        console.log('question', item, 'action', action)
        if (item.id === action.question.id) {
          console.log('got it')
          return {
            ...item,
            ...action.question,
            answers: [
              ...item.answers,
              ...action.question.answers.filter(answerId => {
                console.log(answerId, !item.answers.includes(answerId))
                return !item.answers.includes(answerId)
              })
            ]
          }
        }
        return item
      })
    case 'DELETE_QUESTION':
      return state.filter(item => item.id !== action.id)
    default:
      return state
  }
}