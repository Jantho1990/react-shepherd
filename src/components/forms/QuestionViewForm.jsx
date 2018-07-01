import React from 'react'
import { connect } from 'react-redux'
import ViewForm from './ViewForm'
import actions from '../../actions/actions'

class QuestionViewForm extends ViewForm {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleSubmit(e) {
    this.submitData(e, () => {
      this.refs.questionText.value = ''
      this.refs.questionText.focus()
    })
  }

  reduxAction() {
    return actions.questions.add({text: this.refs.questionText.value})
  }

  render() {
    let { text } = this.props
    return (
      <form action="" className="view-form question-view-form" onKeyPress={e => this.handleSubmit(e)}>
        <input type="text" ref="questionText" defaultValue={text}/>
        <button type="submit">Add</button>
      </form>
    )
  }
}

export default connect()(QuestionViewForm)