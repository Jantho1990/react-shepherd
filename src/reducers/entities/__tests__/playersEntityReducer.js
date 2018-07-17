import er from '../index'
import {
  playerEntitySelector as Player,
  playersEntitySelector as allPlayers
} from '../playersEntityReducer'
import actions from '../../../actions/actions'
import cloneDeep from 'lodash.clonedeep'
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

describe('Player Entities', () => {
  it('creates a new player', () => {
    const player = {
      name: 'Reuben'
    }
    const action = actions.players.add(player)

    const newState = er(df(copyOfState()), df(action))

    expect(newState.players.length).toBe(initialState.players.length + 1)
    let ntp = newState.players[3]
    expect(ntp.id).toBe(3)
    expect(ntp.name).toBe(player.name)
  })

  it('should not add new properties on create', () => {
    const player = {
      name: 'Joker',
      thisProp: 'Should not exist'
    }
    const action = actions.players.add(player)

    const newState = er(df(copyOfState()), df(action))

    expect(newState.players.length).toBe(initialState.players.length + 1)
    let ntp = newState.players[3]
    expect(ntp.id).toBe(3)
    expect(ntp.name).toBe(player.name)
    expect(ntp.thisProp).toBeUndefined()
  })

  it('edits an existing player', () => {
    const player = {
      id: 0,
      name: 'Ali Baster'
    }
    const action = actions.players.edit(player)

    const newState = er(df(copyOfState()), df(action))

    expect(newState.players.length).toBe(initialState.players.length)
    let utp = newState.players[0]
    expect(utp.id).toBe(player.id)
    expect(utp.name).toBe(player.name)
  })

  it('should not add new properties on edit', () => {
    const player = {
      id: 1,
      name: 'Joker',
      thisProp: 'Should not exist'
    }
    const action = actions.players.edit(player)

    const newState = er(df(copyOfState()), df(action))

    expect(newState.players.length).toBe(initialState.players.length)
    let ntp = newState.players[1]
    expect(ntp.id).toBe(player.id)
    expect(ntp.name).toBe(player.name)
    expect(ntp.thisProp).toBeUndefined()
  })

  it('deletes a player', () => {
    const playerId = 1
    const action = actions.players.delete(playerId)

    const newState = er(df(copyOfState()), df(action))

    expect(newState.players.length).toBe(initialState.players.length - 1)
    expect(newState.players.filter(player => player.id === playerId).length).not.toBe(1)
  })
})

describe('Players EntitySelector', () => {
  it('selects all players', () => {
    const players = allPlayers(initialState)
    expect(players.length).toBe(initialState.players.length)
    for (let i = 0; i < players.length; i++) {
      expect(players[i].id).toBe(initialState.players[i].id)
      expect(players[i].name).toBe(initialState.players[i].name)
      const initialAnswers = initialState.answersPlayers.filter(ap => ap.playerId === players[i].id)
      expect(players[i].answers.length).toBe(initialAnswers.length)
    }
  })

  it('correctly computes normalized data for single selection', () => {
    const player = new Player(initialState, 0)
    const statePlayer = initialState.players.find(player => player.id === 0)

    expect(player.id).toBe(statePlayer.id)
    expect(player.name).toBe(statePlayer.name)
    expect(player.answers[0].text).toBe('Yes')
  })
})