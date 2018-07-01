import actions from '../actions'

describe('Questions', () => {
  describe('Actions', () => {
    test('it works', () => {
      expect(true).toBe(true)
    })

    test('generates addQuestion action', () => {
      let action = {
        type: 'ADD_QUESTION',
        question: {
          id: 0,
          text: 'this is a question',
          answers: []
        }
      }

      let res = actions.questions.add({
        text: 'this is a question'
      })

      expect(res.text).toEqual(action.text)
      expect(res.id).toBe(action.id)
      expect(res.answers).toEqual(action.answers)
    })

    test('generates editQuestion action', () => {
      let action = {
        type: 'EDIT_QUESTION',
        question: {
          name: 'this is a different question'
        }
      }

      let res = actions.questions.edit({
        name: 'this is a different question'
      })

      expect(res).toEqual(action)
    })

    test('generates deleteQuestion action', () => {
      let action = {
        type: 'DELETE_QUESTION',
        id: 1
      }

      let res = actions.questions.delete(1)

      expect(res).toEqual(action)
    })
  })
})