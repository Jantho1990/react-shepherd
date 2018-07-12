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
    })
  }
}