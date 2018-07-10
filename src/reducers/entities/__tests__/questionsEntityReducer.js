import qr from '../questionsEntityReducer'
import actions from '../../../actions/actions'
import { setQuestionId } from '../../../actions/questions'
import { setAnswerId } from '../../../actions/answers'
import { setPlayerId } from '../../../actions/players'
import df from 'deep-freeze-strict'

const testQuestions = [
  {
    id: 0,
    text: 'Is this not a question?',
    answers: []
  },
  {
    id: 1,
    text: 'Will this test ever end?',
    answers: [0, 1]
  }
]

const testAnswers = [
  {
    id: 0,
    text: 'Yes',
    questionId: 1
  },
  {
    id: 1,
    text: 'No',
    questionId: 1
  },
  {
    id: 2,
    text: 'Yes',
    questionId: 0
  },
  {
    id: 3,
    text: 'No',
    questionId: 0
  }
]

const testPlayers = [
  {
    id: 0,
    name: 'John Doe'
  },
  {
    id: 1,
    name: 'Finnegan Shaw'
  },
  {
    id: 2,
    name: 'Alicia Halibut'
  }
]

const initialState = {
  answers: testAnswers,
  players: testPlayers,
  questions: testQuestions
}

beforeEach(() => {
  setAnswerId(4)
  setPlayerId(3)
  setQuestionId(2)
})

describe('Question Entities', () => {
  it('creates a new question', () => {
    const question = {
      text: 'Will this test succeed?',
      answers: []
    }
    const action = actions.questions.add(question)

    let newState = qr(df({...initialState}), df(action))

    expect(newState.questions.length).toBe(initialState.questions.length + 1)
    expect(newState.questions[2].id).toBe(2)
    expect(newState.questions[2].text).toBe(question.text)
  })

  it('should not add new properties on create', () => {
    const question = {
      text: 'Will this test succeed?',
      answers: [],
      thisProp: 'Should not show up'
    }
    const action = actions.questions.add(question)

    const newState = qr(df({...initialState}), df(action))

    expect(newState.questions.length).toBe(initialState.questions.length + 1)
    let ntq = newState.questions[2]
    expect(ntq.id).toBe(2)
    expect(ntq.text).toBe(question.text)
    expect(ntq.answers).toEqual(question.answers)
    expect(ntq.thisProp).toBeUndefined()
  })

  it('edits an existing question', () => {
    let question = {
      id: 1,
      text: 'This is different?'
    }
    const action = actions.questions.edit(question)

    let newState = qr(df({...initialState}), df(action))

    expect(newState.questions.length).toBe(initialState.questions.length)
    let utq = newState.questions[1]
    expect(utq.text).toBe(question.text)
    expect(utq.id).toBe(question.id)
    expect(utq.answers.length).toBe(2)
  })

  it('should not add new properties on edit', () => {
    const question = {
      id: 1,
      text: 'This is different?',
      answers: [],
      thisProp: 'Should not show up'
    }
    const action = actions.questions.edit(question)

    const newState = qr(df({...initialState}), df(action))

    expect(newState.questions.length).toBe(initialState.questions.length)
    let ntq = newState.questions[1]
    expect(ntq.id).toBe(question.id)
    expect(ntq.text).toBe(question.text)
    expect(ntq.answers).toEqual(question.answers)
    expect(ntq.thisProp).toBeUndefined()
  })

  it('should not need all properties in order to edit', () => {
    let question = {
      id: 1,
      text: 'I should update even though I do not have answers'
    }
    const action = actions.questions.edit(question)

    let newState = qr(df({...initialState}), df(action))

    expect(newState.questions.length).toBe(initialState.questions.length)
    let utq = newState.questions[1]
    expect(utq.text).toBe(question.text)
    expect(utq.answers.length).toBe(2)
  })

  it('deletes a question', () => {
    const id = testQuestions[0].id
    const action = actions.questions.delete(id)

    let newState = qr(df({...initialState}), df(action))

    expect(newState.questions.length).toBe(1)
    expect(newState.questions.filter(q => q.id === id).length).toBe(0)
  })

  it('updates its answers when a new answer is associated with it', () => {
    const newAnswer = {
      text: 'I am a new answer!',
      questionId: 0
    }
    const action = actions.answers.add(newAnswer)

    let newState = qr(df({...initialState}), df(action))

    let utq = newState.questions[0]
    expect(utq.answers.length).toBe(1)
    expect(utq.answers[0]).toBe(4)
  })

  it('disassociates an answer when it is deleted', () => {
    const deletedAnswerId = 0
    const action = actions.answers.delete(deletedAnswerId)

    let newState = qr(df({...initialState}), df(action))

    let utq = newState.questions[1]
    expect(utq.answers.length).not.toBe(2)
    expect(utq.answers[0]).toBe(1)
  })
})