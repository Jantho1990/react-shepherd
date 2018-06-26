export const addGame = game => {
    return {
        type: 'ADD_GAME',
        game
    }
}

export const editGame = game => {
    return {
        type: 'EDIT_GAME',
        game
    }
}

export const deleteGame = id => {
    return {
        type: 'DELETE_GAME',
        id
    }
}

export const exportGame = game => {
    return {
        type: 'EXPORT_GAME',
        game
    }
}

export const importGame = fileName => {
    return {
        type: 'IMPORT_GAME',
        fileName
    }
}

export default {
    add: addGame,
    edit: editGame,
    delete: deleteGame,
    export: exportGame,
    import: importGame
}