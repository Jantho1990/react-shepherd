export default class {
  constructor(state, id) {
    this.sync(state, id)
  }

  sync(state, id) {
    const answer = state.answers.find(answer => answer.id === id)
    this.id = answer.id
    this.text = answer.text
    this.players = state.answerPlayers.filter(answerPlayer => {
      return answerPlayer.answerId === answer.id
    }).map(answerPlayer => {
      return state.players.find(player => player.id === answerPlayer.playerId)
    })
  }
}