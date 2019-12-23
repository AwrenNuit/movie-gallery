import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class MainMap extends Component{

  // Dispatch selected film to Saga
  handleClick = (id) => {
    this.props.dispatch({type: `GET_THIS_FILM`, payload: id});
  }

  render(){
    return(
      <>
      {this.props.film.map((film, i)=>
        <div className="main-map-container" key={i}>
          <div className="grid-container">

            <div className="item1">
              <Link to={"/details/"+film.movie_id}>
                <img onClick={()=>this.handleClick(film.movie_id)} src={film.poster} alt={film.title} />
              </Link>
            </div>

            <div className="film-title item2">{film.title}</div>
            <div className="item3">Genre: {film.genres.join(', ')}</div>
            <div className="item4">{film.description}</div>
          </div>
        </div>
      )}
      </>
    )
  }
}

export default connect()(MainMap);