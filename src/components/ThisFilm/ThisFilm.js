import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';

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
      <div>
        {this.props.reduxState.map((film, i)=>
          <div key={i}>

            <div className="nav-btn-div">
              <Fab onClick={this.handleClickBack} color="secondary" aria-label="back" 
                style={{display:"inline-block", marginRight:"20px"}}>
                <CloseIcon />
              </Fab>

              <Link to={"/edit/"+film.movie_id}>
                <Fab color="primary" aria-label="edit" style={{display:"inline-block", marginRight:"20px"}}>
                  <EditIcon />
                </Fab>
              </Link>
            </div>

            <h2>More Details</h2>
            <div className="main-map-container">
              <div className="grid-container">

                <div className="item1">
                  <img src={film.poster} alt={film.title} />
                </div>

                <div className="film-title item2">{film.title}</div>
                {/* <div className="item3">Genre: {film.genres.join(', ')}</div> */}
                <div className="item3">Genre: {film.name}</div>
                <div className="item4">{film.description}</div>
              </div>
            </div>
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