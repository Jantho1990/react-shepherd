import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionsList from '../lists/QuestionsList'
import QuestionViewForm from '../forms/QuestionViewForm'

export class QuestionsPage extends Component {
  static defaultProps = {
    questions: [
      {
        id: 1,
        text: 'Is this not a question?'
      }
    ]
  }
  render() {
    let { questions } = this.props
    return (
      <div className="page questions">
        <h1>Questions Page</h1>
        <QuestionsList questions={questions}/>
        <div>
          <span>New Question</span>
          <QuestionViewForm/>
        </div>
      </div>
    )
  }
}

export default connect(
  (state, ownProps) => {
    return {
      questions: state.questions
    }
  }
)(QuestionsPage)