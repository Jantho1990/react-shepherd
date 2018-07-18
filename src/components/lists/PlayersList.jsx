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
    this.onSubmitAdd = this.onSubmitAdd.bind(this)
    this.onSubmitEdit = this.onSubmitEdit.bind(this)
  }

  onSubmitAdd() {
    const name = this.refs.newPlayerName.value
    console.log('refs', this.refs)
    console.log('name', name)
    this.props.onAddPlayer({name})
  }

  onSubmitEdit() {
    const name = this.refs.playerName.value
    const id = this.refs.playerId.value
    this.props.onEditPlayer({id, name})
  }

  render() {
    let { players, onAddPlayer } = this.props
    let { onSubmitAdd, onSubmitEdit } = this
    let renderPlayers = () => {
      if (players.length === 0) {
        return (
          <p>Nothing here</p>
        )
      }
      return players.map(player => {
        return (
          <ViewForm
            key={`player${player.id}`}
            onSubmit={onSubmitEdit}
          >
            <input type="hidden" ref="playerId" defaultValue={player.id}/>
            <input type="text" ref="playerName" defaultValue={player.name}/>
            <button type="submit">Edit</button>
          </ViewForm>
        )
      })
    }
    return (
      <div className="view-list">
        {renderPlayers()}
        <ViewForm
            onSubmit={onSubmitAdd}
          >
            <input type="text" ref="newPlayerName"/>
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
      onAddPlayer: player => dispatch(actions.players.add(player)),
      onEditPlayer: player => dispatch(actions.players.edit(player))
    }
  }
)(PlayersList)