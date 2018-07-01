import React, { Component } from 'react'
import { connect } from 'react-redux'
import AnswerWrapper from '../wrappers/AnswerWrapper'

class AnswersList extends Component {
  render() {
    let answers = this.props.answers.map(answerId => this.props.allAnswers.filter(a => a.id === answerId)[0])
    console.log('daisy', this.props)
    console.log('arf', answers)
    let renderAnswers = () => {
      if (answers.length === 0) {
        return (
          <p>There are no answers</p>
        )
      }
      return answers.map(answer => {
        console.log('artemis', answer)
        return (
          <AnswerWrapper key={answer.id} {...answer}/>
        )
      })
    }
    return (
      <div className="view-list">
        {renderAnswers()}
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      allAnswers: state.answers
    }
  }
)(AnswersList)