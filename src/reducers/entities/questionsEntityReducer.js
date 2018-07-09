import {
  updateObject,
  updateItemInArray,
  createReducer
} from '../helpers'

function addQuestion(state, action) {
  const { answers, id, text } = action.payload
  const newQuestions = state.questions.concat({
    id,
    text,
    answers
  })

  return updateObject(state, {questions: newQuestions})
}

function editQuestion(state, action) {
  const newQuestions = updateItemInArray(state.questions, action.id, question => {
    return updateObject(question, {
      text: action.text,
      answers: action.answers
    })
  })

  return updateObject(state, {questions: newQuestions})
}

function deleteQuestion(state, action) {
  const newQuestions = state.questions.filter(question => question.id !== action.id)

  return updateObject(state, {questions: newQuestions})
}

function associateAnswer(state, action) {
  const newQuestions = updateItemInArray(state.questions, action.questionId, question => {
    return updateObject(question, {
      ...question,
      answers: [
        ...question.answers,
        action.id
      ]
    })
  })

  return updateObject(state, {questions: newQuestions})
}

function disassociateAnswers(state, action) {
  const newQuestions = updateItemInArray(state.questions, action.questionId, question => {
    return updateObject(question, {
      ...question,
      answers: question.answers.filter(answerId => answerId !== action.id)
    })
  })

  return updateObject(state, {questions: newQuestions})
}

export default createReducer([], {
  'ADD_QUESTION': addQuestion,
  'EDIT_QUESTION': editQuestion,
  'DELETE_QUESTION': deleteQuestion,
  'ADD_ANSWER': associateAnswer,
  'DELETE_ANSWER': disassociateAnswers
})