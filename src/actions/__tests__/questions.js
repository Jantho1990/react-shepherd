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
          name: 'this is a question'
        }
      }

      let res = actions.questions.add({
        name: 'this is a question'
      })

      expect(res).toEqual(action)
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