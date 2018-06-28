import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionViewForm from '../forms/QuestionViewForm'

class QuestionWrapper extends Component {
  render() {
    let { text } = this.props
    return (
      <div>
        <h2>QuestionWrapper</h2>
        <QuestionViewForm text={text}/>
      </div>
    )
  }
}

export default connect()(QuestionWrapper)