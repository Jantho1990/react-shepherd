import React, { Component } from 'react'
import { connect } from 'react-redux'
import PlayerViewForm from '../forms/PlayerViewForm'
import {
  playerEntitySelector as Player,
  playersEntitySelector as allPlayers
} from '../../reducers/entities/playersEntityReducer'

class PlayersList extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    let { players } = this.props
    let renderPlayers = () => {
      if (players.length === 0) {
        return (
          <p>Nothing here</p>
        )
      }
      return players.map(player => {
        return (
          <PlayerViewForm key={player.id} {...player}/>
        )
      })
    }
    return (
      <div className="view-list">
        {renderPlayers()}
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      players: allPlayers(state.entities)
    }
  }
)(PlayersList)