import {
  updateObject,
  createReducer
} from '../helpers'

function associationExists(associations, entityIds) {
  let [key0, key1] = Object.keys(entityIds)
  return associations.filter(association => {
    return association[key0] === entityIds[key0]
      && association[key1] === entityIds[key1]
  }).length === 0
}

function associateEntities(associations, entityIds) {
  return associations.concat({
    id: Object.entries(entityIds).reduce((carry, entityId) => {
      return `${carry}_${entityId.join('_')}`
    }, ''),
    ...entityIds
  })
}

function associateAnswerPlayer(state, action) {
  const { answersPlayers } = state
  const answerId = action.id

  const newPlayerIds = action.players.filter(playerId => {
    return !associationExists(answersPlayers, {
      answerId,
      playerId
    })
  })

  // For now, we only want to update a single association,
  // return existing state if the number of new IDs is not
  // one.
  if (newPlayerIds.length !== 1) {
    return state
  }

  const [ playerId ] = newPlayerIds

  const entityIds = {
    answerId,
    playerId
  }

  const newAnswersPlayers = associateEntities(answersPlayers, entityIds)

  return updateObject(state, {answersPlayers: newAnswersPlayers})
}

function disassociateAnswerPlayer(state, action) {
  const { answersPlayers } = state
  
  const answersPlayers = answersPlayers.filter(answerPlayer => {
    return answerPlayer.answerId !== action.id
  })

  return updateObject(state, { answersPlayers: newAnswersPlayers })
}

function associatePlayerAnswer(state, action) {
  const { answersPlayers } = state
  const playerId = action.id

  const newAnswerIds = action.answers.filter(answerId => {
    return !associationExists(answersPlayers, {
      playerId,
      answerId
    })
  })

  // For now, we only want to update a single association,
  // return existing state if the number of new IDs is not
  // one.
  if (newAnswerIds.length !== 1) {
    return state
  }

  const [ answerId ] = newAnswerIds

  const entityIds = {
    playerId,
    answerId
  }

  const newAnswersPlayers = associateEntities(answersPlayers, entityIds)

  return updateObject(state, { answersPlayers: newAnswersPlayers })
}

function disassociatePlayerAnswer(state, action) {
  const { answersPlayers } = state
  
  const answersPlayers = answersPlayers.filter(answerPlayer => {
    return answerPlayer.playerId !== action.id
  })

  return updateObject(state, { answersPlayers: newAnswersPlayers })
}

export default answersPlayersReducer = createReducer(initialState = [], {
  'EDIT_ANSWER': associateAnswerPlayer,
  'DELETE_ANSWER': disassociateAnswerPlayer,
  'EDIT_PLAYER': associatePlayerAnswer,
  'DELETE_PLAYER': disassociatePlayerAnswer
})