import React, { Component } from 'react'
import { format } from 'path';

class PlayerViewForm extends Component {
  constructor(props) {
    super(props)
    const { player } = this.props
    this.state = {
      player: {
        ...player
      }
    }

    this.onInputChange = this.onInputChange.bind(this)
    this.handleSubmit = this.props.onSubmit.bind(this)
  }

  onInputChange(e) {
    console.log('on')
    const { name, value } = e.target
    switch (name) {
      case 'id':
        this.setState({
          ...this.state,
          player: {
            ...this.state.player,
            id: value
          }
        })
        break
      case 'name':
        this.setState({
          ...this.state,
          player: {
            ...this.state.player,
            name: value
          }
        })
        break
      default:
        throw new Error('Unidentified input.')
    }
  }

  onSubmit() {
    const name = this.state.player.name
    
  }

  render() {
    const { onSubmit } = this.props
    const { player } = this.state
    const { onInputChange, handleSubmit } = this
    return (
      <form onSubmit={handleSubmit} className="view-form">
        <input type="hidden" name="id" ref="playerId" defaultValue={player.id} onChange={onInputChange} />
        <input type="text" name="name" ref="playerName" defaultValue={player.name} onChange = { onInputChange } />
        <button type="submit">Edit</button>
      </form>
    )
  }
}

export default PlayerViewForm