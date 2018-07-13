export default class {
  constructor(state, id) {
    this.sync(state, id)
  }

  sync(state, id) {
    const player = state.players.find(player => player.id === id)
    this.id = player.id
    this.name = player.name
    this.answers = state.answerPlayers.filter(answerPlayer => {
      return answerPlayer.playerId === player.id
    }).map(answerPlayer => {
      return state.answers.find(answer => answer.id === answerPlayer.answerId)
    })
  }
}