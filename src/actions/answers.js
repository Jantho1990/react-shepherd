export const addAnswer = answer => {
    return {
        type: 'ADD_ANSWER',
        answer
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