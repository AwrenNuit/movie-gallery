import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class ThisFilm extends Component{

  componentDidMount(){
    this.props.dispatch({type: `GET_THIS_FILM`, payload: this.props.match.params.id})
  }

  // Clear reducer selected film with dispatch
  emptyReducer = () => {
    this.props.dispatch({type: `SET_THIS_FILM`, payload: []});
  }

  // Return to film list page
  goBack = () => {
    this.props.history.push(`/`);
  }

  // Clear reducer for selected film, return to film list
  handleClickBack = () => {
    this.emptyReducer();
    this.goBack();
  }

  render(){
    return(
      <div className="main-single-film-div">
        {this.props.reduxState.map((film, i)=>
          <div key={i}>
            <img src={film.poster} alt={film.title} />
            <div className="film-title">{film.title}</div>
            <div>{film.name}</div>
            <div>{film.description}</div>
            <button onClick={this.handleClickBack}>BACK</button>
            <Link to={"/edit/"+film.id}>
              <button>EDIT</button>
            </Link>
          </div>
        )}
      </div>
    )
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.thisFilmReducer
});

export default connect(putReduxStateOnProps)(ThisFilm);