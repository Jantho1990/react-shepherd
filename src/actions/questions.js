let answerId = 0
export const addQuestion = question => {
    return {
        type: 'ADD_QUESTION',
        question: {
            text: question.text,
            id: answerId++,
            answers: []
        }
    }
}

export const editQuestion = question => {
    return {
        type: 'EDIT_QUESTION',
        question: {
            /* text: question.text,
            id: question.id,
            answers: question.answers */
            ...question
        }
    }
}

export const deleteQuestion = id => {
    return {
        type: 'DELETE_QUESTION',
        id
    }
}

export default {
    add: addQuestion,
    edit: editQuestion,
    delete: deleteQuestion
}