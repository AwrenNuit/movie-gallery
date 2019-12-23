import React, { Component } from 'react';
import './App.css';
import {HashRouter as Router, Route} from 'react-router-dom';
// Components
import AddFilm from '../AddFilm/AddFilm';
import EditFilm from '../EditFilm/EditFilm';
import FilmList from '../FilmList/FilmList';
import Header from '../Header/Header';
import ThisFilm from '../ThisFilm/ThisFilm';
import Search from '../Search/Search';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <Router>
          <Route exact path="/" component={FilmList} />
          <Route path="/add" component={AddFilm} />
          <Route path="/details/:id" component={ThisFilm} />
          <Route path="/edit/:id" component={EditFilm} />
          <Route path="/results" component={Search} />
        </Router>
      </div>
    );
  }
}

export default App;
