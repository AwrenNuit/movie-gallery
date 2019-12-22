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
      film: '',
      genre: ''
    }
  }

  // Set state to input value
  handleChange = (event, propName) => {
    this.setState({
      film: {
        ...this.state.film,
        [propName]: event.target.value
      }
    })
  }

  // Dispatch state to saga for POST
  handleClickAddFilm = () => {
    this.props.dispatch({type: `POST_FILM`, payload: this.state});
  }
///////////////////////////////////// MAKE THREE BUTTONS - ADD FILM, ADD GENRE, ADD GENRE TO FILM (dropdowns that populate from map?)
  render(){
    return(
      <>
        {JSON.stringify(this.props.reduxState)}
        <Link to={"/"}>
          <Fab color="secondary" aria-label="cancel">
            <CloseIcon />
          </Fab>
        </Link>

        <br />
        <br />

        <h3>Add a Film</h3>
        <input type="text" onChange={(event)=>this.handleChange(event, 'title')} value={this.state.title} placeholder="film title" />
        <input type="text" onChange={(event)=>this.handleChange(event, 'poster')} value={this.state.poster} placeholder="https://movie.com/image.jpg" />
        <textarea rows="6" cols="30" onChange={(event)=>this.handleChange(event, 'description')} value={this.state.description} placeholder="film synopsis"></textarea>
        {/* <button onClick={this.handleClickAddFilm}>ADD FILM</button> */}
        <Fab onClick={this.handleClickAddFilm} color="primary" aria-label="add">
          <CheckIcon />
        </Fab>

        <br />
        <br />

        <h3>Add a Genre</h3>
        <input type="text" onChange={(event)=>this.handleChange(event, 'name')} value={this.state.name} placeholder="genre" />
        {/* <button onClick={this.onClickAddGenre}>ADD GENRE</button> */}
        <Fab onClick={this.handleClickAddGenre} color="primary" aria-label="add">
          <CheckIcon />
        </Fab>

        <br />
        <br />

        <h3>Add a Genre to a Film</h3>

        <select>
          {this.props.reduxState.map((film, i)=>
            <option key={i} value={film.title}>{film.title}</option>
          )}
        </select>

        <select>
          {this.props.reduxState.map((genre, i)=>
            <option key={i} value={genre.name}>{genre.name}</option>
          )}
        </select>

        <Fab onClick={this.handleClickJoinFilmAndGenre} color="primary" aria-label="add">
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