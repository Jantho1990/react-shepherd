import {
  updateObject,
  updateItemInArray,
  createReducer
} from '../helpers'

function addAnswer(state, action) {
  const newAnswers = state.answers.concat({
    id: action.id,
    text: action.text,
    answers: action.answers
  })

  return updateObject(state, {answers: newAnswers})
}

function editAnswer(state, action) {
  const newAnswers = updateItemInArray(state.answers, action.id, answer => {
    return updateObject(answer, {
      text: action.text,
      answers: action.answers
    })
  })

  return updateObject(state, {answers: newAnswers})
}

function deleteAnswer(state, action) {
  const newAnswers = state.answers.filter(answer => answer.id !== action.id)

  return updateObject(state, {answers: newAnswers})
}

export default answersReducer = createReducer(answersState = [], {
  'ADD_ANSWER': addAnswer,
  'EDIT_ANSWER': editAnswer,
  'DELETE_ANSWER': deleteAnswer
})