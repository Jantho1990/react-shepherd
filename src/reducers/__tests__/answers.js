import answersReducer from '../answers'
import df from 'deep-freeze-strict'

describe('Answers', () => {
  describe('Reducers', () => {
    test('it works', () => {
      expect(true).toBe(true)
    })

    test('adds a answer', () => {
      let action = {
        type: 'ADD_ANSWER',
        answer: {
          id: 0,
          text: 'this is an answer',
          players: []
        }
      }

      let res = answersReducer(df([]), df(action))

      expect(res.length).toBe(1)
      expect(res[0].text).toBe('this is an answer')
      expect(res[0].id).toBe(0)
      expect(res[0].players).toEqual([])
    })
    
    test('edit a answer', () => {
      let initialState = [
        {
          id: 1,
          text: 'this is an answer'
        }
      ]
      
      let action = {
        type: 'EDIT_ANSWER',
        answer: {
          id: 1,
          text: 'this is a different answer'
        }
      }

      let res = answersReducer(df(initialState), df(action))

      expect(res.length).toBe(1)
      expect(res[0].text).toBe('this is a different answer')
    })

    test('delete a answer', () => {
      let initialState = [
        {
          id: 1,
          text: 'this is an answer'
        }
      ]

      let action = {
        type: 'DELETE_ANSWER',
        id: 1
      }

      let res = answersReducer(df(initialState), df(action))

      expect(res.length).toBe(0)
    })
  })
})