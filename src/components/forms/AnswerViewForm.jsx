import React from 'react'
import ViewForm from './ViewForm'
import { connect } from 'react-redux'
import actions from '../../actions/actions'

class AnswerViewForm extends ViewForm {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleSubmit(e) {
    this.submitData(e, (action) => {
      let { dispatch, questionId } = this.props
      console.log('this is the callback', action)
      let answerId = action.answer.id
      dispatch(actions.questions.edit({
        answers: [
          answerId
        ],
        id: questionId
      }))
      this.refs.answerText.value = ''
      this.refs.answerText.focus()
    })
  }

  reduxAction() {
    return actions.answers.add({
      text: this.refs.answerText.value
    }, this.props.questionId)
  }

  render() {
    let { text } = this.props
    return (
      <form action="" className="view-form answer-view-form" onKeyPress={e => this.handleSubmit(e)}>
        <input type="text" ref="answerText" defaultValue={text}/>
        <button type="submit">Add</button>
      </form>
    )
  }
}

export default connect()(AnswerViewForm)