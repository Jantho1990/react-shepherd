let answerId = 0
// The following is for testing purposes only.
export const setAnswerId = id => answerId = id

export const addAnswer = answer => {
  return {
    type: 'ADD_ANSWER',
    payload: {
      id: answerId++,
      text: answer.text,
      questionId: answer.questionId,
      players: []
    }
  }
}

export const editAnswer = updatedAnswer => {
  return {
    type: 'EDIT_ANSWER',
    payload: updatedAnswer
  }
}

export const deleteAnswer = id => {
  return {
    type: 'DELETE_ANSWER',
    payload: { id }
  }
}

export default {
  add: addAnswer,
  edit: editAnswer,
  delete: deleteAnswer
}