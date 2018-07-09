import playersReducer from '../players'
import df from 'deep-freeze-strict'

describe('Players', () => {
  describe('Reducers', () => {
    test('it works', () => {
      expect(true).toBe(true)
    })

    test('adds a player', () => {
      let action = {
        type: 'ADD_PLAYER',
        player: {
          id: 1,
          name: 'Josh'
        }
      }

      let res = playersReducer(df([]), df(action))

      expect(res.length).toBe(1)
      expect(res[0].name).toBe('Josh')
    })
    
    test('edit a player', () => {
      let initialState = [
        {
          id: 1,
          name: 'Josh'
        }
      ]
      
      let action = {
        type: 'EDIT_PLAYER',
        player: {
          id: 1,
          name: 'Matt'
        }
      }

      let res = playersReducer(df(initialState), df(action))

      expect(res.length).toBe(1)
      expect(res[0].name).toBe('Matt')
    })

    test('delete a player', () => {
      let initialState = [
        {
          id: 1,
          name: 'Josh'
        }
      ]

      let action = {
        type: 'DELETE_PLAYER',
        id: 1
      }

      let res = playersReducer(df(initialState), df(action))

      expect(res.length).toBe(0)
    })
  })
})