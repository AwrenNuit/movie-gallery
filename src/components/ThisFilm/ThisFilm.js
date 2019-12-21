import React, {Component} from 'react';
import {connect} from 'react-redux';

class ThisFilm extends Component{

  componentDidMount(){
    this.props.dispatch({type: `GET_GENRE`});
  }

  render(){
    return(
      <div className="main-single-film-div">
        {this.props.reduxState.map((film, i)=>
          <div>
            <img src={film.poster} alt={film.title} />
            <div className="film-title">{film.title}</div>
            <div>{film.name}</div>
            <div>{film.description}</div>
          </div>
        )}
      </div>
    )
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.thisFilmReducer,
});

export default connect(putReduxStateOnProps)(ThisFilm);