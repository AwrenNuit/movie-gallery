import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {hashRouter as Router, Route, Link} from 'react-router-dom';


class FilmList extends Component{

  componentDidMount(){
    this.props.dispatch({type: `GET_FILM`});
  }

  // Dispatch selected film to Saga
  dispatchSelectedFilm = (id) => {
    this.props.dispatch({type: `GET_THIS_FILM`, payload: id});
  }

  // Dispatch to Saga and push history to /details
  handleClick = (id) => {
    this.dispatchSelectedFilm(id);
    this.pushHistory();
  }

  // Push history to /details
  pushHistory = () => {
    this.props.history.push(`/details`);
  }

  render(){
    return(
      <>
        {this.props.reduxState.map((film, i)=>
          <div key={i}>
            <div className="double-row">
              <img onClick={()=>this.handleClick(film.id)} src={film.poster} alt={film.title} />
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
  reduxState: reduxState.filmReducer,
  this: reduxState.thisFilmReducer
});

export default connect(putReduxStateOnProps)(FilmList);