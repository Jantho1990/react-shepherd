import React, { Component } from 'react'
import PlayerViewForm from '../forms/PlayerViewForm'
import PlayersList from '../lists/PlayersList'

class PlayersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return ( 
      <div className="page players">
        <h1>Players Page</h1>
        <PlayersList/>
        {/* <PlayerViewForm/> */}
      </div>
    )
  }
}

export default PlayersPage;