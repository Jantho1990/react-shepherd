export default class {
  constructor(state, id) {
    this.sync(state, id)
  }

  sync(state, id) {
    const question = state.questions.find(question => question.id === id)
    this.id = question.id
    this.text = question.text
    this.answers = question.answers.map(answerId => {
      return state.answers.find(answer => answer.id === answerId)
    }).map(answer => {
      answer.players = state.answerPlayers.filter(answerPlayer => {
        return answerPlayer.answerId === answer.id
      }).map(answerPlayer => {
        return state.players.find(player => player.id === answerPlayer.playerId)
      })
      return answer
    })
  }
}