import React, { Component } from 'react';
import './App.css';
import {HashRouter as Router, Route} from 'react-router-dom';
import Header from '../Header/Header';
import FilmList from '../FilmList/FilmList';
import ThisFilm from '../ThisFilm/ThisFilm';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <Header />
        <Router>
          <Route exact path="/" component={FilmList} />
          <Route path="/details" component={ThisFilm} />
        </Router>
      </div>
    );
  }
}

export default App;
