import React, { Component } from 'react'
import { connect } from 'react-redux'
import ViewForm from '../forms/ViewForm'
import {
  playerEntitySelector as Player,
  playersEntitySelector as allPlayers
} from '../../reducers/entities/playersEntityReducer'
import actions from '../../actions/actions'

class PlayersList extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    let { players, onAddPlayer } = this.props
    let renderPlayers = () => {
      if (players.length === 0) {
        return (
          <p>Nothing here</p>
        )
      }
      return players.map(player => {
        return (
          <ViewForm
            key={player.id}
            onSubmit={onAddPlayer}
          >
            <input type="text" ref="playerName" defaultValue={player.name}/>
            <button type="submit">Add</button>
          </ViewForm>
        )
      })
    }
    return (
      <div className="view-list">
        {renderPlayers()}
        <ViewForm
            onSubmit={onAddPlayer}
          >
            <input type="text" ref="playerName"/>
            <button type="submit">Add</button>
          </ViewForm>
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
      onAddPlayer: player => dispatch(actions.players.add(player))
    }
  }
)(PlayersList)