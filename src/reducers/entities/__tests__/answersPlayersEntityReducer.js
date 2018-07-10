import apr from '../answersPlayersEntityReducer'
import actions from '../../../actions/actions'
import { setAnswerId } from '../../../actions/answers'
import { setPlayerId } from '../../../actions/players';
import { setQuestionId } from '../../../actions/questions'
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
  answersPlayers: []
}

beforeEach(() => {
  setAnswerId(4)
  setPlayerId(3)
  setQuestionId(2)
})

describe('AnswerPlayer Entities', () => {
  it('adds a new association when answer is updated', () => {
    const answer = {
      id: 1,
      players: [0]
    }
    const action = actions.answers.edit(answer)

    const newState = apr(df({...initialState}), df(action))

    expect(newState.answersPlayers.length).toBe(1)
    expect(newState.answersPlayers[0].answerId).toBe(answer.id)
    expect(newState.answersPlayers[0].playerId).toBe(answer.players[0])
  })

  it('adds a new association when player is updated', () => {
    const player = {
      id: 2,
      answers: [3]
    }
    const action = actions.players.edit(player)

    const newState = apr(df({ ...initialState
    }), df(action))

    expect(newState.answersPlayers.length).toBe(1)
    expect(newState.answersPlayers[0].playerId).toBe(player.id)
    expect(newState.answersPlayers[0].answerId).toBe(player.answers[0])
  })

  it('adds multiple associations with one answer', () => {
    const answers = [
      {
        id: 1,
        players: [0]
      }, {
        id: 1,
        players: [2]
      }
    ]
    let newState = { ...initialState}
    answers.forEach(answer => {
      const action = actions.answers.edit(answer)
      newState = apr(df(newState), df(action))
    })

    expect(newState.answersPlayers.length).toBe(2)
    expect(newState.answersPlayers[0].answerId).toBe(answers[0].id)
    expect(newState.answersPlayers[0].playerId).toBe(answers[0].players[0])
    expect(newState.answersPlayers[1].answerId).toBe(answers[1].id)
    expect(newState.answersPlayers[1].playerId).toBe(answers[1].players[0])
  })
})