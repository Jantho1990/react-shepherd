let questionId = 0
// The following is for testing purposes only.
export const setQuestionId = id => questionId = id

export const addQuestion = question => {
    return {
        type: 'ADD_QUESTION',
        payload: {
            text: question.text,
            id: questionId++,
            answers: []
        }
    }
}

export const editQuestion = updatedQuestion => {
    return {
        type: 'EDIT_QUESTION',
        payload: updatedQuestion
    }
}

export const deleteQuestion = id => {
    return {
        type: 'DELETE_QUESTION',
        payload: { id }
    }
}

export default {
    add: addQuestion,
    edit: editQuestion,
    delete: deleteQuestion
}