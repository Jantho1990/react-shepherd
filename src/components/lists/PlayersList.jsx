import React, { Component } from 'react'
import { connect } from 'react-redux'
import PlayerViewForm from '../forms/PlayerViewForm'
import {
  playerEntitySelector as Player,
  playersEntitySelector as allPlayers
} from '../../reducers/entities/playersEntityReducer'
import actions from '../../actions/actions'

class PlayersList extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleSubmitAdd = this.handleSubmitAdd.bind(this)
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this)
  }

  handleSubmitAdd(e) {
    const action = this.props.onAddPlayer
    return function () {
      action(this.state.player)
    }
  }

  handleSubmitEdit() {
    const name = this.refs.playerName.value
    const id = Number(this.refs.playerId.value)
    this.props.onEditPlayer({id, name})
  }

  render() {
    let { players, onAddPlayer } = this.props
    let { handleSubmitAdd, handleSubmitEdit } = this
    let renderPlayers = () => {
      if (players.length === 0) {
        return (
          <p>Nothing here</p>
        )
      }
      return players.map(player => {
        return (
          <PlayerViewForm
            key={`player${player.id}`}
            {...player}
            onSubmit={handleSubmitEdit}
          />
        )
      })
    }
    return (
      <div className="view-list">
        {renderPlayers()}
        <PlayerViewForm
          onSubmit={handleSubmitAdd()}
        />
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      players: allPlayers(state.entities)
    }
  },
  (dispatch) => {
    return {
      onAddPlayer: player => dispatch(actions.players.add(player)),
      onEditPlayer: player => dispatch(actions.players.edit(player))
    }
  }
)(PlayersList)