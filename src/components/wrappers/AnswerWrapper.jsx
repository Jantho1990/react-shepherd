import React, { Component } from "react";
import { connect } from "react-redux";
import AnswerViewForm from "../forms/AnswerViewForm";

class AnswerWrapper extends Component {
  render() {
    let { text } = this.props;
    console.log('barnacle', this.props)
    return (
      <div>
        <h2>AnswerWrapper</h2>
        <AnswerViewForm text={text} />
      </div>
    );
  }
}

export default connect()(AnswerWrapper);
