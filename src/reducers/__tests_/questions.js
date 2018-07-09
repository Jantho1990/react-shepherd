import questionsReducer from '../questions'
import df from 'deep-freeze-strict'

describe('Questions', () => {
  describe('Reducers', () => {
    test('it works', () => {
      expect(true).toBe(true)
    })

    test('adds a question', () => {
      let action = {
        type: 'ADD_QUESTION',
        question: {
          text: 'this is a question',
          id: 0,
          answers: []
        }
      }

      let res = questionsReducer(df([]), df(action))

      expect(res.length).toBe(1)
      expect(res[0].id).toBe(0)
      expect(res[0].text).toBe('this is a question')
      expect(res[0].answers.length).toBe(0)
    })

    test('edit a question', () => {
      let initialState = [{
        id: 1,
        text: 'this is a question'
      }]

      let question = {
        type: 'EDIT_QUESTION',
        question: {
          id: 1,
          text: 'this is a different question'
        }
      }

      let res = questionsReducer(df(initialState), df(question))

      expect(res.length).toBe(1)
      expect(res[0].text).toBe('this is a different question')
    })

    test('delete a question', () => {
      let initialState = [{
        id: 1,
        text: 'this is a question'
      }]

      let question = {
        type: 'DELETE_QUESTION',
        id: 1
      }

      let res = questionsReducer(df(initialState), df(question))

      expect(res.length).toBe(0)
    })
  })
})