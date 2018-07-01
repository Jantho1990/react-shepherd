import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionWrapper from '../wrappers/QuestionWrapper'

class QuestionsList extends Component {
  render() {
    let { questions } = this.props
    let renderQuestions = () => {
      if (questions.length === 0) {
        return (
          <p>Nothing here</p>
        )
      }
      return questions.map(question => {
        console.log('ribbit', question)
        return (
          <QuestionWrapper key={question.id} {...question}/>
        )
      })
    }
    return (
      <div className="view-list">
        {renderQuestions()}
      </div>
    )
  }
}

export default connect()(QuestionsList)