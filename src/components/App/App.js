import React, { Component } from 'react';
import './App.css';
import {HashRouter as Router, Route} from 'react-router-dom';
import Header from '../Header/Header';
import FilmList from '../FilmList/FilmList';
import ThisFilm from '../ThisFilm/ThisFilm';
import EditFilm from '../EditFilm/EditFilm';
import Search from '../Search/Search';
import AddFilm from '../AddFilm/AddFilm';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <Router>
          <Route exact path="/" component={FilmList} />
          <Route path="/details/:id" component={ThisFilm} />
          <Route path="/edit/:id" component={EditFilm} />
          <Route path="/results" component={Search} />
          <Route path="/add" component={AddFilm} />
        </Router>
      </div>
    );
  }
}

export default App;
