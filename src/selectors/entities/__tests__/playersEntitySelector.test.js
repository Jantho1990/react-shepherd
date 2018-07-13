import {default as Player} from '../playersEntitySelector'
import { setQuestionId } from '../../../actions/questions'
import { setAnswerId } from '../../../actions/answers'
import { setPlayerId } from '../../../actions/players'

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
  answerPlayers: [
    {id: '_0_0', answerId: 0, playerId: 0},
    {id: '_0_2', answerId: 0, playerId: 2},
    {id: '_1_1', answerId: 1, playerId: 1}
  ]
}

beforeEach(() => {
  setAnswerId(4)
  setPlayerId(3)
  setQuestionId(2)
})

describe('Players EntitySelector', () => {
  it('correctly computes normalized data', () => {
    const player = new Player(initialState, 0)
    const statePlayer = initialState.players.find(player => player.id === 0)

    expect(player.id).toBe(statePlayer.id)
    expect(player.name).toBe(statePlayer.name)
    expect(player.answers[0].text).toBe('Yes')
  })
})