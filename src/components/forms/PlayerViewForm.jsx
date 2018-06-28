import React from 'react'
import ViewForm from './ViewForm'
import { connect } from 'react-redux'

class PlayerForm extends ViewForm {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleSubmit(e) {
    this.submitData(e, () => {
      this.refs.playerName.value = ''
      this.refs.playerName.focus()
    })
  }

  reduxAction() {
    return {
      type: 'ADD_PLAYER',
      'player': {
        name: this.refs.playerName.value
      }
    }
  }

  render() {
    let { name } = this.props
    return (
      <form action="" className="view-form player-view-form" onKeyPress={e => this.handleSubmit(e)}>
        <input type="text" ref="playerName" defaultValue={name}/>
        <button type="submit">Add</button>
      </form>
    )
  }
}

export default connect()(PlayerForm)