export const addQuestion = question => {
    return {
        type: 'ADD_QUESTION',
        question
    }
}

export const editQuestion = question => {
    return {
        type: 'EDIT_QUESTION',
        question
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