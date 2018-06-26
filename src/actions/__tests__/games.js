import actions from '../actions'

describe('Games', () => {
  describe('Actions', () => {
    test('it works', () => {
      expect(true).toBe(true)
    })

    test('generates addGame action', () => {
      let action = {
        type: 'ADD_GAME',
        game: {
          name: 'this is a game'
        }
      }

      let res = actions.games.add({
        name: 'this is a game'
      })

      expect(res).toEqual(action)
    })

    test('generates editGame action', () => {
      let action = {
        type: 'EDIT_GAME',
        game: {
          name: 'this is a different game'
        }
      }

      let res = actions.games.edit({
        name: 'this is a different game'
      })

      expect(res).toEqual(action)
    })

    test('generates deleteGame action', () => {
      let action = {
        type: 'DELETE_GAME',
        id: 1
      }

      let res = actions.games.delete(1)

      expect(res).toEqual(action)
    })

    test('generates exportGame action', () => {
      let action = {
        type: 'EXPORT_GAME',
        game: {
          title: 'New Game'
        }
      }

      let res = actions.games.export({title: 'New Game'})

      expect(res).toEqual(action)
    })

    test('generates importGame action', () => {
      let action = {
        type: 'IMPORT_GAME',
        fileName: 'path/to/game.json'
      }

      let res = actions.games.import('path/to/game.json')

      expect(res).toEqual(action)
    })
  })
})