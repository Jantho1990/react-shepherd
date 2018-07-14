import {
  updateObject,
  updateItemInArray,
  createReducer
} from '../helpers'

function addAnswer(state, action) {
  const {id, text, questionId, players} = action.payload
  const newAnswers = state.answers.concat({
    id,
    text,
    questionId,
    players
  })

  return updateObject(state, {answers: newAnswers})
}

function editAnswer(state, action) {
  const {id, text, questionId, players} = action.payload
  const newAnswers = updateItemInArray(state.answers, id, answer => {
    return updateObject(answer, {
      text: text || answer.text,
      questionId: questionId || answer.questionId,
      players: players || answer.players
    })
  })

  return updateObject(state, {answers: newAnswers})
}

function deleteAnswer(state, action) {
  const { id } = action.payload
  const newAnswers = state.answers.filter(answer => answer.id !== id)

  return updateObject(state, {answers: newAnswers})
}

function deleteAnswersByQuestionId(state, action) {
  const { id: questionId } = action.payload
  const newAnswers = state.answers.filter(answer => answer.questionId !== questionId)

  return updateObject(state, {answers: newAnswers})
}

export function answerEntitySelector(state, id) {
  let answer = state.answers.find(answer => answer.id === id)
  answer.players = state.answerPlayers.filter(answerPlayer => {
    return answerPlayer.answerId === answer.id
  }).map(answerPlayer => {
    return state.players.find(player => player.id === answerPlayer.playerId)
  })
  return answer
}

export default createReducer([], {
  'ADD_ANSWER': addAnswer,
  'EDIT_ANSWER': editAnswer,
  'DELETE_ANSWER': deleteAnswer,
  'DELETE_QUESTION': deleteAnswersByQuestionId
})