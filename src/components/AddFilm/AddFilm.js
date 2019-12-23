import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

class AddFilm extends Component{

  state = {
    film: {
      title: '',
      poster: '',
      description: ''
    },
    genre: {
      name: ''
    },
    junction: {
      movie_id: '',
      genre_id: ''
    }
  }

  componentDidMount(){
    this.dispatchData();
  }

  // Clear film state
  clearFilmState = () => {
    this.setState({
      film: {
        title: '',
        poster: '',
        description: ''
      }
    })
  }

  // Clear genre state
  clearGenreState = () => {
    this.setState({
      genre: {
        name: ''
      }
    })
  }

  // Clear junction state
  clearJunctionState = () => {
    this.setState({
      junction: {
        movie_id: '',
        genre_id: ''
      }
    })
  }

  // Gets all films and genres
  dispatchData = () => {
    this.props.dispatch({type: `GET_FILM`});
    this.props.dispatch({type: `GET_GENRE`});
  }

  // Dispatch film state to saga for POST
  handleClickAddFilm = () => {
    this.props.dispatch({type: `POST_FILM`, payload: this.state.film});
    this.clearFilmState();
    alert(`New film added!`);
  }

  // Dispatch genre state to saga for POST
  handleClickAddGenre = () => {
    this.props.dispatch({type: `POST_GENRE`, payload: this.state.genre});
    this.clearGenreState();
    alert(`New genre added!`);
  }

  // Dispatch junction state to saga for POST
  handleClickAddJunction = () => {
    this.props.dispatch({type: `POST_JUNCTION`, payload: this.state.junction});
    this.clearJunctionState();
    alert(`Genre added to film!`);
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
      <>
        <div className="nav-btn-div">
          <Link to={"/"}>
            <Fab color="secondary" aria-label="cancel" style={{display:"inline-block", marginRight:"20px"}}>
              <CloseIcon />
            </Fab>
          </Link>
        </div>

        <h2>Add a New Film</h2>

        <div className="input-div-box">
          <TextField id="standard-basic" 
            label="film title" 
            style={{marginRight:"50px"}}
            onChange={(event)=>this.handleFilmChange(event, 'title')}
            value={this.state.film.title}/>

          <TextField id="standard-basic" 
            label="image url" 
            style={{marginRight:"50px"}}
            onChange={(event)=>this.handleFilmChange(event, 'poster')}
            value={this.state.film.poster}/>

          <TextField id="standard-basic" 
            label="description" 
            style={{marginRight:"50px", width:"300px"}}
            onChange={(event)=>this.handleFilmChange(event, 'description')}
            value={this.state.film.description}
            multiline/>

          <Fab onClick={this.handleClickAddFilm} color="primary" aria-label="add">
            <CheckIcon />
          </Fab>
        </div>

        <br />
        <br />

        <h2>Add a New Genre</h2>

        <div className="input-div-box">
          <TextField id="standard-basic" 
            label="genre" 
            style={{marginRight:"50px"}}
            onChange={(event)=>this.handleGenreChange(event)}
            value={this.state.genre.name}/>

          <Fab onClick={this.handleClickAddGenre} color="primary" aria-label="add">
            <CheckIcon />
          </Fab>
        </div>

        <br />
        <br />

        <h2>Add a Genre to a Film</h2>

        <div className="input-div-box">
          <TextField
            id="standard-select"
            style={{width: "200px", marginRight:"50px"}}
            select
            label="select a film"
            value={this.state.junction.movie_id}
            onChange={(event)=>this.handleJunctionChange(event, 'movie_id')}>

              {this.props.reduxState.map((film, i)=>
                <MenuItem key={i} value={film.movie_id}>{film.title}</MenuItem>
              )}
          </TextField>

          <TextField
            id="standard-select"
            style={{width: "200px", marginRight:"50px"}}
            select
            label="select a genre"
            value={this.state.junction.genre_id}
            onChange={(event)=>this.handleJunctionChange(event, 'genre_id')}>

            {this.props.genre.map((genre, i)=>
              <MenuItem key={i} value={genre.id}>{genre.name}</MenuItem>
            )}
          </TextField>

          <Fab onClick={this.handleClickAddJunction} color="primary" aria-label="add">
            <CheckIcon />
          </Fab>
        </div>
      </>
    )
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.filmReducer,
  genre: reduxState.genreReducer
});

export default connect(putReduxStateOnProps)(AddFilm);