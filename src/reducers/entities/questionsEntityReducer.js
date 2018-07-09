import {
  updateObject,
  updateItemInArray,
  createReducer
} from '../helpers'
import { CLIENT_RENEG_WINDOW } from 'tls';

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
  const { answers, id, text } = action.payload
  const newQuestions = updateItemInArray(state.questions, id, question => {
    return updateObject(question, {
      text: text || question.text,
      answers: answers || question.answers
    })
  })

  return updateObject(state, {questions: newQuestions})
}

function deleteQuestion(state, action) {
  let { id } = action.payload
  const newQuestions = state.questions.filter(question => question.id !== id)

  return updateObject(state, {questions: newQuestions})
}

function associateAnswer(state, action) {
  let { id: answerId, questionId } = action.payload
  const newQuestions = updateItemInArray(state.questions, questionId, question => {
    return updateObject(question, {
      ...question,
      answers: [
        ...question.answers,
        answerId
      ]
    })
  })

  return updateObject(state, {questions: newQuestions})
}

function disassociateAnswer(state, action) {
  let { id: answerId } = action.payload
  const newQuestions = state.questions.map(question => {
    return updateObject(question, {
      ...question,
      answers: question.answers.filter(id => id !== answerId)
    })
  })

  return updateObject(state, {questions: newQuestions})
}

export default createReducer([], {
  'ADD_QUESTION': addQuestion,
  'EDIT_QUESTION': editQuestion,
  'DELETE_QUESTION': deleteQuestion,
  'ADD_ANSWER': associateAnswer,
  'DELETE_ANSWER': disassociateAnswer
})