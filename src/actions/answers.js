import questions from './questions'

let answerId = 0
export const addAnswer = (answer, questionId) => {
  return {
    type: 'ADD_ANSWER',
    answer: {
      text: answer.text,
      id: answerId++,
      players: [],
      questionId
    }
  }
}

export const editAnswer = answer => {
    return {
        type: 'EDIT_ANSWER',
        answer
    }
}

export const deleteAnswer = id => {
    return {
        type: 'DELETE_ANSWER',
        id
    }
}

export default {
    add: addAnswer,
    edit: editAnswer,
    delete: deleteAnswer
}