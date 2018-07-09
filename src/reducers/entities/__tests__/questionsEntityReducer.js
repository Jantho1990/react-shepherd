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
    answers: [1, 2]
  }
]

const testAnswers = [
  {
    id: 1,
    text: 'Yes',
    questionId: 2
  },
  {
    id: 2,
    text: 'No',
    questionId: 2
  }
]

const testPlayers = [
  {
    id: 1,
    name: 'John Doe'
  },
  {
    id: 2,
    name: 'Finnegan Shaw'
  },
  {
    id: 3,
    name: 'Alicia Halibut'
  }
]

const initialState = {
  answers: testAnswers,
  players: testPlayers,
  questions: testQuestions
}

describe('Question Entities', () => {
  it('creates a new question', () => {
    const tq = {
      id: 3,
      text: 'Will this test succeed?',
      answers: []
    }
    const action = actions.questions.add(tq)

    let newState = qr(df({...initialState}), df(action))

    expect(newState.questions.length).toBe(3)
    expect(newState.questions[2].text).toBe(tq.text)
  })

  it('edits an existing question', () => {
    let tq = {
      ...testQuestions[1],
      text: 'This is different?',
      thisProp: 'Should not show up'
    }
    const action = actions.questions.edit(tq)

    let newState = qr(df({...initialState}), df(action))

    expect(newState.questions.length).toBe(2)
    let utq = newState.questions[1]
    expect(utq.text).toBe(tq.text)
    expect(utq.id).toBe(tq.id)
    expect(utq.answers.length).toBe(2)
    expect(utq.thisProp).toBeUndefined()
  })

  it('should not need all properties in order to edit', () => {
    let tq = {
      id: 2,
      text: 'I should update even though I do not have answers'
    }
    const action = actions.questions.edit(tq)

    let newState = qr(df({...initialState}), df(action))

    expect(newState.questions.length).toBe(2)
    let utq = newState.questions[1]
    expect(utq.text).toBe(tq.text)
    expect(utq.answers.length).toBe(2)
  })

  it('deletes a question', () => {
    const id = testQuestions[0].id
    const action = actions.questions.delete(id)

    let newState = qr(df({...initialState}), df(action))

    expect(newState.questions.length).toBe(1)
    expect(newState.questions.filter(q => q.id === id).length).toBe(0)
  })
})