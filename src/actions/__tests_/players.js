import actions from '../actions'

describe('Players', () => {
  describe('Actions', () => {
    test('it works', () => {
      expect(true).toBe(true)
    })
  
    test('generates addPlayer action', () => {
      let action = {
        type: 'ADD_PLAYER',
        player: {
          name: 'Josh'
        }
      }
  
      let res = actions.players.add({ name: 'Josh' })
  
      expect(res).toEqual(action)
    })
    
    test('generates editPlayer action', () => {
      let action = {
        type: 'EDIT_PLAYER',
        player: {
          name: 'Matt'
        }
      }
  
      let res = actions.players.edit({ name: 'Matt' })
  
      expect(res).toEqual(action)
    })
    
    test('generates deletePlayer action', () => {
      let action = {
        type: 'DELETE_PLAYER',
        id: 1
      }
  
      let res = actions.players.delete(1)
  
      expect(res).toEqual(action)
    })
  })
})