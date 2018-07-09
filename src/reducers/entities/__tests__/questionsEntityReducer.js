import qr from '../questionsEntityReducer'
import actions from '../../../actions/actions'
import df from 'deep-freeze-strict'

const testQuestions = [
  {
    id: 1,
    text: 'Is this not a question?',
    answers: []
  },
  {
    id: 2,
    text: 'Will this test ever end?',
    answers: []
  }
]

const initialState = {
  answers: [],
  players: [],
  questions: []
}

describe('Question Entities', () => {
  it('creates a new question', () => {
    const [ tq ] = testQuestions
    const action = actions.questions.add(tq)

    let newState = qr(df(initialState), df(action))

    expect(newState.questions.length).toBe(1)
    expect(newState.questions[0].text).toBe(tq.text)
  })

  it('edits an existing question', () => {
    const [ tq ] = testQuestions
    tq.text = "This is different?"
    const action = actions.questions.edit(tq)

    let newState = qr(df({ questions: testQuestions }), df(action))

    expect(newState.questions.length).toBe(2)
    expect(newState.questions[0].text).toBe(tq.text)
    expect(newState.questions[0].id).toBe(tq.id)
  })

  it('deletes a question', () => {
    const id = testQuestions[0].id
    const action = actions.questions.delete(id)

    let newState = qr(df({ questions: testQuestions }), df(action))

    expect(newState.questions.length).toBe(1)
    expect(newState.questions.filter(q => q.id === id).length).toBe(0)
  })
})