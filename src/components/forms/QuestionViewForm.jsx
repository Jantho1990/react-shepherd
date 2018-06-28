import React from 'react'
import ViewForm from './ViewForm'
import { connect } from 'react-redux'

class QuestionForm extends ViewForm {
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
    return {
      type: 'ADD_QUESTION',
      'question': {
        text: this.refs.questionText.value
      }
    }
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

export default connect()(QuestionForm)