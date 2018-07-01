import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionViewForm from '../forms/QuestionViewForm'
import AnswersList from '../lists/AnswersList'
import AnswerViewForm from '../forms/AnswerViewForm'

class QuestionWrapper extends Component {
  render() {
    let { id, text, answers } = this.props
    console.log('eagle', this.props)
    return (
      <div>
        <h2>QuestionWrapper</h2>
        <QuestionViewForm text={text}/>
        <span>Answers</span>
        <AnswersList answers={answers}/>
        <AnswerViewForm questionId={id}/>
      </div>
    )
  }
}

export default connect()(QuestionWrapper)