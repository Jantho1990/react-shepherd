import ar from '../answersEntityReducer'
import actions from '../../../actions/actions'
import { setQuestionId } from '../../../actions/questions'
import { setAnswerId } from '../../../actions/answers'
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
setQuestionId(2)
setAnswerId(4)

describe('Answer Entities', () => {
  it('creates a new answer', () => {
    const answer = {
      text: 'I am a new answer!',
      questionId: 1
    }
    const action = actions.answers.add(answer)

    const res = ar(df({...initialState}), df(action))

    expect(res.answers.length).toBe(initialState.answers.length + 1)
    let nta = res.answers[4]
    expect(nta.id).toBe(4)
    expect(nta.text).toBe(answer.text)
    expect(nta.questionId).toBe(answer.questionId)
  })

  it('edits an existing answer', () => {
    const answer = {
      id: 1,
      text: 'NEVER',
      questionId: 1
    }
    const action = actions.answers.edit(answer)

    const res = ar(df({...initialState}), df(action))

    expect(res.answers.length).toBe(initialState.answers.length)
    let uta = res.answers[1]
    expect(uta.id).toBe(answer.id)
    expect(uta.text).toBe(answer.text)
    expect(uta.questionId).toBe(answer.questionId)
  })

  it('should not need all properties in order to edit', () => {
    const answer = {
      id: 0,
      text: 'I alone should update, and nothing else.'
    }
    const action = actions.answers.edit(answer)

    const res = ar(df({...initialState}), df(action))

    expect(res.answers.length).toBe(initialState.answers.length)
    let uta = res.answers[0]
    expect(uta.id).toBe(answer.id)
    expect(uta.text).toBe(answer.text)
    expect(uta.questionId).toBe(1)
  })

  it('deletes an answer', () => {
    const answerId = 0
    const action = actions.answers.delete(answerId)

    const res = ar(df({...initialState}), df(action))

    expect(res.answers.length).toBe(initialState.answers.length - 1)
    expect(res.answers.filter(answer => answer.id === answerId).length).not.toBe(1)
  })

  it('deletes any answers associated with a deleted question', () => {
    const questionId = 1
    const action = actions.questions.delete(questionId)

    const res = ar(df({...initialState}), df(action))

    expect(res.answers.length).toBe(2)
  })
})