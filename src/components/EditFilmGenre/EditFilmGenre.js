import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

class EditFilmGenre extends Component{

  state = {
    movie_id: '',
    title: '',
    poster: '',
    description: '',
    genres: '',
    genre_id: '',
    junction: {
      movie_id: '',
      genre_id: ''
    }
  }

  componentDidMount(){
    this.props.dispatch({type: `GET_THIS_FILM`, payload: this.props.match.params.id});
    this.props.dispatch({type: `GET_GENRE`});
  }

  // Cannot figure out why adding or removing a genre seems to have about a 50% chance 
  // of adding it to the list without manual refresh
  componentDidUpdate(prevProps){
    if(this.props.reduxState !== prevProps.reduxState){
      this.setState(this.props.reduxState[0]);
    }
  }

  // Clear junction state
  clearJunctionState = () => {
    this.setState({
      junction: {
        movie_id: '',
        genre_id: ''
      }
    });
  }

  // Add genre to selected film
  handleClickAddGenre = (genre) => {
    if(this.state.genre_id.includes(genre)){
      alert(`Genre already tagged`);
    }
    else {
    this.props.dispatch({type: `POST_JUNCTION`, payload: this.state.junction});
    this.clearJunctionState();
    this.refreshGenres();
    alert(`Genre added to film!`);
    }
  }

  // Remove genre from selected film
  handleClickRemoveGenre = (genre) => {
    if(!this.state.genre_id.includes(genre)){
      alert(`Genre already removed`);
    }
    else {
    this.props.dispatch({type: `DELETE_JUNCTION`, payload: this.state.junction});
    this.clearJunctionState();
    this.refreshGenres();
    alert(`Genre removed from film!`);
    }
  }

  // Set junction state to input value
  handleJunctionChange = (event) => {
    this.setState({
      junction: {
        movie_id: this.state.movie_id,
        genre_id: event.target.value
      }
    });
  }

  // Refresh genre list
  refreshGenres = () => {
    this.props.dispatch({type: `GET_THIS_FILM`, payload: this.props.match.params.id});
  }

  render(){
    return(
      <>
        <h2>Edit Film Genres</h2>

        <div className="input-div-box">
          <p>{this.props.reduxState.map(genre => 
                <span key={genre.genres}>{genre.genres.join(', ')}</span>
            )}</p>
          <TextField
            id="standard-select"
            style={{width: "200px", marginRight:"50px"}}
            select
            label="add or remove a genre"
            value={this.state.junction.genre_id}
            onChange={(event)=>this.handleJunctionChange(event)}>

            {this.props.genre.map((genre, i)=>
              <MenuItem key={i} value={genre.id}>{genre.name}</MenuItem>
            )}
          </TextField>

          <Fab onClick={()=>this.handleClickRemoveGenre(this.state.junction.genre_id)} 
            color="secondary" aria-label="remove" 
            size="small"
            style={{display:"inline-block", marginRight:"20px", position:"relative", top:"10px"}}>
            <DeleteForeverIcon />
          </Fab>

          <Fab onClick={()=>this.handleClickAddGenre(this.state.junction.genre_id)} 
            color="primary" aria-label="add" 
            size="small"
            style={{display:"inline-block", marginRight:"20px", position:"relative", top:"10px"}}>
            <AddIcon />
          </Fab>
        </div>
      </>
    )
  }
}

const putReduxStateOnProps = (reduxState)=>({
  reduxState: reduxState.thisFilmReducer,
  genre: reduxState.genreReducer
});

export default withRouter(connect(putReduxStateOnProps)(EditFilmGenre));