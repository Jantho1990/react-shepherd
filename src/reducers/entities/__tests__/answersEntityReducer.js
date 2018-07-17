import er from '../index'
import {
  answerEntitySelector as Answer
} from '../answersEntityReducer'
import actions from '../../../actions/actions'
import cloneDeep from 'lodash.clonedeep'
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
  questions: testQuestions,
  answersPlayers: [
    {id: '_0_0', answerId: 0, playerId: 0},
    {id: '_0_2', answerId: 0, playerId: 2},
    {id: '_1_1', answerId: 1, playerId: 1}
  ]
}

const copyOfState = () => cloneDeep(initialState)

beforeEach(() => {
  setAnswerId(4)
  setPlayerId(3)
  setQuestionId(2)
})

describe('Answer Entities', () => {
  it('creates a new answer', () => {
    const answer = {
      text: 'I am a new answer!',
      questionId: 1
    }
    const action = actions.answers.add(answer)

    const newState = er(df(copyOfState()), df(action))

    expect(newState.answers.length).toBe(initialState.answers.length + 1)
    let nta = newState.answers[4]
    expect(nta.id).toBe(4)
    expect(nta.text).toBe(answer.text)
    expect(nta.questionId).toBe(answer.questionId)
  })

  it('should not add new properties on create', () => {
    const answer = {
      text: 'I am a new answer!',
      questionId: 1,
      thisProp: 'Should not show up'
    }
    const action = actions.answers.add(answer)

    const newState = er(df(copyOfState()), df(action))

    expect(newState.answers.length).toBe(initialState.answers.length + 1)
    let ntq = newState.answers[4]
    expect(ntq.id).toBe(4)
    expect(ntq.text).toBe(answer.text)
    expect(ntq.questionId).toBe(answer.questionId)
    expect(ntq.thisProp).toBeUndefined()
  })

  it('edits an existing answer', () => {
    const answer = {
      id: 1,
      text: 'NEVER',
      questionId: 1
    }
    const action = actions.answers.edit(answer)

    const newState = er(df(copyOfState()), df(action))

    expect(newState.answers.length).toBe(initialState.answers.length)
    let uta = newState.answers[1]
    expect(uta.id).toBe(answer.id)
    expect(uta.text).toBe(answer.text)
    expect(uta.questionId).toBe(answer.questionId)
  })

  it('should not add new properties on edit', () => {
    const answer = {
      id: 1,
      text: 'NEVER',
      questionId: 1,
      thisProp: 'Should not show up'
    }
    const action = actions.answers.edit(answer)

    const newState = er(df(copyOfState()), df(action))

    expect(newState.answers.length).toBe(initialState.answers.length)
    let ntq = newState.answers[1]
    expect(ntq.id).toBe(answer.id)
    expect(ntq.text).toBe(answer.text)
    expect(ntq.questionId).toBe(answer.questionId)
    expect(ntq.thisProp).toBeUndefined()
  })

  it('should not need all properties in order to edit', () => {
    const answer = {
      id: 0,
      text: 'I alone should update, and nothing else.'
    }
    const action = actions.answers.edit(answer)

    const newState = er(df(copyOfState()), df(action))

    expect(newState.answers.length).toBe(initialState.answers.length)
    let uta = newState.answers[0]
    expect(uta.id).toBe(answer.id)
    expect(uta.text).toBe(answer.text)
    expect(uta.questionId).toBe(1)
  })

  it('deletes an answer', () => {
    const answerId = 0
    const action = actions.answers.delete(answerId)

    const newState = er(df(copyOfState()), df(action))

    expect(newState.answers.length).toBe(initialState.answers.length - 1)
    expect(newState.answers.filter(answer => answer.id === answerId).length).not.toBe(1)
  })

  it('deletes any answers associated with a deleted question', () => {
    const questionId = 1
    const action = actions.questions.delete(questionId)

    const newState = er(df(copyOfState()), df(action))

    expect(newState.answers.length).toBe(2)
  })
})

describe('Answers EntitySelector', () => {
  it('correctly computes normalized data', () => {
    const answer = new Answer(initialState, 0)
    const stateAnswer = initialState.answers.find(answer => answer.id === 0)

    expect(answer.id).toBe(stateAnswer.id)
    expect(answer.text).toBe(stateAnswer.text)
    // console.log(answer.players)
    expect(answer.players[0].name).toBe('John Doe')
  })
})