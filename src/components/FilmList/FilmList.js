import React, {Component} from 'react';
import {connect} from 'react-redux';
import {hashRouter as Router, Route, Link} from 'react-router-dom';


class FilmList extends Component{

  componentDidMount(){
    this.props.dispatch({type: `GET_FILM`});
  }

  render(){
    return(
      <>
        {/* <Router>        
          <Route path="/details" component={ThisFilm} />
        </Router> */}
        {this.props.reduxState.map((film, i)=>
          <div key={i}>
            <div className="double-row">
              <img src={film.poster} alt={film.title} />
            </div>
            <div className="col film-title">{film.title}</div>
            <div className="col">{film.description}</div>
          </div>
        )}
      </>
    )
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.filmReducer
});

export default connect(putReduxStateOnProps)(FilmList);