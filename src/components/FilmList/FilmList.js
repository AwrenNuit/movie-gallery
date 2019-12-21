import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';


class FilmList extends Component{

  componentDidMount(){
    this.props.dispatch({type: `GET_FILM`});
  }

  // Dispatch selected film to Saga
  handleClick = (id) => {
    this.props.dispatch({type: `GET_THIS_FILM`, payload: id});
  }

  render(){
    return(
      <>
        {/* {JSON.stringify(this.props.reduxState)} */}
        {this.props.reduxState.map((film, i)=>
          <div className="main-list-div" key={i}>
            <div className="row">
              <Link to={"/details/"+film.movie_id}>
                <img onClick={()=>this.handleClick(film.movie_id)} src={film.poster} alt={film.title} />
              </Link>
            </div>
              <div className="col film-title">{film.title}</div>
              <div className="col">{film.name}</div>
            <div className="row">
              <div className="col">{film.description}</div>
            </div>
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