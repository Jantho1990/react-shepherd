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
      newState = apr(df({...newState}), df(action))
    })

    expect(newState.answersPlayers.length).toBe(2)
    expect(newState.answersPlayers[0].answerId).toBe(answers[0].id)
    expect(newState.answersPlayers[0].playerId).toBe(answers[0].players[0])
    expect(newState.answersPlayers[1].answerId).toBe(answers[1].id)
    expect(newState.answersPlayers[1].playerId).toBe(answers[1].players[0])
  })

  it('adds multiple associations with one player', () => {
    const players = [{
      id: 1,
      answers: [0]
    }, {
      id: 1,
      answers: [2]
    }]

    let newState = { ...initialState}
    players.forEach(player => {
      const action = actions.players.edit(player)
      newState = apr(df({...newState}), df(action))
    })

    expect(newState.answersPlayers.length).toBe(2)
    expect(newState.answersPlayers[0].playerId).toBe(players[0].id)
    expect(newState.answersPlayers[0].answerId).toBe(players[0].answers[0])
    expect(newState.answersPlayers[1].playerId).toBe(players[1].id)
    expect(newState.answersPlayers[1].answerId).toBe(players[1].answers[0])
  })

  it('does not add the same association more than once', () => {
    const answer = {
      id: 1,
      players: [0]
    }
    const player = {
      id: 0,
      answers: [1]
    }

    let newState = { ...initialState}
    let entityActions = [
      actions.answers.edit(answer),
      actions.players.edit(player)
    ]
    entityActions.forEach(action => {
      newState = apr(df({...newState}), df(action))
    })

    expect(newState.answersPlayers.length).toBe(1)
    expect(newState.answersPlayers[0].answerId).toBe(answer.id)
    expect(newState.answersPlayers[0].playerId).toBe(player.id)
  })

  it('removes any associations associated with a deleted answer', () => {
    // First set up the associations
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
      newState = apr(df({...newState}), df(action))
    })

    // Add a different association so we can prove not all associations got nuked
    const otherAnswer = {
      id: 2,
      players: [1]
    }
    const otherAction = actions.answers.edit(otherAnswer)
    newState = apr(df({...newState}), df(otherAction))
    expect(newState.answersPlayers.length).toBe(3)

    // Now delete one of the answers and verify all its associations are also deleted
    const deleteAnswerId = 1
    const deleteAction = actions.answers.delete(deleteAnswerId)
    newState = apr(df({...newState}), df(deleteAction))

    expect(newState.answersPlayers.length).toBe(1)
    expect(newState.answersPlayers.filter(ap => ap.answerId === deleteAnswerId).length).toBe(0)
  })

  it('removes any associations associated with a deleted player', () => {
    // First set up the associations
    const players = [
      {
        id: 1,
        answers: [0]
      }, {
        id: 1,
        answers: [2]
      }
    ]

    let newState = { ...initialState}
    players.forEach(player => {
      const action = actions.players.edit(player)
      newState = apr(df({...newState}), df(action))
    })

    // Add a different association so we can prove not all associations got nuked
    const otherPlayer = {
      id: 2,
      answers: [1]
    }
    const otherAction = actions.players.edit(otherPlayer)
    newState = apr(df({...newState}), df(otherAction))
    expect(newState.answersPlayers.length).toBe(3)

    // Now delete one of the answers and verify all its associations are also deleted
    const deletePlayerId = 1
    const deleteAction = actions.players.delete(deletePlayerId)
    newState = apr(df({...newState}), df(deleteAction))

    expect(newState.answersPlayers.length).toBe(1)
    expect(newState.answersPlayers.filter(ap => ap.playerId === deletePlayerId).length).toBe(0)
  })
})