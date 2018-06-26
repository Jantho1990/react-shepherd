import actions from '../actions'

describe('Answers', () => {
  describe('Actions', () => {
    test('it works', () => {
      expect(true).toBe(true)
    })

    test('generates addAnswer action', () => {
      let action = {
        type: 'ADD_ANSWER',
        answer: {
          name: 'this is an answer'
        }
      }

      let res = actions.answers.add({
        name: 'this is an answer'
      })

      expect(res).toEqual(action)
    })

    test('generates editAnswer action', () => {
      let action = {
        type: 'EDIT_ANSWER',
        answer: {
          name: 'this is a different answer'
        }
      }

      let res = actions.answers.edit({
        name: 'this is a different answer'
      })

      expect(res).toEqual(action)
    })

    test('generates deleteAnswer action', () => {
      let action = {
        type: 'DELETE_ANSWER',
        id: 1
      }

      let res = actions.answers.delete(1)

      expect(res).toEqual(action)
    })
  })
})