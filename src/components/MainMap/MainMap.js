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
        <div key={i}>

            <Link to={"/details/"+film.movie_id}>
              <img onClick={()=>this.handleClick(film.movie_id)} src={film.poster} alt={film.title} />
            </Link>

            <div className="film-title">{film.title}</div>
            <div>{film.genres.join(', ')}</div>
            <div>{film.description}</div>
        </div>
      )}
      </>
    )
  }
}

export default connect()(MainMap);