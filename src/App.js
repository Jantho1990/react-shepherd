import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';

import GamePage from './components/pages/GamePage'
import LeaderboardPage from './components/pages/LeaderboardPage'
import PlayersPage from './components/pages/PlayersPage'
import QuestionsPage from './components/pages/QuestionsPage'

class App extends Component {
  render() {
    return (
        <Router>
      <div id="Shepherd">
        <header className="nav-header">
          <nav>
            <span className="nav-title">
              <Link to="/">Shepherd</Link>
            </span>
            <ul>
              <li><Link to="/players">Players</Link></li>
              <li><Link to="/questions">Questions</Link></li>
              <li><Link to="/leaderboard">Leaderboard</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Route exact path="/" component={GamePage}/>
          <Route exact path="/leaderboard" component={LeaderboardPage}/>
          <Route exact path="/players" component={PlayersPage}/>
          <Route exact path="/questions" component={QuestionsPage}/>
        </main>
      </div>
        </Router>
    );
  }
}

export default App;
