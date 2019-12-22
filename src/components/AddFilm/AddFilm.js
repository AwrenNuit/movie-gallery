import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

class AddFilm extends Component{

  state = {
    film: {
      title: '',
      poster: '',
      description: '',
    },
    genre: {
      name: ''
    },
    junction: {
      movie_id: '',
      genre_id: ''
    }
  }

  // Dispatch film state to saga for POST
  handleClickAddFilm = () => {
    this.props.dispatch({type: `POST_FILM`, payload: this.state.film});
  }

  // Dispatch genre state to saga for POST
  handleClickAddGenre = () => {
    this.props.dispatch({type: `POST_GENRE`, payload: this.state.genre});
  }

  // Dispatch junction state to saga for POST
  handleClickAddJunction = () => {
    this.props.dispatch({type: `POST_JUNCTION`, payload: this.state.junction});
  }

  // Set film state to input value
  handleFilmChange = (event, propName) => {
    this.setState({
      film: {
        ...this.state.film,
        [propName]: event.target.value
      }
    });
  }

  // Set genre state to input value
  handleGenreChange = (event) => {
    this.setState({
      genre: {
        name: event.target.value
      }
    });
  }

  // Set junction state to input value
  handleJunctionChange = (event, propName) => {
    this.setState({
      junction: {
        ...this.state.junction,
        [propName]: event.target.value
      }
    });
  }

  render(){
    return(
      <>        {JSON.stringify(this.state)}


        {JSON.stringify(this.props.reduxState)}
        <Link to={"/"}>
          <Fab color="secondary" aria-label="cancel">
            <CloseIcon />
          </Fab>
        </Link>

        <br />
        <br />

        <h3>Add a New Film</h3>
        <input type="text" onChange={(event)=>this.handleFilmChange(event, 'title')} value={this.state.film.title} placeholder="film title" />
        <input type="text" onChange={(event)=>this.handleFilmChange(event, 'poster')} value={this.state.film.poster} placeholder="https://movie.com/image.jpg" />
        <textarea rows="6" cols="30" onChange={(event)=>this.handleFilmChange(event, 'description')} value={this.state.film.description} placeholder="film synopsis"></textarea>
        <Fab onClick={this.handleClickAddFilm} color="primary" aria-label="add">
          <CheckIcon />
        </Fab>

        <br />
        <br />

        <h3>Add a New Genre</h3>
        <input type="text" onChange={(event)=>this.handleGenreChange(event)} value={this.state.genre.name} placeholder="genre" />
        <Fab onClick={this.handleClickAddGenre} color="primary" aria-label="add">
          <CheckIcon />
        </Fab>

        <br />
        <br />

        <h3>Add a Genre to a Film</h3>

        <select onChange={(event)=>this.handleJunctionChange(event, 'movie_id')} 
          value={this.state.junction.movie_id}>

          <option value="" selected>select a film</option>

          {this.props.reduxState.map((film, i)=>
            <option key={i} value={film.movie_id}>{film.title}</option>
          )}
        </select>

        <select onChange={(event)=>this.handleJunctionChange(event, 'genre_id')} 
          value={this.state.junction.genre_id}>

          <option value="" selected>select a genre</option>

          {this.props.reduxState.map((genre, i)=>
            <option key={i} value={genre.genre_id}>{genre.name}</option>
          )}
        </select>

        <Fab onClick={this.handleClickAddJunction} color="primary" aria-label="add">
          <CheckIcon />
        </Fab>
      </>
    )
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.filmReducer
});

export default connect(putReduxStateOnProps)(AddFilm);