export const addPlayer = player => {
    return {
        type: 'ADD_PLAYER',
        player
    }
}

export const editPlayer = player => {
    return {
        type: 'EDIT_PLAYER',
        player
    }
}

export const deletePlayer = id => {
    return {
        type: 'DELETE_PLAYER',
        id
    }
}

export default {
    add: addPlayer,
    edit: editPlayer,
    delete: deletePlayer
}