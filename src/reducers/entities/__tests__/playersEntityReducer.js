import pr from '../playersEntityReducer'
import actions from '../../../actions/actions'
import { setQuestionId } from '../../../actions/questions'
import { setAnswerId } from '../../../actions/answers'
import df from 'deep-freeze-strict'
import { setPlayerId } from '../../../actions/players';

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
setAnswerId(4)
setPlayerId(3)
setQuestionId(2)

describe('Player Entities', () => {
  it('creates a new player', () => {
    const player = {
      name: 'Reuben'
    }
    const action = actions.players.add(player)

    const res = pr(df({...initialState}), df(action))

    expect(res.players.length).toBe(initialState.players.length + 1)
    let ntp = res.players[3]
    expect(ntp.id).toBe(3)
    expect(ntp.name).toBe(player.name)
  })
})