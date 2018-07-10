import {
  updateObject,
  createReducer
} from '../helpers'

function associationExists(associations, entityIds) {
  let [key0, key1] = Object.keys(entityIds)
  return associations.filter(association => {
    return association[key0] === entityIds[key0]
      && association[key1] === entityIds[key1]
  }).length !== 0
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
  const { id: answerId, players } = action.payload

  const newPlayerIds = players.filter(playerId => {
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

function disassociateEntitiesAnswerPlayer(state, action) {
  const { answersPlayers } = state
  const { id: answerId } = action.payload
  
  const newAnswersPlayers = answersPlayers.filter(answerPlayer => {
    return answerPlayer.answerId !== answerId
  })

  return updateObject(state, { answersPlayers: newAnswersPlayers })
}

function associatePlayerAnswer(state, action) {
  const { answersPlayers } = state
  const { id: playerId, answers } = action.payload

  const newAnswerIds = answers.filter(answerId => {
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

function disassociateEntitiesPlayerAnswer(state, action) {
  const { answersPlayers } = state
  const { id: playerId } = action.payload
  
  const newAnswersPlayers = answersPlayers.filter(answerPlayer => {
    return answerPlayer.playerId !== playerId
  })

  return updateObject(state, { answersPlayers: newAnswersPlayers })
}

export default createReducer([], {
  'EDIT_ANSWER': associateAnswerPlayer,
  'DELETE_ANSWER': disassociateEntitiesAnswerPlayer,
  'EDIT_PLAYER': associatePlayerAnswer,
  'DELETE_PLAYER': disassociateEntitiesPlayerAnswer
})